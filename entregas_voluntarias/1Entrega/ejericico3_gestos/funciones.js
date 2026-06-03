var miImagen = document.getElementById('imagen');
        
var escalaGuardada = 1;
var rotacionGuardada = 0;
var distanciaEmpezar = 0;
var anguloEmpezar = 0;
// Calculamos la distancia usando Pitagoras 
function calcularDistancia(dedo1, dedo2) {
    var distanciaX = dedo2.pageX - dedo1.pageX;
    var distanciaY = dedo2.pageY - dedo1.pageY;
    return Math.sqrt((distanciaX * distanciaX) + (distanciaY * distanciaY));
}

function calcularAngulo(dedo1, dedo2) {
    var distanciaY = dedo2.pageY - dedo1.pageY;
    var distanciaX = dedo2.pageX - dedo1.pageX;
    return Math.atan2(distanciaY, distanciaX) * 180 / Math.PI;
}
// Eventos de tocar pantalla
window.addEventListener('touchstart', function(evento) {
    if (evento.touches.length == 2) {
        distanciaEmpezar = calcularDistancia(evento.touches[0], evento.touches[1]);
        anguloEmpezar = calcularAngulo(evento.touches[0], evento.touches[1]);
    }
});
window.addEventListener('touchmove', function(evento) {
    if (evento.touches.length == 2) {
        evento.preventDefault(); // Para que el movil no haga zoom normal

        var distanciaAhora = calcularDistancia(evento.touches[0], evento.touches[1]);
        var anguloAhora = calcularAngulo(evento.touches[0], evento.touches[1]);

        var cuantoCrece = distanciaAhora / distanciaEmpezar;
        var cuantoGira = anguloAhora - anguloEmpezar;

        var nuevaEscala = escalaGuardada * cuantoCrece;
        var nuevaRotacion = rotacionGuardada + cuantoGira;

        miImagen.style.transform = 'scale(' + nuevaEscala + ') rotate(' + nuevaRotacion + 'deg)';
    }
}, { passive: false });
window.addEventListener('touchend', function(evento) {
    // Si quitamos un dedo, guardamos los valores para la siguiente vez
    if (evento.touches.length < 2) {
        var textoTransform = miImagen.style.transform;  
        // Buscamos los numeros dentro del texto del transform
        if (textoTransform != "") {
            var sacarEscala = textoTransform.match(/scale\((.*?)\)/);
            var sacarRotacion = textoTransform.match(/rotate\((.*?)deg\)/);
            
            if (sacarEscala) {
                escalaGuardada = parseFloat(sacarEscala[1]);
            }
            if (sacarRotacion) {
                rotacionGuardada = parseFloat(sacarRotacion[1]);
            }
        }
    }
});