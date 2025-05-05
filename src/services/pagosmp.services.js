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

    // Log de depuración
    console.log("🧾 Preferencia a enviar:", JSON.stringify(preference, null, 2));

    const response = await mercadopago.create({ body: preference });

    // Log de respuesta
    console.log("✅ Preferencia creada:", response);

    return response;
  } catch (error) {
    console.error('❌ Error al crear preferencia:', error.response?.message || error.message);
    throw error;
  }
};

module.exports = { crearPreferencia };
