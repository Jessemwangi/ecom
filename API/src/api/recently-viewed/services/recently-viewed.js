'use strict';

/**
 * recently-viewed service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recently-viewed.recently-viewed');
