import { useState } from 'react';
import api from '../services/api';

const useCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user's cart
  const getCart = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/carts?filters[user][id][$eq]=${userId}&populate=*`);
      setLoading(false);
      
      if (response.data.data.length > 0) {
        return { success: true, data: response.data.data[0] };
      }
      return { success: true, data: null };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to fetch cart';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Add item to cart
  const addToCart = async (userId, productId, quantity = 1, productPrice, productData = {}) => {
    setLoading(true);
    setError(null);
    try {
      // First, check if user has a cart
      const cartResult = await getCart(userId);
      
      const { color = null, size = null, title = '', image = '', stock = 0 } = productData;
      
      if (cartResult.data) {
        // Update existing cart
        const cartId = cartResult.data.id;
        const existingItems = cartResult.data.attributes.items || [];
        
        // Check if item already exists with same color and size
        const itemIndex = existingItems.findIndex(
          item => item.product?.id === productId && item.color === color && item.size === size
        );
        
        let updatedItems;
        if (itemIndex > -1) {
          // Update quantity
          updatedItems = [...existingItems];
          updatedItems[itemIndex].quantity += quantity;
          updatedItems[itemIndex].subtotal = updatedItems[itemIndex].quantity * updatedItems[itemIndex].price;
        } else {
          // Add new item
          updatedItems = [
            ...existingItems,
            {
              product: productId,
              quantity,
              price: productPrice,
              originalPrice: productPrice,
              color,
              size,
              subtotal: quantity * productPrice,
              productTitle: title,
              productImage: image,
              availableStock: stock,
              discount: 0
            }
          ];
        }
        
        const totalAmount = updatedItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        const response = await api.put(`/carts/${cartId}`, {
          data: {
            items: updatedItems,
            totalItems,
            totalAmount,
            finalTotal: totalAmount - (cartResult.data.attributes.discount || 0),
            status: 'active'
          }
        });
        
        setLoading(false);
        return { success: true, data: response.data.data };
      } else {
        // Create new cart
        const subtotal = quantity * productPrice;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // Cart expires in 7 days
        
        const response = await api.post('/carts', {
          data: {
            user: userId,
            items: [{
              product: productId,
              quantity,
              price: productPrice,
              originalPrice: productPrice,
              color,
              size,
              subtotal,
              productTitle: title,
              productImage: image,
              availableStock: stock,
              discount: 0
            }],
            totalItems: quantity,
            totalAmount: subtotal,
            finalTotal: subtotal,
            status: 'active',
            expiresAt: expiresAt.toISOString()
          }
        });
        
        setLoading(false);
        return { success: true, data: response.data.data };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to add to cart';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartId, itemIndex) => {
    setLoading(true);
    setError(null);
    try {
      const cartResult = await api.get(`/carts/${cartId}?populate=*`);
      const existingItems = cartResult.data.data.attributes.items || [];
      
      const updatedItems = existingItems.filter((_, index) => index !== itemIndex);
      
      const response = await api.put(`/carts/${cartId}`, {
        data: {
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalAmount: updatedItems.reduce((sum, item) => sum + (item.subtotal || 0), 0)
        }
      });
      
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to remove from cart';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Update cart item quantity
  const updateCartQuantity = async (cartId, itemIndex, newQuantity) => {
    setLoading(true);
    setError(null);
    try {
      const cartResult = await api.get(`/carts/${cartId}?populate=*`);
      const existingItems = cartResult.data.data.attributes.items || [];
      
      const updatedItems = [...existingItems];
      updatedItems[itemIndex].quantity = newQuantity;
      updatedItems[itemIndex].subtotal = newQuantity * updatedItems[itemIndex].price;
      
      const response = await api.put(`/carts/${cartId}`, {
        data: {
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalAmount: updatedItems.reduce((sum, item) => sum + (item.subtotal || 0), 0)
        }
      });
      
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to update cart';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Clear cart
  const clearCart = async (cartId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/carts/${cartId}`, {
        data: {
          items: [],
          totalItems: 0,
          totalAmount: 0
        }
      });
      
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to clear cart';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Apply coupon to cart
  const applyCoupon = async (cartId, couponCode, discountAmount) => {
    setLoading(true);
    setError(null);
    try {
      const cartResult = await api.get(`/carts/${cartId}?populate=*`);
      const cart = cartResult.data.data.attributes;
      
      const finalTotal = (cart.totalAmount || 0) - discountAmount + (cart.taxAmount || 0) + (cart.shippingCost || 0);
      
      const response = await api.put(`/carts/${cartId}`, {
        data: {
          couponCode,
          discount: discountAmount,
          finalTotal
        }
      });
      
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to apply coupon';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return {
    loading,
    error,
    getCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    applyCoupon
  };
};

export default useCart;
