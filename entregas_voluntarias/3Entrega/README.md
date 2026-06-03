# Ejercicios Voluntaria 3 - Equipo 03

## Contenido de la entrega

Este ZIP contiene los dos ejercicios prácticos de la entrega voluntaria 3:

- `ejercicio1/` — Clima por Voz 
- `ejercicio2/` — Lista de Tareas 

---

## Ejercicio 1 - Clima por Voz

### Descripción
Aplicación web que permite consultar el clima actual mediante reconocimiento de voz.
El usuario dice "¿Cuál es el clima?" y la app detecta su ubicación por GPS y consulta
la API de Open-Meteo para mostrar la temperatura y el viento en pantalla.

### Tecnologías utilizadas
- HTML, CSS, JavaScript (vanilla)
- Web Speech API (SpeechRecognition) para el reconocimiento de voz
- navigator.geolocation para obtener la ubicación GPS del usuario
- Fetch API para realizar peticiones a la API REST de Open-Meteo

### Cómo ejecutar
1. Abrir una terminal en la carpeta `ejercicio1`
2. Levantar un servidor HTTP local:
   ```
   npx serve .
   ```
3. Abrir el navegador en `http://localhost:3000`
4. Pulsar el botón del micrófono y decir: **"¿Cuál es el clima?"**

### Funcionalidades implementadas
- Reconocimiento de voz en español con SpeechRecognition API
- Detección de palabras clave: clima, temperatura, tiempo, calor, frío, lluvia
- Geolocalización del usuario con navigator.geolocation
- Petición fetch a Open-Meteo con las coordenadas obtenidas
- Visualización de temperatura, descripción del cielo, viento y dirección
- Manejo de errores: micrófono denegado, ubicación denegada, fallo de API

---

## Ejercicio 2 - Lista de Tareas REST API

### Descripción
API REST desarrollada con Express que gestiona una lista de tareas.
Incluye una página web estática que se comunica con la API para mostrar,
crear, editar y eliminar tareas en tiempo real.

### Tecnologías utilizadas
- **Backend**: Node.js + Express
- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Almacenamiento**: fichero JSON (`tareas.json`)
- Fetch API en el cliente para comunicarse con la API

### Cómo ejecutar
1. Abrir una terminal en la carpeta `ejercicio2`
2. Instalar dependencias (solo la primera vez):
   ```
   npm install
   ```
3. Arrancar el servidor:
   ```
   node server.js
   ```
4. Abrir el navegador en `http://localhost:3000`

### Funcionalidades implementadas
- CRUD completo: Crear, Leer, Actualizar y Eliminar tareas
- Marcar tareas como completadas/pendientes haciendo clic en el texto
- Editar el texto de una tarea con botón "Editar" y "Guardar"
- Persistencia de datos en fichero JSON
- Interfaz responsive adaptada a móvil y escritorio
