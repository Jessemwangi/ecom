'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::coupon.coupon');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter?.prefix || '/coupons';
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
    path: '/coupons/validate',
    handler: 'coupon.validate',
  },
  {
    method: 'POST',
    path: '/coupons/apply',
    handler: 'coupon.applyCoupon',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
