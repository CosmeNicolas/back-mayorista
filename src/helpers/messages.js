const transporter  = require('../helpers/nodemailer')

const registroUsuario = async(correo)=>{
  await transporter.sendMail({
    from: `"NOMBRE DE LA EMPRESA 👻" <${process.env.GMAIL_USER}>`, // sender address
    to: process.env.GMAIL_USER, // list of receivers
    subject: "Registro exitosos ✔", // Subject line
    /* text: "Hello world?", // plain text body */
    html: "<b>TE DAMOS LA BIENVENIDA A NUESTRA PAGINA</b>", // html body
  });
}

module.exports = {
  registroUsuario
} 