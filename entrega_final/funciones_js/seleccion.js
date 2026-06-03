// seleccion.js

window.onload = () => {
    // Mapa con los identificadores EXACTOS de tu base de datos de MongoDB
    const mapaRecetas = {
        1: 'tortilla',
        2: 'macarrones',
        3: 'pollo_horno',
        4: 'guacamole'
    };
    const btnAyuda = document.getElementById('btnGestoAyuda');
    if(btnAyuda) btnAyuda.addEventListener('click', () => cambiarPantalla('instrucciones.html'));

    // Esperamos 1.5s a que la BD cargue y luego dibujamos las tarjetas
    setTimeout(() => {
        dibujarTarjetas(mapaRecetas);
        aplicarIdiomaAlDOM();
    }, 500);

    // Lógica para los 4 botones simulados
    for (let i = 1; i <= 4; i++) {
        const botonSimular = document.getElementById('btnSim' + i);
        if (botonSimular) {
            botonSimular.addEventListener('click', () => {
                const idRecetaElegida = mapaRecetas[i];
                console.log(`El usuario ha elegido: ${idRecetaElegida}`);
                
                // Guardamos la decisión y avanzamos
                localStorage.setItem('recetaSeleccionada', idRecetaElegida);
                cambiarPantalla('iniciar_receta.html');
            });
        }
    }
};

// Función para inyectar el HTML de cada receta dinámicamente
function dibujarTarjetas(mapa) {
    const contenedor = document.getElementById('contenedorRecetas');
    if (!contenedor) return;

    contenedor.innerHTML = ''; // Borramos el texto de "Cargando recetas..."

    // Recorremos los números del 1 al 4
    for (let i = 1; i <= 4; i++) {
        const idReceta = mapa[i];
        const datosReceta = baseDatosRecetas[idReceta];

        console.log(`Receta ${idReceta}:`, datosReceta);

        // Si la receta existe en la base de datos, la dibujamos
        if (datosReceta) {
            const tarjetaDiv = document.createElement('div');
            tarjetaDiv.className = 'tarjeta';
            
            tarjetaDiv.innerHTML = `
                <img src="${datosReceta.imagenPrincipal}" alt="Foto de ${datosReceta.titulo[getLang()] || datosReceta.titulo['es']}">
                <span>${i}. ${datosReceta.titulo[getLang()] || datosReceta.titulo['es']}</span>
            `;
            
            contenedor.appendChild(tarjetaDiv);
        }
    }
}