const video = document.getElementById("myvideo");
const status = document.getElementById("status");
const socket = io();
let model = null;

// Canvas oculto para medir el brillo del frame
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const UMBRAL_OSCURIDAD = 15;      // Brillo medio mínimo (0-255)
const FRAMES_PARA_CONFIRMAR = 3;  // Frames oscuros consecutivos para confirmar
let framesTapada = 0;
let camaraTapadaEmitida = false;

const modelParams = {
    flipHorizontal: true,
    maxNumBoxes: 2,
    iouThreshold: 0.5,
    scoreThreshold: 0.6
};

handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
    status.innerText = "IA Lista. Iniciando cámara...";
    handTrack.startVideo(video).then(statusVideo => {
        if (statusVideo) {
            status.innerText = "Detectando manos...";
            setInterval(detectar, 500);
        }
    });
});

function medirBrillo() {
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const datos = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let suma = 0;
    for (let i = 0; i < datos.length; i += 4) {
        suma += (datos[i] + datos[i + 1] + datos[i + 2]) / 3;
    }
    return suma / (datos.length / 4);
}

function detectar() {
    const brillo = medirBrillo();

    // DEPURACIÓN: muestra el brillo en pantalla
    divStatus.innerText = `Brillo: ${brillo.toFixed(1)} | Frames tapada: ${framesTapada}`;

    if (brillo < UMBRAL_OSCURIDAD) {
        framesTapada++;
        if (framesTapada >= FRAMES_PARA_CONFIRMAR && !camaraTapadaEmitida) {
            status.innerText = "🖐️ ¡CÁMARA TAPADA! Finalizando receta...";
            socket.emit('gestoDetectado', 'camara_tapada');
            camaraTapadaEmitida = true;
        }
        return;
    } else {
        framesTapada = 0;
        camaraTapadaEmitida = false;
    }

    model.detect(video).then(predictions => {
        const numManos = predictions.filter(p => p.label !== 'face').length;

        if (numManos === 1) {
            status.innerText = "¡UNA MANO DETECTADA!";
            socket.emit('gestoDetectado', 'una_mano');
        } else if (numManos === 2) {
            status.innerText = "¡DOS MANOS DETECTADAS!";
            socket.emit('gestoDetectado', 'dos_manos');
        } else {
            status.innerText = "Esperando manos...";
        }
    });
}