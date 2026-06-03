// pasoReceta.js
let controlYoutube = null;
let idVideoActual = "";
let recetasAbiertas = [];
let indiceRecetaActual = 0;
let pasosActuales = []; 

window.onload = () => {
    recetasAbiertas = JSON.parse(localStorage.getItem('recetasAbiertas')) || [];
    indiceRecetaActual = parseInt(localStorage.getItem('indiceRecetaActual')) || 0;
    pasosActuales = JSON.parse(localStorage.getItem('pasosActuales')) || [];

    if (recetasAbiertas.length === 0) {
        cambiarPantalla('seleccion.html');
        return;
    }

    while(pasosActuales.length < recetasAbiertas.length) {
        pasosActuales.push(0);
    }

    setTimeout(() => {
        actualizarInterfaz();
    }, 500);

    configurarBotonesPrueba();
};

function guardarEstadoMemoria() {
    localStorage.setItem('recetasAbiertas', JSON.stringify(recetasAbiertas));
    localStorage.setItem('indiceRecetaActual', indiceRecetaActual);
    localStorage.setItem('pasosActuales', JSON.stringify(pasosActuales));
}

function actualizarInterfaz() {
    if (recetasAbiertas.length === 0) {
        cambiarPantalla('seleccion.html');
        return;
    }

    const idReceta = recetasAbiertas[indiceRecetaActual];
    const datosReceta = baseDatosRecetas[idReceta];
    
    if(!datosReceta) return; 

    const pasoDeEstaReceta = pasosActuales[indiceRecetaActual];
    const datosPaso = datosReceta.pasos[pasoDeEstaReceta];

    document.getElementById('tituloReceta').innerText = datosReceta.titulo[getLang()] || datosReceta.titulo['es'];
    document.getElementById('tituloPaso').innerText = "PASO " + datosPaso.numero;
    document.getElementById('descripcionPaso').innerText = datosPaso.texto[getLang()] || datosPaso.texto['es'];

    // --- LÓGICA CORREGIDA DE IMAGEN Y BOTÓN ---
    const elementoImagen = document.getElementById('imgPaso');
    const botonVideo = document.getElementById('btnGestoAbrirVideo');

    // Comprobamos si este paso tiene vídeo en la base de datos
    if (datosPaso.videoYoutube && datosPaso.videoYoutube !== "") {
        // Si tiene vídeo, mostramos el botón azul y preparamos el ID de YouTube
        botonVideo.style.display = 'block';
        const trozosEnlace = datosPaso.videoYoutube.split('/');
        idVideoActual = trozosEnlace[trozosEnlace.length - 1]; 
    } else {
        // Si no tiene vídeo, ocultamos el botón
        botonVideo.style.display = 'none';
        idVideoActual = "";
    }
    // 1. Siempre mostramos la foto sin excepción
    elementoImagen.style.display = 'block';
    elementoImagen.src = datosPaso.imagen;

    // 2. Si hay vídeo en la BD, sacamos su ID y mostramos el botón azul
    if (datosPaso.videoYoutube && datosPaso.videoYoutube !== "") {
        botonVideo.style.display = 'block';
        const trozosEnlace = datosPaso.videoYoutube.split('/');
        idVideoActual = trozosEnlace[trozosEnlace.length - 1]; 
    } else {
        botonVideo.style.display = 'none';
        idVideoActual = "";
    }

    // Dibujar pestañas
    const contenedorPestanas = document.getElementById('contenedorPestanas');
    contenedorPestanas.innerHTML = ''; 

    for (let i = 0; i < recetasAbiertas.length; i++) {
        const divPestana = document.createElement('div');
        divPestana.className = 'pestana';
        if (i === indiceRecetaActual) {
            divPestana.classList.add('activa');
        }
        const rec = baseDatosRecetas[recetasAbiertas[i]];
        divPestana.innerText = rec ? (rec.titulo[getLang()] || rec.titulo['es']) : "Cargando...";
        contenedorPestanas.appendChild(divPestana);
    }

    const divAbrir = document.createElement('div');
    divAbrir.className = 'pestana-nueva';
    divAbrir.innerText = t('abrir_receta');
    contenedorPestanas.appendChild(divAbrir);

    aplicarIdiomaAlDOM();
}

