'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::newsletter.newsletter');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter?.prefix || '/newsletters';
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
    method: 'POST',
    path: '/newsletter/subscribe',
    handler: 'newsletter.subscribe',
  },
  {
    method: 'POST',
    path: '/newsletter/unsubscribe',
    handler: 'newsletter.unsubscribe',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
