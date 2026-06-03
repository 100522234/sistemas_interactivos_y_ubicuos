var bola = document.getElementById('bola');
var metaDiv = document.getElementById('destino');
var textoPitch = document.getElementById('pitch');
var textoRoll = document.getElementById('roll');
//Empezamos en el centro de la pantalla
var posX = window.innerWidth / 2;
var posY = window.innerHeight / 2;

function moverConMovel(evento) {
    var inclinacionY = evento.beta;  
    var inclinacionX = evento.gamma; 

    if (inclinacionY != null && inclinacionX != null) {
        textoPitch.innerText = Math.round(inclinacionY);
        textoRoll.innerText = Math.round(inclinacionX);
        //Cambiamos la posicion
        posX = posX + (inclinacionX * 0.7);
        posY = posY + (inclinacionY * 0.7);

        // Limites para que no se salga de la pantalla
        if (posX < 25) { posX = 25; }
        if (posX > window.innerWidth - 25) { posX = window.innerWidth - 25; }
        if (posY < 25) { posY = 25; }
        if (posY > window.innerHeight - 25) { posY = window.innerHeight - 25; }

        bola.style.left = posX + 'px';
        bola.style.top = posY + 'px';

        verSiChoca();
    }
}
function verSiChoca() {
    var rectMeta = metaDiv.getBoundingClientRect();
    var rectBola = bola.getBoundingClientRect();
    // Comprobamos si las coordenadas se cruzan (colision)
    var chocaX = rectBola.right > rectMeta.left && rectBola.left < rectMeta.right;
    var chocaY = rectBola.bottom > rectMeta.top && rectBola.top < rectMeta.bottom;
    if (chocaX && chocaY) {
        metaDiv.style.backgroundColor = "gold";
        metaDiv.style.color = "black";
        metaDiv.innerText = "¡GANASTE!";
        bola.style.backgroundColor = "gold";
        
        // Paramos el evento
        window.removeEventListener('deviceorientation', moverConMovel);
        setTimeout(function() {
            alert("¡Has llegado a la meta!");
        }, 100);
    }
}

// Iniciamos el evento
window.addEventListener('deviceorientation', moverConMovel);