function avanzarPaso() {
    const idReceta = recetasAbiertas[indiceRecetaActual];
    const totalPasos = baseDatosRecetas[idReceta].pasos.length;
    const pasoActual = pasosActuales[indiceRecetaActual];

    if (pasoActual === totalPasos - 1) {
        // En lugar de cerrar de golpe, mostramos la pregunta
        abrirModalCierre(); 
    } else {
        pasosActuales[indiceRecetaActual]++;
        guardarEstadoMemoria();
        actualizarInterfaz();
    }
}

function retrocederPaso() {
    if (pasosActuales[indiceRecetaActual] > 0) {
        pasosActuales[indiceRecetaActual]--;
        guardarEstadoMemoria();
        actualizarInterfaz();
    }
}

function abrirModalCierre() {
    document.getElementById('modalConfirmarCierre').style.display = 'flex';
}

function rechazarCierre() {
    // Si rechazamos, simplemente ocultamos la pregunta y seguimos donde estábamos
    document.getElementById('modalConfirmarCierre').style.display = 'none';
}

function confirmarCierreReceta() {
    // Si confirmamos, ocultamos la pregunta y ejecutamos el borrado real
    document.getElementById('modalConfirmarCierre').style.display = 'none';
    
    recetasAbiertas.splice(indiceRecetaActual, 1);
    pasosActuales.splice(indiceRecetaActual, 1);

    if (recetasAbiertas.length > 0) {
        indiceRecetaActual = Math.min(indiceRecetaActual, recetasAbiertas.length - 1);
        guardarEstadoMemoria();
        actualizarInterfaz();
    } else {
        localStorage.removeItem('recetasAbiertas');
        localStorage.removeItem('pasosActuales');
        cambiarPantalla('seleccion.html');
    }
}

function alternarPestanasSimulado() {
    if (recetasAbiertas.length > 1) {
        indiceRecetaActual = (indiceRecetaActual + 1) % recetasAbiertas.length;
        guardarEstadoMemoria();
        actualizarInterfaz();
    }
}

function abrirNuevaRecetaSimulada() {
    guardarEstadoMemoria(); 
    cambiarPantalla('seleccion.html'); 
}


// --- LÓGICA DEL REPRODUCTOR GIGANTE (API YOUTUBE) ---

function abrirVideoModal() {
    if (idVideoActual === "") return;
    
    document.getElementById('modalVideoGestos').style.display = 'flex';

    if (controlYoutube === null) {
        controlYoutube = new YT.Player('reproductorYoutube', {
            height: '270', // <-- Reducido de 315 a 270
            width: '480',  // <-- Reducido de 560 a 480
            videoId: idVideoActual,
            playerVars: { 'controls': 0, 'disablekb': 1, 'rel': 0 }, 
            events: {
                'onReady': alCargarVideo,
                'onStateChange': alCambiarEstadoVideo
            }
        });
    } else {
        controlYoutube.loadVideoById(idVideoActual);
    }
}

function cerrarVideoModal() {
    document.getElementById('modalVideoGestos').style.display = 'none';
    if (controlYoutube !== null) {
        controlYoutube.pauseVideo();
    }
}

function alCargarVideo(evento) {
    evento.target.playVideo();
    actualizarBarraVolumen(evento.target.getVolume());
}

function alCambiarEstadoVideo(evento) {
    const iconoPausa = document.getElementById('iconoPausaGigante');
    // Si el estado es 2, significa que está en Pausa
    if (evento.data === YT.PlayerState.PAUSED) {
        iconoPausa.style.display = 'flex';
    } else {
        iconoPausa.style.display = 'none';
    }
}

function alternarPausaPlay() {
    if (!controlYoutube) return;
    const estado = controlYoutube.getPlayerState();
    if (estado === YT.PlayerState.PLAYING) {
        controlYoutube.pauseVideo();
    } else {
        controlYoutube.playVideo();
    }
}

function cambiarVolumen(cantidad) {
    if (!controlYoutube) return;
    let volumenActual = controlYoutube.getVolume();
    let nuevoVolumen = volumenActual + cantidad;
    
    if (nuevoVolumen > 100) nuevoVolumen = 100;
    if (nuevoVolumen < 0) nuevoVolumen = 0;
    
    controlYoutube.setVolume(nuevoVolumen);
    actualizarBarraVolumen(nuevoVolumen);
}
function establecerVolumen(volumen) {
    if (!controlYoutube) return;
    controlYoutube.setVolume(volumen);
    actualizarBarraVolumen(volumen);
}

