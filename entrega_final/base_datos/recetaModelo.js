// base_datos/recetaModelo.js

const mongoose = require('mongoose');

const esquemaReceta = new mongoose.Schema({
    identificador: String,
    titulo: { type: mongoose.Schema.Types.Mixed },
    ingredientes: { type: mongoose.Schema.Types.Mixed },
    imagenPrincipal: String,
    pasos: [
        {
            numero: Number,
            texto: { type: mongoose.Schema.Types.Mixed },
            imagen: String,
            videoYoutube: String
        }
    ]
});

const ModeloReceta = mongoose.model('Receta', esquemaReceta);
module.exports = ModeloReceta;