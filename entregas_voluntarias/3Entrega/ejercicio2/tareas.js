const fs = require('fs');
const ARCHIVO = './tareas.json';

// Si no existe el archivo, lo creamos vacío
if (!fs.existsSync(ARCHIVO)) {
    fs.writeFileSync(ARCHIVO, '[]');
}

// FUNCIÓN: leerTareas
// Lee el fichero JSON y devuelve el array de tareas
function leerTareas() {
    const datos = fs.readFileSync(ARCHIVO, 'utf-8');
    return JSON.parse(datos);
}

// FUNCIÓN: guardarTareas
// Recibe un array de tareas y lo escribe en el fichero JSON
function guardarTareas(tareas) {
    fs.writeFileSync(ARCHIVO, JSON.stringify(tareas, null, 2));
}

// Exportamos las funciones para que puedan usarse en otros fichero
module.exports = { leerTareas, guardarTareas };