// src/controllers/ventas.controller.js
const Producto = require("../models/productos.shema");

const confirmarCompra = async (req, res) => {
  try {
    const carrito = req.body.carrito;

    if (!Array.isArray(carrito) || carrito.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío o malformado." });
    }

    for (const item of carrito) {
      const producto = await Producto.findById(item._id);
      if (!producto) {
        return res.status(404).json({ error: `Producto con ID ${item._id} no encontrado.` });
      }

      const stockActual = producto.stockPorTalle.get(item.talleSeleccionado) || 0;

      if (stockActual < item.cantidad) {
        return res.status(400).json({
          error: `No hay suficiente stock para el producto ${producto.nombreProducto} en talle ${item.talleSeleccionado}. Disponible: ${stockActual}`
        });
      }

      producto.stockPorTalle.set(item.talleSeleccionado, stockActual - item.cantidad);
      await producto.save();
    }

    return res.status(200).json({ mensaje: "Compra confirmada y stock actualizado." });
  } catch (error) {
    console.error("❌ Error en confirmarCompra:", error);
    return res.status(500).json({ error: "Error en el servidor", detalle: error.message });
  }
};

module.exports = { confirmarCompra };
