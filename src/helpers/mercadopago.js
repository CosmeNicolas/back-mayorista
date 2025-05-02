const { MercadoPagoConfig, Preference } = require('mercadopago');
const dotenv = require('dotenv');

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: { timeout: 5000 }
});

// Nota: Ahora se usa Preference (singular) en lugar de Preferences
const preferenceClient = new Preference(client);

module.exports = preferenceClient;