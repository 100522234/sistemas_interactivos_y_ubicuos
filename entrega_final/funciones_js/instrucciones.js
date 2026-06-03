// instrucciones.js

window.onload = () => {
    const btnSimularVoz = document.getElementById('btnSimularVozEmpezar');
    const btnVolverReceta = document.getElementById('btnVolverRecetaActiva');

    // Comprobamos la memoria para ver si hay recetas abiertas
    const recetasAbiertas = JSON.parse(localStorage.getItem('recetasAbiertas')) || [];

    // Botón normal de Empezar (Va a selección)
    if (btnSimularVoz) {
        btnSimularVoz.addEventListener('click', () => {
            cambiarPantalla('seleccion.html');
        });
    }

    // Si hay recetas a medias, mostramos el botón de volver y le damos vida
    if (recetasAbiertas.length > 0 && btnVolverReceta) {
        btnVolverReceta.style.display = 'inline-block';
        btnVolverReceta.addEventListener('click', () => {
            cambiarPantalla('paso_receta.html');
        });
    }
};