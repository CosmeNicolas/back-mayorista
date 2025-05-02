const { Router } = require("express");
const router = Router();
const transporter = require("../helpers/nodemailer");

router.post("/enviar-consulta", async (req, res) => {
  const { nombre, apellido, email, mensaje } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    await transporter.sendMail({
      from: `"Consulta desde LuzBell" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "Nueva consulta recibida",
      html: `
        <h2>Mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    res.status(200).json({ msg: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    res.status(500).json({ msg: "Error interno al enviar el correo" });
  }
});

module.exports = router;