function actualizarBarraVolumen(volumen) {
    document.getElementById('textoVolumen').innerText = volumen;
    document.getElementById('barraVolumenNivel').style.width = volumen + '%';
}
// --- LÓGICA DE SALTO DE 10 SEGUNDOS ---

// Lógica para retroceder 10 segundos
document.getElementById('btnSimularMenos10s').addEventListener('click', () => {
    if (controlYoutube) {
        const tiempoActual = controlYoutube.getCurrentTime();
        // Le decimos a YouTube que vaya al tiempo actual menos 10 segundos
        controlYoutube.seekTo(tiempoActual - 10, true);
    }
});

// Lógica para adelantar 10 segundos
document.getElementById('btnSimularMas10s').addEventListener('click', () => {
    if (controlYoutube) {
        const tiempoActual = controlYoutube.getCurrentTime();
        // Le decimos a YouTube que vaya al tiempo actual más 10 segundos
        controlYoutube.seekTo(tiempoActual + 10, true);
    }
});

// Configurar los botones de prueba de los gestos del vídeo
document.getElementById('btnSimularCerrarVideo').addEventListener('click', cerrarVideoModal);
document.getElementById('btnSimularPausa').addEventListener('click', alternarPausaPlay);
document.getElementById('btnSimularVolMas').addEventListener('click', () => cambiarVolumen(10));
document.getElementById('btnSimularVolMenos').addEventListener('click', () => cambiarVolumen(-10));


// Controles de la pantalla de confirmación
document.getElementById('btnSimularConfirmar').addEventListener('click', confirmarCierreReceta);
document.getElementById('btnSimularRechazar').addEventListener('click', rechazarCierre);
function configurarBotonesPrueba() {
    // --- 1. BOTONES DE NAVEGACIÓN MANUAL ---
    const btnManualAnt = document.getElementById('btnManualAnterior');
    if (btnManualAnt) btnManualAnt.addEventListener('click', retrocederPaso);

    const btnManualSig = document.getElementById('btnManualSiguiente');
    if (btnManualSig) btnManualSig.addEventListener('click', avanzarPaso);

    // --- 2. CONTROLES DEL MODAL DE VÍDEO ---
    const btnSalirVideo = document.getElementById('btnSimularCerrarVideo');
    if (btnSalirVideo) btnSalirVideo.addEventListener('click', cerrarVideoModal);

    const btnPausaVideo = document.getElementById('btnSimularPausa');
    if (btnPausaVideo) btnPausaVideo.addEventListener('click', alternarPausaPlay);

    const btnAbrirVideo = document.getElementById('btnGestoAbrirVideo');
    if (btnAbrirVideo) btnAbrirVideo.addEventListener('click', abrirVideoModal);

    // --- 3. CONTROLES DEL MODAL DE CONFIRMACIÓN (LOS QUE TE FALLAN AHORA) ---
    const btnConfirmar = document.getElementById('btnSimularConfirmar');
    if (btnConfirmar) btnConfirmar.addEventListener('click', confirmarCierreReceta);

    const btnRechazar = document.getElementById('btnSimularRechazar');
    if (btnRechazar) btnRechazar.addEventListener('click', rechazarCierre);

    // --- 4. OTROS CONTROLES ---
    const btnAlt = document.getElementById('btnGestoAlternar');
    if (btnAlt) btnAlt.addEventListener('click', alternarPestanasSimulado);

    const btnAbrir = document.getElementById('btnGestoAbrir');
    if (btnAbrir) btnAbrir.addEventListener('click', abrirNuevaRecetaSimulada);

    const btnCerrar = document.getElementById('btnGestoCerrarReceta');
    if (btnCerrar) btnCerrar.addEventListener('click', abrirModalCierre);

    const btnAyuda = document.getElementById('btnGestoAyudaPaso');
    if (btnAyuda) {
        btnAyuda.addEventListener('click', () => {
            guardarEstadoMemoria(); 
            cambiarPantalla('instrucciones.html');
        });
    }
}