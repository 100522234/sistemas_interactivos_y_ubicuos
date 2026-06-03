const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Inicializamos Express y el servidor HTTP
const app = express();
const server = http.createServer(app);

// Inicializamos Socket.IO
const io = new Server(server);

// Le decimos a Express que sirva los archivos de la carpeta "public"
app.use(express.static('public'));

// Lógica de Socket.IO
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado:', socket.id);

    // Escuchamos un evento genérico desde el mando (ej: 'comando-mando')
    socket.on('comando-mando', (datos) => {
        console.log('Orden recibida del mando:', datos);
        
        // Reenviamos esa orden a TODOS los clientes conectados (incluida la pantalla)
        io.emit('actualizar-pantalla', datos);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

// Arrancamos el servidor en el puerto 3000
const PUERTO = 3000;
server.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
    console.log(`- Mando: http://localhost:${PUERTO}/mando/`);
    console.log(`- Pantalla: http://localhost:${PUERTO}/pantalla/`);
});