/* cloudinary e sun servicio por eso va en helpers no es un middleware */
/* import { v2 as cloudinary } from 'cloudinary'; */

const cloudinary = require('cloudinary').v2
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET 
    });


module.exports = cloudinary