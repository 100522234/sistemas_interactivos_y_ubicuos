// Se ejecuta en el navegador y se comunica con la
// API REST del servidor mediante fetch()

// Capturamos los elementos del HTML
const entradaTarea = document.getElementById('entradaTarea');
const botonAñadir = document.getElementById('botonAñadir');
const listaTareas = document.getElementById('listaTareas');

// 1. FUNCIÓN PARA CARGAR LAS TAREAS (READ)
function cargarTareas() {
    fetch('/api/tareas')
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(tareas) {
            listaTareas.innerHTML = '';
            for (let i = 0; i < tareas.length; i++) {
                dibujarTareaEnHTML(tareas[i]);
            }
        })
        .catch(function(error) {
            console.error("Error al cargar las tareas:", error);
        });
}

// 2. FUNCIÓN PARA CREAR UNA TAREA (CREATE)
function agregarTarea() {
    const texto = entradaTarea.value.trim();

    if (texto === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    const configuracion = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: texto })
    };

    fetch('/api/tareas', configuracion)
        .then(function(respuesta) { return respuesta.json(); })
        .then(function(nuevaTarea) {
            dibujarTareaEnHTML(nuevaTarea);
            entradaTarea.value = "";
        })
        .catch(function(error) {
            console.error("Error al añadir tarea:", error);
        });
}

// 3. FUNCIÓN PARA ELIMINAR UNA TAREA (DELETE)
function borrarTarea(idTarea) {
    fetch('/api/tareas/' + idTarea, { method: 'DELETE' })
        .then(function() { cargarTareas(); })
        .catch(function(error) {
            console.error("Error al borrar tarea:", error);
        });
}

// 4. FUNCIÓN PARA ACTUALIZAR ESTADO (UPDATE - completada)
function cambiarEstadoTarea(idTarea, estadoActual) {
    const nuevoEstado = estadoActual === false ? true : false;

    const configuracion = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completada: nuevoEstado })
    };

    fetch('/api/tareas/' + idTarea, configuracion)
        .then(function() { cargarTareas(); })
        .catch(function(error) {
            console.error("Error al actualizar tarea:", error);
        });
}

// 5. FUNCIÓN PARA EDITAR TEXTO (UPDATE - texto)
function editarTarea(idTarea, textoActual, spanTexto, botonEditar) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = textoActual;
    input.className = 'input-editar';

    const botonGuardar = document.createElement('button');
    botonGuardar.textContent = 'Guardar';
    botonGuardar.className = 'boton-guardar';

    const li = spanTexto.parentElement;
    li.replaceChild(input, spanTexto);
    botonEditar.replaceWith(botonGuardar);

    botonGuardar.addEventListener('click', function() {
        const nuevoTexto = input.value.trim();

        if (nuevoTexto === "") {
            alert("El texto no puede estar vacío.");
            return;
        }

        const configuracion = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: nuevoTexto })
        };

        fetch('/api/tareas/' + idTarea, configuracion)
            .then(function() { cargarTareas(); })
            .catch(function(error) {
                console.error("Error al editar tarea:", error);
            });
    });
}

// --- FUNCIÓN VISUAL ---
function dibujarTareaEnHTML(tarea) {
    const li = document.createElement('li');
    if (tarea.completada === true) li.className = 'completada';

    const spanTexto = document.createElement('span');
    spanTexto.textContent = tarea.texto;
    spanTexto.style.cursor = 'pointer';
    spanTexto.addEventListener('click', function() {
        cambiarEstadoTarea(tarea.id, tarea.completada);
    });

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.className = 'boton-editar';
    botonEditar.addEventListener('click', function() {
        editarTarea(tarea.id, tarea.texto, spanTexto, botonEditar);
    });

    const botonBorrar = document.createElement('button');
    botonBorrar.textContent = 'Eliminar';
    botonBorrar.className = 'boton-borrar';
    botonBorrar.addEventListener('click', function() {
        borrarTarea(tarea.id);
    });

    li.appendChild(spanTexto);
    li.appendChild(botonEditar);
    li.appendChild(botonBorrar);
    listaTareas.appendChild(li);
}

// --- EVENTOS ---
botonAñadir.addEventListener('click', agregarTarea);
window.addEventListener('load', cargarTareas);