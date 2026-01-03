'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async myOrders(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      const orders = await strapi.entityService.findMany('api::order.order', {
        filters: { user: user.id },
        populate: {
          items: {
            populate: ['product', 'product.img']
          },
          shippingAddress: true,
        },
        sort: { createdAt: 'desc' },
      });

      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return ctx.internalServerError('Error fetching orders');
    }
  },

  async createOrder(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const { items, shippingAddress, paymentMethod, notes } = ctx.request.body;

    try {
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const totalAmount = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);

      const order = await strapi.entityService.create('api::order.order', {
        data: {
          user: user.id,
          orderNumber,
          items,
          totalAmount,
          shippingAddress,
          paymentMethod,
          notes,
          status: 'pending',
          paymentStatus: 'pending',
        },
        populate: {
          items: { populate: ['product', 'product.img'] },
          shippingAddress: true,
        },
      });

      // Clear user's cart after order
      const carts = await strapi.entityService.findMany('api::cart.cart', {
        filters: { user: user.id },
      });
      if (carts && carts.length > 0) {
        await strapi.entityService.update('api::cart.cart', carts[0].id, {
          data: { items: [], totalAmount: 0, totalItems: 0 },
        });
      }

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      return ctx.internalServerError('Error creating order');
    }
  },
}));
