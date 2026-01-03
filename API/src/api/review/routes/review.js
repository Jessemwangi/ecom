'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::review.review');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter?.prefix || '/reviews';
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
    path: '/reviews/me',
    handler: 'review.myReviews',
  },
  {
    method: 'GET',
    path: '/reviews/product/:productId',
    handler: 'review.productReviews',
  },
  {
    method: 'POST',
    path: '/reviews/create',
    handler: 'review.createReview',
  },
  {
    method: 'PUT',
    path: '/reviews/:reviewId/helpful',
    handler: 'review.markHelpful',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
