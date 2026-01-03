'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::review.review', ({ strapi }) => ({
  async myReviews(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      const reviews = await strapi.entityService.findMany('api::review.review', {
        filters: { user: user.id },
        populate: ['product', 'product.img', 'images'],
        sort: { createdAt: 'desc' },
      });

      return reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return ctx.internalServerError('Error fetching reviews');
    }
  },

  async productReviews(ctx) {
    const { productId } = ctx.params;

    try {
      const reviews = await strapi.entityService.findMany('api::review.review', {
        filters: { 
          product: productId,
          publishedAt: { $notNull: true }
        },
        populate: ['user', 'images'],
        sort: { createdAt: 'desc' },
      });

      const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

      return {
        reviews,
        averageRating: averageRating.toFixed(1),
        totalReviews: reviews.length,
      };
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      return ctx.internalServerError('Error fetching product reviews');
    }
  },

  async createReview(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const { productId, rating, title, comment, images } = ctx.request.body;

    try {
      // Check if user already reviewed this product
      const existing = await strapi.entityService.findMany('api::review.review', {
        filters: { user: user.id, product: productId },
      });

      if (existing && existing.length > 0) {
        return ctx.badRequest('You have already reviewed this product');
      }

      const review = await strapi.entityService.create('api::review.review', {
        data: {
          user: user.id,
          product: productId,
          rating,
          title,
          comment,
          images: images || [],
          verified: false,
          publishedAt: new Date(),
        },
        populate: ['user', 'product', 'images'],
      });

      return review;
    } catch (error) {
      console.error('Error creating review:', error);
      return ctx.internalServerError('Error creating review');
    }
  },

  async markHelpful(ctx) {
    const { reviewId } = ctx.params;

    try {
      const review = await strapi.entityService.findOne('api::review.review', reviewId);
      
      if (!review) {
        return ctx.notFound('Review not found');
      }

      const updated = await strapi.entityService.update('api::review.review', reviewId, {
        data: { helpful: (review.helpful || 0) + 1 },
      });

      return updated;
    } catch (error) {
      console.error('Error marking review helpful:', error);
      return ctx.internalServerError('Error marking review helpful');
    }
  },
}));
