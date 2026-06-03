// tactil.js
// Implementación de la Web Touch API (Evaluación al levantar los dedos)
//3 Dedos cambiamos entre las recetas 
//4 Dedos abrimos una neuva receta 
//5 Dedos cerramos el video que estamos visualizando 

(function() {
    let ultimoToque = 0;
    const COOLDOWN_TACTIL = 1000;
    
    // Guardará el "récord" de dedos apoyados
    let maximaCantidadDedos = 0; 

    function iniciarEventosTactiles() {
        
        // 1. CUANDO LOS DEDOS TOCAN LA PANTALLA
        window.addEventListener('touchstart', (evento) => {
            maximaCantidadDedos = Math.max(maximaCantidadDedos, evento.touches.length);

            // Bloqueamos el comportamiento de Windows si usamos 3, 4 o 5 dedos
            if (evento.touches.length >= 3) {
                evento.preventDefault(); 
            }
        }, { passive: false }); 

        // 2. CUANDO LOS DEDOS SE LEVANTAN DE LA PANTALLA
        window.addEventListener('touchend', (evento) => {
            // Si ya no quedan dedos en la pantalla
            if (evento.touches.length === 0) {
                const ahora = Date.now();

                if (ahora - ultimoToque > COOLDOWN_TACTIL) {
                    
                    // --- GESTO 1: 3 DEDOS (Cambiar Receta) ---
                    if (maximaCantidadDedos === 3) {
                        console.log("👆👆👆 3 dedos detectados: Cambiando de receta");
                        if (typeof alternarPestanasSimulado === 'function') {
                            alternarPestanasSimulado();
                            ultimoToque = ahora; 
                        }
                    }
                    
                    // --- GESTO 2: 4 DEDOS (Nueva Receta) ---
                    else if (maximaCantidadDedos === 4) {
                        console.log("👆👆👆👆 4 dedos detectados: Menú de nueva receta");
                        if (typeof abrirNuevaRecetaSimulada === 'function') {
                            abrirNuevaRecetaSimulada();
                            ultimoToque = ahora;
                        }
                    }

                    // --- GESTO 3: 5 DEDOS (Cerrar Vídeo) ---
                    else if (maximaCantidadDedos === 5) {
                        console.log("🖐️ 5 dedos detectados: Cerrando el vídeo");
                        const modalVideoAbierto = document.getElementById('modalVideoGestos');
                        
                        // Solo lo cierra si la pantalla del vídeo está visible
                        if (modalVideoAbierto && modalVideoAbierto.style.display !== 'none') {
                            if (typeof cerrarVideoModal === 'function') {
                                cerrarVideoModal();
                                ultimoToque = ahora;
                            }
                        }
                    }
                }

                // Reseteamos el contador de dedos para el siguiente toque
                maximaCantidadDedos = 0;
            }
        });

        // 3. BLOQUEO DE ARRASTRE
        window.addEventListener('touchmove', (evento) => {
            if (evento.touches.length >= 3) {
                evento.preventDefault(); 
            }
        }, { passive: false });
    }

    iniciarEventosTactiles();
    console.log("API Táctil lista: 3 dedos (Cambiar), 4 dedos (Nueva), 5 dedos (Cerrar vídeo).");
})();