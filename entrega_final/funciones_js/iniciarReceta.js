// iniciarReceta.js


window.onload = () => {
    const idRecetaElegida = localStorage.getItem('recetaSeleccionada') || 'tortilla';
    const btnAyuda = document.getElementById('btnGestoAyuda');
    if(btnAyuda) btnAyuda.addEventListener('click', () => cambiarPantalla('instrucciones.html'));
    
    setTimeout(() => {
        const datosReceta = baseDatosRecetas[idRecetaElegida];
        if (datosReceta) {
            document.getElementById('imgResumen').src = datosReceta.imagenPrincipal;
            document.getElementById('textoIngredientes').innerText = datosReceta.ingredientes[getLang()] || datosReceta.ingredientes['es'];
        } else {
            document.getElementById('textoIngredientes').innerText = "⚠️ Receta no encontrada en la base de datos.";
        }
        aplicarIdiomaAlDOM();
    }, 500);

    const botonEmpezar = document.getElementById('btnSimularEmpezar');
    if (botonEmpezar) {
        botonEmpezar.addEventListener('click', () => {
            // 1. Recuperamos las recetas que ya estaban abiertas (o creamos una lista vacía)
            let recetasAbiertas = JSON.parse(localStorage.getItem('recetasAbiertas')) || [];
            
            // 2. Si la receta no estaba ya abierta, la metemos en la lista
            if (!recetasAbiertas.includes(idRecetaElegida)) {
                recetasAbiertas.push(idRecetaElegida);
            }
            
            // 3. Guardamos la lista actualizada y marcamos esta nueva como la "activa"
            localStorage.setItem('recetasAbiertas', JSON.stringify(recetasAbiertas));
            localStorage.setItem('indiceRecetaActual', recetasAbiertas.indexOf(idRecetaElegida));
            
            cambiarPantalla('paso_receta.html');
        });
    }
};