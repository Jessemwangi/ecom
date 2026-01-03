'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wishlist.wishlist', ({ strapi }) => ({
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    try {
      const wishlists = await strapi.entityService.findMany('api::wishlist.wishlist', {
        filters: { user: user.id },
        populate: { products: { populate: ['img', 'categories'] } },
      });

      if (!wishlists || wishlists.length === 0) {
        const newWishlist = await strapi.entityService.create('api::wishlist.wishlist', {
          data: { user: user.id, products: [] },
          populate: { products: { populate: ['img', 'categories'] } },
        });
        return newWishlist;
      }

      return wishlists[0];
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return ctx.internalServerError('Error fetching wishlist');
    }
  },

  async addProduct(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const { productId } = ctx.request.body;

    try {
      let wishlist = await strapi.entityService.findMany('api::wishlist.wishlist', {
        filters: { user: user.id },
        populate: ['products'],
      });

      wishlist = wishlist && wishlist.length > 0 ? wishlist[0] : null;

      if (!wishlist) {
        wishlist = await strapi.entityService.create('api::wishlist.wishlist', {
          data: { user: user.id, products: [productId] },
          populate: { products: { populate: ['img', 'categories'] } },
        });
      } else {
        const productIds = wishlist.products.map(p => p.id);
        if (!productIds.includes(parseInt(productId))) {
          productIds.push(parseInt(productId));
          wishlist = await strapi.entityService.update('api::wishlist.wishlist', wishlist.id, {
            data: { products: productIds },
            populate: { products: { populate: ['img', 'categories'] } },
          });
        }
      }

      return wishlist;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return ctx.internalServerError('Error adding to wishlist');
    }
  },

  async removeProduct(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const { productId } = ctx.params;

    try {
      let wishlist = await strapi.entityService.findMany('api::wishlist.wishlist', {
        filters: { user: user.id },
        populate: ['products'],
      });

      wishlist = wishlist && wishlist.length > 0 ? wishlist[0] : null;

      if (!wishlist) {
        return ctx.notFound('Wishlist not found');
      }

      const productIds = wishlist.products.map(p => p.id).filter(id => id !== parseInt(productId));

      const updatedWishlist = await strapi.entityService.update('api::wishlist.wishlist', wishlist.id, {
        data: { products: productIds },
        populate: { products: { populate: ['img', 'categories'] } },
      });

      return updatedWishlist;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return ctx.internalServerError('Error removing from wishlist');
    }
  },
}));
