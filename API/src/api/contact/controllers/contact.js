'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
  async create(ctx) {
    const { name, email, phone, subject, message, category, orderNumber } = ctx.request.body;
    const user = ctx.state.user;

    try {
      const contact = await strapi.entityService.create('api::contact.contact', {
        data: {
          name,
          email,
          phone,
          subject,
          message,
          category: category || 'general',
          orderNumber,
          user: user?.id || null,
          status: 'new',
          priority: 'medium',
        },
      });

      return { success: true, message: 'Message sent successfully', data: contact };
    } catch (error) {
      console.error('Error creating contact:', error);
      return ctx.internalServerError('Error sending message');
    }
  },

  async myMessages(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      const messages = await strapi.entityService.findMany('api::contact.contact', {
        filters: { user: user.id },
        sort: { createdAt: 'desc' },
      });

      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return ctx.internalServerError('Error fetching messages');
    }
  },
}));
