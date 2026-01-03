'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::cart.cart');

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
    path: '/cart/me',
    handler: 'cart.me',
  },
  {
    method: 'POST',
    path: '/cart/add',
    handler: 'cart.addItem',
  },
  {
    method: 'PUT',
    path: '/cart/update',
    handler: 'cart.updateItem',
  },
  {
    method: 'DELETE',
    path: '/cart/remove/:itemIndex',
    handler: 'cart.removeItem',
  },
  {
    method: 'DELETE',
    path: '/cart/clear',
    handler: 'cart.clear',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
