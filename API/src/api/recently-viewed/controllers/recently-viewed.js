'use strict';

/**
 * recently-viewed controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::recently-viewed.recently-viewed');
