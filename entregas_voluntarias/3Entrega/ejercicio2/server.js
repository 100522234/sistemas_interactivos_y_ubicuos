// Importamos Express para crear el servidor web
const express = require('express');

// Importamos las funciones para leer y guardar tareas desde el módulo externo
const { leerTareas, guardarTareas } = require('./tareas');

const app = express();
app.use(express.json());
app.use(express.static('./public')); // Sirve index.html, app.js, style.css

// GET - Devuelve todas las tareas
app.get('/api/tareas', (req, res) => {
    const tareas = leerTareas();
    res.json(tareas);
});

// POST - Crea una tarea nueva
app.post('/api/tareas', (req, res) => {
    const tareas = leerTareas();
    const nueva = {
        id: Date.now(),
        texto: req.body.texto,
        completada: false
    };
    tareas.push(nueva);
    guardarTareas(tareas);
    res.json(nueva);
});

// PUT - Actualiza estado Y/O texto de una tarea
app.put('/api/tareas/:id', (req, res) => {
    const tareas = leerTareas();
    const id = Number(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    if (req.body.completada !== undefined) tarea.completada = req.body.completada;
    if (req.body.texto !== undefined) tarea.texto = req.body.texto;

    guardarTareas(tareas);
    res.json(tarea);
});

// DELETE - Borra una tarea
app.delete('/api/tareas/:id', (req, res) => {
    let tareas = leerTareas();
    const id = Number(req.params.id); // Obtenemos el id de la URL
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas(tareas);
    res.json({ ok: true });
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});