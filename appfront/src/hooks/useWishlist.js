import { useState } from 'react';
import api from '../services/api';

const useWishlist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user's wishlist
  const getWishlist = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/wishlists?filters[user][id][$eq]=${userId}&populate[items][populate]=product`);
      setLoading(false);
      
      if (response.data.data.length > 0) {
        return { success: true, data: response.data.data[0] };
      }
      return { success: true, data: null };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to fetch wishlist';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Add product to wishlist
  const addToWishlist = async (userId, productId, productPrice = 0, notifyOnPriceDrop = false, notifyWhenInStock = false) => {
    setLoading(true);
    setError(null);
    try {
      // First, check if user has a wishlist
      const wishlistResult = await getWishlist(userId);
      
      if (wishlistResult.data) {
        // Update existing wishlist
        const wishlistId = wishlistResult.data.id;
        const existingItems = wishlistResult.data.attributes.items || [];
        
        // Check if product already exists
        const productExists = existingItems.some(
          item => item.product?.id === productId
        );
        
        if (productExists) {
          setLoading(false);
          return { success: true, message: 'Product already in wishlist', data: wishlistResult.data };
        }
        
        // Add new item
        const updatedItems = [
          ...existingItems,
          {
            product: productId,
            addedAt: new Date().toISOString(),
            priority: 'medium',
            priceWhenAdded: productPrice,
            notifyOnPriceDrop,
            notifyWhenInStock
          }
        ];
        
        const response = await api.put(`/wishlists/${wishlistId}`, {
          data: {
            items: updatedItems
          }
        });
        
        setLoading(false);
        return { success: true, data: response.data.data };
      } else {
        // Create new wishlist
        const response = await api.post('/wishlists', {
          data: {
            user: userId,
            items: [{
              product: productId,
              addedAt: new Date().toISOString(),
              priority: 'medium',
              priceWhenAdded: productPrice,
              notifyOnPriceDrop,
              notifyWhenInStock
            }]
          }
        });
        
        setLoading(false);
        return { success: true, data: response.data.data };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to add to wishlist';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (wishlistId, productId) => {
    setLoading(true);
    setError(null);
    try {
      const wishlistResult = await api.get(`/wishlists/${wishlistId}?populate[items][populate]=product`);
      const existingItems = wishlistResult.data.data.attributes.items || [];
      
      const updatedItems = existingItems.filter(item => item.product?.id !== productId);
      
      const response = await api.put(`/wishlists/${wishlistId}`, {
        data: {
          items: updatedItems
        }
      });
      
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to remove from wishlist';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (wishlist, productId) => {
    if (!wishlist || !wishlist.attributes?.items) return false;
    return wishlist.attributes.items.some(item => item.product?.id === productId);
  };

  // Clear wishlist
  const clearWishlist = async (wishlistId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/wishlists/${wishlistId}`, {
        data: {
          items: []
        }
      });
      
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to clear wishlist';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Update wishlist item priority
  const updateItemPriority = async (wishlistId, productId, priority) => {
    setLoading(true);
    setError(null);
    try {
      const wishlistResult = await api.get(`/wishlists/${wishlistId}?populate[items][populate]=product`);
      const existingItems = wishlistResult.data.data.attributes.items || [];
      
      const updatedItems = existingItems.map(item => 
        item.product?.id === productId ? { ...item, priority } : item
      );
      
      const response = await api.put(`/wishlists/${wishlistId}`, {
        data: {
          items: updatedItems
        }
      });
      
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to update priority';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return {
    loading,
    error,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    updateItemPriority
  };
};

export default useWishlist;
