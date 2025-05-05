const router = require("express").Router();
const { crearPreferencia } = require("../services/pagosmp.services");
const { confirmarCompra } = require("../controllers/ventas.controllers");


router.post("/crear-pago", async (req, res) => {
  try {
    const { items, userId } = req.body;

    // 🟡 Agregar este log para depuración
    console.log("🔍 Payload recibido en /crear-pago:", req.body);

    if (!items || !userId) {
      return res.status(400).json({ error: "Faltan items o userId" });
    }

    const preference = await crearPreferencia(items, userId);
    res.json({ id: preference.id });
  } catch (error) {
    console.error("❌ Error en /crear-pago:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/confirmar-compra", confirmarCompra); // <<-- NUEVA RUTA

module.exports = router;
