
const socket = io();

function enviarComando(color) {
    const datos = { id: 1, color: color };
    console.log("Enviando comando por botón:", datos);
    socket.emit('comando-mando', datos);
}

// NUEVA Lógica de SENSORES con petición de permisos
function activarSensores() {
    // Comprobamos si el dispositivo requiere pedir permiso explícito (como los iPhone modernos)
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    empezarAEscucharGiroscopio();
                } else {
                    alert("Permiso denegado para usar el giroscopio.");
                }
            })
            .catch(console.error);
    } else {
        // Dispositivos Android o navegadores que no requieren permiso explícito
        empezarAEscucharGiroscopio();
    }
}

function empezarAEscucharGiroscopio() {
    alert("¡Sensores activados! Gira el móvil como un volante.");
    const chivato = document.getElementById('info-giroscopio');

    // 1. Intentamos leer el Giroscopio (Orientación)
    window.addEventListener('deviceorientation', (event) => {
        const inclinacionX = event.gamma; // Inclinación izquierda/derecha
        
        if (inclinacionX !== null) {
            chivato.innerText = "Giro: " + Math.round(inclinacionX) + "º";
            
            if (inclinacionX > 45) {
                socket.emit('comando-mando', { id: 2, color: 'green' });
            } else if (inclinacionX < -45) {
                socket.emit('comando-mando', { id: 3, color: 'orange' });
            }
        }
    });

    // 2. Intentamos leer el Acelerómetro (Movimiento) como plan B
    window.addEventListener('devicemotion', (event) => {
        // Solo usamos esto si el giroscopio no ha dado señales de vida
        if (chivato.innerText.includes("Esperando")) {
            const acelX = event.accelerationIncludingGravity.x;
            
            if (acelX !== null) {
                chivato.innerText = "Movimiento X: " + acelX.toFixed(2);
                
                // Si movemos el móvil bruscamente a los lados
                if (acelX > 5) {
                    socket.emit('comando-mando', { id: 4, color: 'green' });
                } else if (acelX < -5) {
                    socket.emit('comando-mando', { id: 5, color: 'orange' });
                }
            }
        }
    });
}