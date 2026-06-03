//cuando interactuemos con algo del html lo guardamo: 
const video = document.getElementById('miVideo');
const statusDiv = document.getElementById('status'); // Antiguo cajaMensaje
const startBtn = document.getElementById('startBtn'); // Antiguo botonEmpezar
//nos permite controlar si la pausa fue por un comando o por el sistema
let intencionDePausa = true; 

//configuracion de la API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; //que nos escuche en español
    recognition.continuous = true; // que no se apague al escuchar la primera palabra

    // cando detecte que ha hablado extraemos el comando
    recognition.onresult = (event) => { 
        // IMPORTANTE:obtenemos solo el último resultado para evitar saturación
        const lastResultIndex = event.results.length - 1;
        const comando = event.results[lastResultIndex][0].transcript.trim().toLowerCase();
        
        console.log("Comando procesado: " + comando);

        if (comando.includes("reproducir")) {
            intencionDePausa = false; // Queremos que suene
            video.play();
            actualizarEstado("Vídeo reproduciéndose (Comando: Reproducir)", "success");
            
        } else if (comando.includes("pausar")) {
            intencionDePausa = true; // Queremos pausarlo nosotros
            video.pause();
            actualizarEstado("Vídeo pausado (Comando: Pausar)", "success");
            
        } else if (comando.includes("subir")) {
            if (video.volume < 1.0) video.volume = Math.min(1.0, video.volume + 0.2);
            actualizarEstado("Volumen subido", "success");
            
        } else if (comando.includes("bajar")) {
            if (video.volume > 0.0) video.volume = Math.max(0.0, video.volume - 0.2);
            actualizarEstado("Volumen bajado", "success");
            
        } else if (comando.length > 2) {
            actualizarEstado(`Comando no reconocido: "${comando}"`, "error");
            if (video.paused && intencionDePausa) {
                hablar("Comando no reconocido. Revisa la guía.");
            }
        }
    };


    recognition.onend = () => {
        try { recognition.start(); } catch(e) {}
    };
} else {
    actualizarEstado("Navegador no soportado.", "error");
}

// Evita que Android lo pause¡¡¡ MUY IMPORTANTE !!! porque sino se queda pocho sin reproducirse
video.addEventListener('pause', () => {
    // Si el video se pausa, pero nosotros NO dijimos "pausar"
    if (!intencionDePausa) {
        // Lo forzamos a seguir reproduciéndose
        video.play();
    }
});

//funcion que nos permite hacer que el ordenador diga en voz alta que el comando no ha sido entendido 

function hablar(textoTexto) {
    const sintesis = window.speechSynthesis;
    const locucion = new SpeechSynthesisUtterance(textoTexto);
    locucion.lang = 'es-ES';
    sintesis.speak(locucion);
}

//Para actualizar el estado en la pantalla con diferentes estilos según el tipo de mensaje
//Esto es mas de diseño
function actualizarEstado(mensaje, tipo) {
    statusDiv.textContent = mensaje;
    statusDiv.className = tipo;
}

//giroscopio
function iniciarGiroscopio(event) {
    // La aceleración en X (izquierda/derecha)
    const accX = event.accelerationIncludingGravity.x;
    
    // 1. ignoramos valores entre -3 y 3 para que el pulso normal no mueva el vídeo
    if (Math.abs(accX) > 3) {
       
        const velocidad = accX / 40; 
        video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime - velocidad));
        const accion = accX > 0 ? "Retrocediendo" : "Adelantando";
        actualizarEstado(`Gesto: ${accion} video`, "neutral");
    }
}
// Hemos creado un boton el cual cuando tu estes listo para que el movil te escuche 
//Empiece a escuchar y a usar el giroscopio
//Estto lo hemos puesto con el fin de tener mayor privacidad
startBtn.addEventListener('click', () => {
    video.volume = 0.5; // Volumen inicial del reproductor
    
    // Activamos escuchar
    if (recognition) {
        try { recognition.start(); } catch(e) {}
        actualizarEstado("Escuchando... Di un comando.", "success");
    }
    
    // Activamos el giroscopio
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(state => {
                if (state === 'granted') window.addEventListener('devicemotion', iniciarGiroscopio);
            }).catch(console.error);
    } else {
        window.addEventListener('devicemotion', iniciarGiroscopio);
    }
    
    startBtn.style.display = 'none'; // Escondemos el botón una vez pulsado
});

// Nota: En la documentación de la API de reconocimiento de voz se recomienda que se use el estandar de reconocimiento.onresult() 
// para evitar problemas de compatibilidad, tal y como se ha implementado en este código final integrando la mejora de fluidez.