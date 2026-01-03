'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart', ({ strapi }) => ({
  // Get current user's cart
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      const carts = await strapi.entityService.findMany('api::cart.cart', {
        filters: { user: user.id },
        populate: {
          items: {
            populate: ['product', 'product.img']
          }
        },
      });

      if (!carts || carts.length === 0) {
        // Create empty cart
        const newCart = await strapi.entityService.create('api::cart.cart', {
          data: {
            user: user.id,
            totalAmount: 0,
            totalItems: 0,
          },
          populate: { items: { populate: ['product', 'product.img'] } },
        });
        return newCart;
      }

      return carts[0];
    } catch (error) {
      console.error('Error fetching cart:', error);
      return ctx.internalServerError('Error fetching cart');
    }
  },

  // Add item to cart
  async addItem(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const { productId, quantity, color, size, price } = ctx.request.body;

    try {
      let cart = await strapi.entityService.findMany('api::cart.cart', {
        filters: { user: user.id },
        populate: { items: { populate: ['product'] } },
      });

      cart = cart && cart.length > 0 ? cart[0] : null;

      if (!cart) {
        cart = await strapi.entityService.create('api::cart.cart', {
          data: {
            user: user.id,
            totalAmount: 0,
            totalItems: 0,
            items: [],
          },
        });
      }

      const items = cart.items || [];
      const existingItemIndex = items.findIndex(
        item => item.product?.id == productId && item.color === color && item.size === size
      );

      if (existingItemIndex > -1) {
        items[existingItemIndex].quantity += quantity || 1;
        items[existingItemIndex].subtotal = items[existingItemIndex].quantity * items[existingItemIndex].price;
      } else {
        items.push({
          product: productId,
          quantity: quantity || 1,
          price: price,
          color: color || null,
          size: size || null,
          subtotal: (quantity || 1) * price,
        });
      }

      const totalAmount = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
      const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

      const updatedCart = await strapi.entityService.update('api::cart.cart', cart.id, {
        data: { items, totalAmount, totalItems },
        populate: { items: { populate: ['product', 'product.img'] } },
      });

      return updatedCart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return ctx.internalServerError('Error adding to cart');
    }
  },

  // Update cart item
  async updateItem(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const { itemIndex, quantity } = ctx.request.body;

    try {
      let cart = await strapi.entityService.findMany('api::cart.cart', {
        filters: { user: user.id },
        populate: { items: { populate: ['product'] } },
      });

      cart = cart && cart.length > 0 ? cart[0] : null;
      if (!cart) {
        return ctx.notFound('Cart not found');
      }

      const items = cart.items || [];
      if (itemIndex < 0 || itemIndex >= items.length) {
        return ctx.badRequest('Invalid item index');
      }

      if (quantity <= 0) {
        items.splice(itemIndex, 1);
      } else {
        items[itemIndex].quantity = quantity;
        items[itemIndex].subtotal = quantity * items[itemIndex].price;
      }

      const totalAmount = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
      const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

      const updatedCart = await strapi.entityService.update('api::cart.cart', cart.id, {
        data: { items, totalAmount, totalItems },
        populate: { items: { populate: ['product', 'product.img'] } },
      });

      return updatedCart;
    } catch (error) {
      console.error('Error updating cart:', error);
      return ctx.internalServerError('Error updating cart');
    }
  },

  // Remove item from cart
  async removeItem(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const { itemIndex } = ctx.params;

    try {
      let cart = await strapi.entityService.findMany('api::cart.cart', {
        filters: { user: user.id },
        populate: { items: { populate: ['product'] } },
      });

      cart = cart && cart.length > 0 ? cart[0] : null;
      if (!cart) {
        return ctx.notFound('Cart not found');
      }

      const items = cart.items || [];
      items.splice(parseInt(itemIndex), 1);

      const totalAmount = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
      const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

      const updatedCart = await strapi.entityService.update('api::cart.cart', cart.id, {
        data: { items, totalAmount, totalItems },
        populate: { items: { populate: ['product', 'product.img'] } },
      });

      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return ctx.internalServerError('Error removing from cart');
    }
  },

  // Clear cart
  async clear(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      let cart = await strapi.entityService.findMany('api::cart.cart', {
        filters: { user: user.id },
      });

      cart = cart && cart.length > 0 ? cart[0] : null;
      if (!cart) {
        return ctx.notFound('Cart not found');
      }

      const updatedCart = await strapi.entityService.update('api::cart.cart', cart.id, {
        data: { items: [], totalAmount: 0, totalItems: 0 },
      });

      return updatedCart;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return ctx.internalServerError('Error clearing cart');
    }
  },
}));
