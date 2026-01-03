'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::order.order');

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
    path: '/orders/me',
    handler: 'order.myOrders',
  },
  {
    method: 'POST',
    path: '/orders/create',
    handler: 'order.createOrder',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
