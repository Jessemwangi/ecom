import { useState } from 'react';
import api from '../services/api';

const useRecentlyViewed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user's recently viewed products
  const getRecentlyViewed = async (userId, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/recently-viewed?filters[user][id][$eq]=${userId}&populate=product&sort=viewedAt:desc&pagination[limit]=${limit}`
      );
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to fetch recently viewed';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Track product view
  const trackView = async (userId, productId, sessionId = null) => {
    setLoading(true);
    setError(null);
    try {
      // Check if product was already viewed recently (within last hour)
      const recentResponse = await api.get(
        `/recently-viewed?filters[user][id][$eq]=${userId}&filters[product][id][$eq]=${productId}&sort=viewedAt:desc&pagination[limit]=1`
      );

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      
      if (recentResponse.data.data.length > 0) {
        const lastView = new Date(recentResponse.data.data[0].attributes.viewedAt);
        
        if (lastView > oneHourAgo) {
          // Update existing view timestamp
          const viewId = recentResponse.data.data[0].id;
          const response = await api.put(`/recently-viewed/${viewId}`, {
            data: {
              viewedAt: new Date().toISOString()
            }
          });
          setLoading(false);
          return { success: true, data: response.data.data };
        }
      }

      // Create new view record
      const response = await api.post('/recently-viewed', {
        data: {
          user: userId,
          product: productId,
          viewedAt: new Date().toISOString(),
          sessionId
        }
      });

      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to track view';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Clear recently viewed history
  const clearHistory = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/recently-viewed?filters[user][id][$eq]=${userId}`
      );
      
      const deletePromises = response.data.data.map(item => 
        api.delete(`/recently-viewed/${item.id}`)
      );
      
      await Promise.all(deletePromises);
      
      setLoading(false);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to clear history';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return {
    loading,
    error,
    getRecentlyViewed,
    trackView,
    clearHistory
  };
};

export default useRecentlyViewed;
