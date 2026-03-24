'use strict';

module.exports = {
  '0 0 * * *': async ({ strapi }) => {
    try {
      const response = await fetch(
        'https://api.exchangerate-api.com/v4/latest/EGP'
      );
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      
      const data = await response.json();
      
      const existing = await strapi.db.query('api::exchange-rate.exchange-rate').findMany({
        limit: 1,
      });
      
      if (existing && existing.length > 0) {
        await strapi.db.query('api::exchange-rate.exchange-rate').update({
          where: { id: existing[0].id },
          data: {
            usd: data.rates.USD,
            eur: data.rates.EUR,
            gbp: data.rates.GBP,
            lastUpdated: new Date(),
          },
        });
      } else {
        await strapi.db.query('api::exchange-rate.exchange-rate').create({
          data: {
            usd: data.rates.USD,
            eur: data.rates.EUR,
            gbp: data.rates.GBP,
            lastUpdated: new Date(),
          },
        });
      }
      
      strapi.log.info('Exchange rates updated successfully');
    } catch (error) {
      strapi.log.error('Failed to update exchange rates:', error);
    }
  },
};