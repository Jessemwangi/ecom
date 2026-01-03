'use strict';

/**
 * recently-viewed router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::recently-viewed.recently-viewed');
