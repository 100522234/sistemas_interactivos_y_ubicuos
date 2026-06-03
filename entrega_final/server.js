// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const ModeloReceta = require('./base_datos/recetaModelo');

const app = express();
const servidor = http.createServer(app);
const io = new Server(servidor);

app.use(express.static('interfaz_grafica'));
app.use('/funciones_js', express.static('funciones_js'));

// Conexión a la base de datos local con MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cocinaUbicuaDb')
    .then(() => console.log('¡Conectado a la base de datos MongoDB con éxito!'))
    .catch((error) => console.log('Error conectando a MongoDB:', error));

// API: Ruta para enviar las recetas al frontend
app.get('/api/recetas', async (peticion, respuesta) => {
    try {
        const todasLasRecetas = await ModeloReceta.find();
        respuesta.json(todasLasRecetas);
    } catch (error) {
        respuesta.status(500).send('Error al buscar recetas en la base de datos');
    }
});


io.on('connection', (socket) => {
    console.log('¡Un nuevo dispositivo conectado!');
    socket.on('gestoDetectado', (gesto) => {
        console.log('Gesto recibido: ' + gesto);
        io.emit('ejecutarAccion', gesto);
    });
    socket.on('disconnect', () => {
        console.log('Dispositivo desconectado.');
    });
});

let gestoActivo = null;

app.get('/api/verificar-gesto/:nombre', (req, res) => {
    res.json({ resultado: (gestoActivo === req.params.nombre) ? 1 : 0 });
});

servidor.listen(3000, () => {
    console.log('Servidor de la cocina funcionando en http://localhost:3000');
});