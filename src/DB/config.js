const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECT).then(()=>{console.log('BD conectada')}).catch((error)=>console.log('Error al conectar la BD', error))