'use strict';

/**
 * profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::profile.profile', ({ strapi }) => ({
  // Get current user's profile
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to access your profile');
    }

    try {
      const profile = await strapi.entityService.findMany('api::profile.profile', {
        filters: { user: user.id },
        populate: ['avatar', 'user'],
      });

      if (!profile || profile.length === 0) {
        return ctx.notFound('Profile not found');
      }

      return profile[0];
    } catch (error) {
      return ctx.internalServerError('Error fetching profile');
    }
  },

  // Update current user's profile
  async updateMe(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to update your profile');
    }

    try {
      const profile = await strapi.entityService.findMany('api::profile.profile', {
        filters: { user: user.id },
      });

      if (!profile || profile.length === 0) {
        // Create profile if it doesn't exist
        const newProfile = await strapi.entityService.create('api::profile.profile', {
          data: {
            ...ctx.request.body.data,
            user: user.id,
          },
          populate: ['avatar', 'user'],
        });
        return newProfile;
      }

      // Update existing profile
      const updatedProfile = await strapi.entityService.update(
        'api::profile.profile',
        profile[0].id,
        {
          data: ctx.request.body.data,
          populate: ['avatar', 'user'],
        }
      );

      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      return ctx.internalServerError('Error updating profile');
    }
  },

  // Create profile for new user
  async createForUser(ctx) {
    const { userId } = ctx.params;

    if (!userId) {
      return ctx.badRequest('User ID is required');
    }

    try {
      const existingProfile = await strapi.entityService.findMany('api::profile.profile', {
        filters: { user: userId },
      });

      if (existingProfile && existingProfile.length > 0) {
        return ctx.badRequest('Profile already exists for this user');
      }

      const profile = await strapi.entityService.create('api::profile.profile', {
        data: {
          ...ctx.request.body.data,
          user: userId,
        },
        populate: ['avatar', 'user'],
      });

      return profile;
    } catch (error) {
      console.error('Error creating profile:', error);
      return ctx.internalServerError('Error creating profile');
    }
  },
}));
