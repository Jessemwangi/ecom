import { useState } from 'react';
import api from '../services/api';

const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user profile
  const getProfile = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/profiles?filters[user][id][$eq]=${userId}&populate=*`);
      setLoading(false);
      
      if (response.data.data.length > 0) {
        return { success: true, data: response.data.data[0] };
      }
      return { success: true, data: null };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to fetch profile';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Create user profile
  const createProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/profiles', {
        data: profileData,
      });

      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to create profile';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Update user profile
  const updateProfile = async (profileId, profileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/profiles/${profileId}`, {
        data: profileData,
      });

      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to update profile';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return {
    loading,
    error,
    getProfile,
    createProfile,
    updateProfile,
  };
};

export default useProfile;
