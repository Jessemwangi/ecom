'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::contact.contact');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter?.prefix || '/contacts';
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
    path: '/contact/send',
    handler: 'contact.create',
  },
  {
    method: 'GET',
    path: '/contact/me',
    handler: 'contact.myMessages',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
