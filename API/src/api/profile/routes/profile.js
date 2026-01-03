'use strict';

/**
 * profile router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::profile.profile');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter?.prefix || '/profiles';
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
    path: '/profile/me',
    handler: 'profile.me',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'PUT',
    path: '/profile/me',
    handler: 'profile.updateMe',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'POST',
    path: '/profile/user/:userId',
    handler: 'profile.createForUser',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
