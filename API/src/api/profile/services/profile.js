'use strict';

/**
 * profile service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::profile.profile', ({ strapi }) => ({
  // Find profile by user ID
  async findByUserId(userId) {
    try {
      const profiles = await strapi.entityService.findMany('api::profile.profile', {
        filters: { user: userId },
        populate: ['avatar', 'user', 'shippingAddress'],
      });

      return profiles && profiles.length > 0 ? profiles[0] : null;
    } catch (error) {
      console.error('Error finding profile by user ID:', error);
      throw error;
    }
  },

  // Create or update profile
  async createOrUpdate(userId, profileData) {
    try {
      const existingProfile = await this.findByUserId(userId);

      if (existingProfile) {
        // Update existing profile
        return await strapi.entityService.update(
          'api::profile.profile',
          existingProfile.id,
          {
            data: profileData,
            populate: ['avatar', 'user', 'shippingAddress'],
          }
        );
      } else {
        // Create new profile
        return await strapi.entityService.create('api::profile.profile', {
          data: {
            ...profileData,
            user: userId,
          },
          populate: ['avatar', 'user', 'shippingAddress'],
        });
      }
    } catch (error) {
      console.error('Error creating or updating profile:', error);
      throw error;
    }
  },

  // Delete profile
  async deleteByUserId(userId) {
    try {
      const profile = await this.findByUserId(userId);

      if (profile) {
        return await strapi.entityService.delete('api::profile.profile', profile.id);
      }

      return null;
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  },
}));
