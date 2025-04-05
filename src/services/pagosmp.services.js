const mercadopago = require('../helpers/mercadopago');

const crearPreferencia = async (items, compradorId) => {
  try {
    const preference = {
      items: items.map(item => ({
        title: item.nombre,
        unit_price: Number(item.precio),
        quantity: Number(item.cantidad),
        currency_id: 'ARS'
      })),
      payer: {
        id: compradorId.toString()
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/pago-exitoso`,
        failure: `${process.env.FRONTEND_URL}/pago-fallido`,
        pending: `${process.env.FRONTEND_URL}/pago-pendiente`
      },
      auto_return: 'approved',
      binary_mode: true
    };

    const response = await mercadopago.create({ body: preference });
    return response;
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    throw error;
  }
};

module.exports = { crearPreferencia };