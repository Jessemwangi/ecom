'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::wishlist.wishlist');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: 'GET',
    path: '/wishlist/me',
    handler: 'wishlist.me',
  },
  {
    method: 'POST',
    path: '/wishlist/add',
    handler: 'wishlist.addProduct',
  },
  {
    method: 'DELETE',
    path: '/wishlist/remove/:productId',
    handler: 'wishlist.removeProduct',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
