const { mercadopago } = require('../helpers/mercadopago');

const crearPreferencia = async (items, compradorId) => {
  const preference = {
    items,
    payer: { id: compradorId },
    back_urls: {
      success: `${process.env.FRONTEND_URL}/pago-exitoso`,
      failure: `${process.env.FRONTEND_URL}/pago-fallido`
    },
    auto_return: 'approved'
  };

  const response = await mercadopago.preferences.create(preference);
  return response.body;
};

module.exports = { crearPreferencia };