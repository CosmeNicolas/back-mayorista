/* usamos express para levantar el servidor  */
require('dotenv').config()
require('./DB/config')
const express = require("express");
const path = require("path");
const cors = require('cors')
const morgan = require('morgan')

const app = express();
/* formatos de imagenes  */
/* app.use(express.urlencoded({extended: true})) */


app.use(morgan('dev'))
app.use(cors())
app.use(express.json());



app.use(express.static(path.join(__dirname, "../public")));


/* MIDDLEWARE - habilitan cosas - nos traduce los datos para ser leido */
app.use('/api', require('./routes/index.routes'))
/* MIDDLEWARE */

app.listen(3001, () => {
  console.log("servidor okey ", 3001);
});
