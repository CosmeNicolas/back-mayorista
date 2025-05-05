const Producto = require("../models/productos.shema");
const transporter = require("../helpers/nodemailer"); // Asegurate de tener esto bien configurado

const confirmarCompra = async (req, res) => {
  try {
    const { carrito, cliente } = req.body;

    if (!Array.isArray(carrito) || carrito.length === 0 || !cliente?.email) {
      return res.status(400).json({ error: "Faltan datos del carrito o del cliente." });
    }

    // Validar stock y actualizar
    for (const item of carrito) {
      const producto = await Producto.findById(item._id);
      if (!producto) {
        return res.status(404).json({ error: `Producto con ID ${item._id} no encontrado.` });
      }

      const stockActual = producto.stockPorTalle.get(item.talleSeleccionado) || 0;

      if (stockActual < item.cantidad) {
        return res.status(400).json({
          error: `No hay suficiente stock para ${producto.nombreProducto} (talle ${item.talleSeleccionado}). Stock: ${stockActual}`
        });
      }

      producto.stockPorTalle.set(item.talleSeleccionado, stockActual - item.cantidad);
      await producto.save();
    }

    // 📨 Enviar correo al cliente con sus datos
    await transporter.sendMail({
      from: `"LuzBell 👗👜" <${process.env.GMAIL_USER}>`,
      to: cliente.email,
      subject: "🛍️ ¡Compra confirmada!",
      html: `
        <h2>¡Gracias por tu compra, ${cliente.nombre}!</h2>
        <p>Tu pedido fue registrado exitosamente.</p>
        <p><strong>Datos del cliente:</strong></p>
        <ul>
          <li><strong>Nombre:</strong> ${cliente.nombre}</li>
          <li><strong>Email:</strong> ${cliente.email}</li>
          <li><strong>Teléfono:</strong> ${cliente.telefono}</li>
          <li><strong>DNI:</strong> ${cliente.dni}</li>
          <li><strong>Dirección:</strong> ${cliente.direccion}</li>
          <li><strong>Localidad:</strong> ${cliente.localidad}</li>
          <li><strong>Provincia:</strong> ${cliente.provincia}</li>
        </ul>
        <p><strong>Cantidad de productos:</strong> ${carrito.length}</p>
        <p><strong>Dirección de retiro:</strong> Av. Avellaneda 3142, CABA</p>
        <br/>
        <p style="color: #FB2576;">¡Gracias por confiar en LuzBell!</p>
      `
    });

    return res.status(200).json({ mensaje: "Compra confirmada y correo enviado." });
  } catch (error) {
    console.error("❌ Error en confirmarCompra:", error);
    return res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
};

module.exports = { confirmarCompra };
