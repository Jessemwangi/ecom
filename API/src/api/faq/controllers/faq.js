'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::faq.faq', ({ strapi }) => ({
  async findByCategory(ctx) {
    const { category } = ctx.params;

    try {
      const faqs = await strapi.entityService.findMany('api::faq.faq', {
        filters: { 
          category,
          publishedAt: { $notNull: true }
        },
        sort: { order: 'asc', createdAt: 'desc' },
      });

      return faqs;
    } catch (error) {
      console.error('Error fetching FAQs by category:', error);
      return ctx.internalServerError('Error fetching FAQs');
    }
  },

  async findFeatured(ctx) {
    try {
      const faqs = await strapi.entityService.findMany('api::faq.faq', {
        filters: { 
          featured: true,
          publishedAt: { $notNull: true }
        },
        sort: { order: 'asc', createdAt: 'desc' },
        limit: 10,
      });

      return faqs;
    } catch (error) {
      console.error('Error fetching featured FAQs:', error);
      return ctx.internalServerError('Error fetching FAQs');
    }
  },

  async markHelpful(ctx) {
    const { id } = ctx.params;

    try {
      const faq = await strapi.entityService.findOne('api::faq.faq', id);
      
      if (!faq) {
        return ctx.notFound('FAQ not found');
      }

      const updated = await strapi.entityService.update('api::faq.faq', id, {
        data: {
          helpfulCount: (faq.helpfulCount || 0) + 1,
        },
      });

      return updated;
    } catch (error) {
      console.error('Error marking FAQ as helpful:', error);
      return ctx.internalServerError('Error updating FAQ');
    }
  },
}));
