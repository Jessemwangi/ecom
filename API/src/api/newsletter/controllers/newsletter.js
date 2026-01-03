'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::newsletter.newsletter', ({ strapi }) => ({
  async subscribe(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('Email is required');
    }

    try {
      // Check if already subscribed
      const existing = await strapi.entityService.findMany('api::newsletter.newsletter', {
        filters: { email },
      });

      if (existing && existing.length > 0) {
        if (existing[0].subscribed) {
          return { success: true, message: 'Already subscribed' };
        } else {
          // Re-subscribe
          await strapi.entityService.update('api::newsletter.newsletter', existing[0].id, {
            data: { subscribed: true },
          });
          return { success: true, message: 'Resubscribed successfully' };
        }
      }

      // New subscription
      await strapi.entityService.create('api::newsletter.newsletter', {
        data: { email, subscribed: true },
      });

      return { success: true, message: 'Subscribed successfully' };
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      return ctx.internalServerError('Error subscribing to newsletter');
    }
  },

  async unsubscribe(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('Email is required');
    }

    try {
      const existing = await strapi.entityService.findMany('api::newsletter.newsletter', {
        filters: { email },
      });

      if (!existing || existing.length === 0) {
        return ctx.notFound('Email not found');
      }

      await strapi.entityService.update('api::newsletter.newsletter', existing[0].id, {
        data: { subscribed: false },
      });

      return { success: true, message: 'Unsubscribed successfully' };
    } catch (error) {
      console.error('Error unsubscribing:', error);
      return ctx.internalServerError('Error unsubscribing');
    }
  },
}));
