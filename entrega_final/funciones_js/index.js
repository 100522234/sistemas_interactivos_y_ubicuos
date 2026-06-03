// index.js
// Lógica de la pantalla de bienvenida

const botonEmpezar = document.getElementById('btnEmpezar');

// Evento de clic normal con el ratón
botonEmpezar.addEventListener('click', () => {
    console.log("Clic detectado. Pasando a instrucciones...");
    cambiarPantalla('instrucciones.html');
});