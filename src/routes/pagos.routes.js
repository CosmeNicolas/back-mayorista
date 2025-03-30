const router = require('express').Router();
const { crearPreferencia } = require('../services/pagos.service');

router.post('/crear-pago', async (req, res) => {
  try {
    const { items, userId } = req.body;
    const preference = await crearPreferencia(items, userId);
    res.json(preference);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;