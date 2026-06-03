// giroscopio.js
// navegacion por los pasos de una receta mediante la inclinacion del movil (eje gamma)


const UMBRAL_INCLINACION = 20;  // grados necesarios para activar el gesto
const UMBRAL_NEUTRO = 8;        // grados por debajo de los cuales se considera posición neutra
let esperandoNeutro = false;    // bloqueo para evitar disparos continuos

function manejarInclinacion(evento) {
    // gamma: inclinacion izquierda/derecha (-90 a 90 grados)
    const gamma = evento.gamma;
    if (gamma === null) return;

    const pagina = obtenerPaginaActual(); // definida en logicaGeneral.js

    // mientras esta inclinado, esperamos a que vuelva al centro
    if (esperandoNeutro) {
        if (Math.abs(gamma) < UMBRAL_NEUTRO) {
            esperandoNeutro = false;
        }
        return;
    }

    // lado derecho levantado (gamma negativo) --> paso anterior
    if (gamma < -UMBRAL_INCLINACION) {
        console.log(`Giroscopio: lado derecho levantado (gamma ${gamma.toFixed(1)}°) --> paso anterior`);
        esperandoNeutro = true;
        if (pagina === 'paso_receta' && typeof retrocederPaso === 'function') {
            retrocederPaso();
        }
    }

    // lado izquierdo levantado (gamma positivo) --> paso siguiente
    if (gamma > UMBRAL_INCLINACION) {
        console.log(`Giroscopio: lado izquierdo levantado (gamma ${gamma.toFixed(1)}°) --> paso siguiente`);
        esperandoNeutro = true;
        if (pagina === 'paso_receta' && typeof avanzarPaso === 'function') {
            avanzarPaso();
        }
    }
}

function iniciarGiroscopio() {
    if (!window.DeviceOrientationEvent) {
        console.warn("Giroscopio: este dispositivo no soporta DeviceOrientationEvent.");
        return;
    }

    window.addEventListener('deviceorientation', manejarInclinacion);
    console.log("Giroscopio activado.");
}

iniciarGiroscopio();