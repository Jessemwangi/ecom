'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::faq.faq');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter?.prefix || '/faqs';
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
    path: '/faqs/category/:category',
    handler: 'faq.findByCategory',
  },
  {
    method: 'GET',
    path: '/faqs/featured',
    handler: 'faq.findFeatured',
  },
  {
    method: 'PUT',
    path: '/faqs/:id/helpful',
    handler: 'faq.markHelpful',
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
