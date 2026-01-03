'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::coupon.coupon', ({ strapi }) => ({
  async validate(ctx) {
    const { code, cartTotal } = ctx.request.body;

    if (!code) {
      return ctx.badRequest('Coupon code is required');
    }

    try {
      const coupons = await strapi.entityService.findMany('api::coupon.coupon', {
        filters: { 
          code: code.toUpperCase(),
          active: true,
          publishedAt: { $notNull: true }
        },
        populate: ['categories', 'products'],
      });

      if (!coupons || coupons.length === 0) {
        return { valid: false, message: 'Invalid coupon code' };
      }

      const coupon = coupons[0];
      const now = new Date();
      const validFrom = new Date(coupon.validFrom);
      const validUntil = new Date(coupon.validUntil);

      // Check date validity
      if (now < validFrom || now > validUntil) {
        return { valid: false, message: 'Coupon has expired or not yet valid' };
      }

      // Check usage limit
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        return { valid: false, message: 'Coupon usage limit reached' };
      }

      // Check minimum purchase
      if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
        return { 
          valid: false, 
          message: `Minimum purchase of $${coupon.minPurchase} required` 
        };
      }

      // Calculate discount
      let discount = 0;
      if (coupon.discountType === 'percentage') {
        discount = (cartTotal * coupon.discountValue) / 100;
        if (coupon.maxDiscount && discount > coupon.maxDiscount) {
          discount = coupon.maxDiscount;
        }
      } else {
        discount = coupon.discountValue;
      }

      return {
        valid: true,
        coupon: {
          id: coupon.id,
          code: coupon.code,
          description: coupon.description,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue,
        },
        discount: parseFloat(discount.toFixed(2)),
        finalAmount: parseFloat((cartTotal - discount).toFixed(2)),
      };
    } catch (error) {
      console.error('Error validating coupon:', error);
      return ctx.internalServerError('Error validating coupon');
    }
  },

  async applyCoupon(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in');
    }

    const { couponId } = ctx.request.body;

    try {
      // Increment usage count
      const coupon = await strapi.entityService.findOne('api::coupon.coupon', couponId);
      
      if (!coupon) {
        return ctx.notFound('Coupon not found');
      }

      await strapi.entityService.update('api::coupon.coupon', couponId, {
        data: { usedCount: (coupon.usedCount || 0) + 1 },
      });

      return { success: true, message: 'Coupon applied successfully' };
    } catch (error) {
      console.error('Error applying coupon:', error);
      return ctx.internalServerError('Error applying coupon');
    }
  },
}));
