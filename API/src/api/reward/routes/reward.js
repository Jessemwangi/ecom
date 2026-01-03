'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::reward.reward');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter?.prefix || '/rewards';
    },
    get routes() {
      if (!routes) {
        routes = innerRouter?.routes ? innerRouter.routes.concat(extraRoutes) : extraRoutes;
      }
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: 'GET',
    path: '/reward/me',
    handler: 'reward.me',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
