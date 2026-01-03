'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::reward.reward', ({ strapi }) => ({
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      const rewards = await strapi.entityService.findMany('api::reward.reward', {
        filters: { user: user.id },
      });

      if (!rewards || rewards.length === 0) {
        const newReward = await strapi.entityService.create('api::reward.reward', {
          data: {
            user: user.id,
            totalPoints: 0,
            tier: 'bronze',
            transactions: [],
          },
        });
        return newReward;
      }

      return rewards[0];
    } catch (error) {
      console.error('Error fetching rewards:', error);
      return ctx.internalServerError('Error fetching rewards');
    }
  },
}));
