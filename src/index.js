'use strict';

module.exports = {
  register() {
    // Register hooks and extensions
  },

  async bootstrap({ strapi }) {
    try {
      const existing = await strapi.db.query('api::exchange-rate.exchange-rate').findMany({
        limit: 1,
      });

      if (!existing || existing.length === 0) {
        await strapi.db.query('api::exchange-rate.exchange-rate').create({
          data: {
            usd: 0.032,
            eur: 0.029,
            gbp: 0.025,
            lastUpdated: new Date(),
          },
        });
        strapi.log.info('Created default exchange rate record');
      }
    } catch (error) {
      strapi.log.error('Failed to create default exchange rate:', error);
    }
  },
};