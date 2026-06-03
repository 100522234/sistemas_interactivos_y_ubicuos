// NFC.js
// para la confirmación de cierre de receta para pedir una lectura NFC antes de cerrarla
// si el navegador no soporta NFC la aplicacion sigue funcionando igual que antes

(function () {

    // tiempo max de espera para acercar la tarjeta (milisegundos)
    const TIMEOUT_NFC = 30000;

    // nombre del modal NFC
    const ID_MODAL = 'modalNFC';


    // crear el modal NFC e inyectarlo en el DOM, una sola vez al cargar la pagina

    function crearModalNFC() {
        if (document.getElementById(ID_MODAL)) return; // ya existe

        const modal = document.createElement('div');
        modal.id = ID_MODAL;
        modal.style.cssText = `
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.75);
            z-index: 10000;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: sans-serif;
            color: white;
            text-align: center;
            padding: 24px;
        `;

        modal.innerHTML = `
            <div style="
                background: #1e1e2e;
                border-radius: 20px;
                padding: 40px 32px;
                max-width: 340px;
                width: 100%;
                box-shadow: 0 8px 32px rgba(0,0,0,0.6);
            ">
                <div id="nfcIcono" style="font-size: 64px; margin-bottom: 16px;">💳</div>
                <h2 id="nfcTitulo" style="margin: 0 0 12px; font-size: 1.4rem;">
                    ¿Terminar receta?
                </h2>
                <p id="nfcMensaje" style="margin: 0 0 28px; font-size: 1rem; color: #ccc; line-height: 1.5;">
                    Acerca tu tarjeta para confirmar que has terminado.
                </p>

                <!-- Spinner de espera -->
                <div id="nfcSpinner" style="
                    display: none;
                    width: 48px; height: 48px;
                    border: 5px solid #444;
                    border-top-color: #7c9eff;
                    border-radius: 50%;
                    animation: nfcGiro 0.9s linear infinite;
                    margin: 0 auto 24px;
                "></div>

                <!-- Barra de progreso del timeout -->
                <div id="nfcBarraFondo" style="
                    display: none;
                    background: #333;
                    border-radius: 8px;
                    height: 6px;
                    margin-bottom: 24px;
                    overflow: hidden;
                ">
                    <div id="nfcBarra" style="
                        height: 100%;
                        width: 100%;
                        background: #7c9eff;
                        transition: width linear;
                    "></div>
                </div>

                <div id="nfcBotones" style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                    <button id="btnNFCCancelar" style="
                        background: #444;
                        color: white;
                        border: none;
                        padding: 12px 28px;
                        border-radius: 10px;
                        font-size: 1rem;
                        cursor: pointer;
                    ">Cancelar</button>
                    <button id="btnNFCSaltarFallback" style="
                        display: none;
                        background: #555;
                        color: #ccc;
                        border: none;
                        padding: 12px 28px;
                        border-radius: 10px;
                        font-size: 0.9rem;
                        cursor: pointer;
                    ">Terminar sin NFC</button>
                </div>
            </div>

            <style>
                @keyframes nfcGiro {
                    to { transform: rotate(360deg); }
                }
            </style>
        `;

        document.body.appendChild(modal);

        document.getElementById('btnNFCCancelar').innerText = t('nfc_cancelar');
        document.getElementById('btnNFCSaltarFallback').innerText = t('nfc_saltar');

        // cierra el modal sin hacer nada mas
        document.getElementById('btnNFCCancelar').addEventListener('click', cerrarModalNFC);

        // cierra el modal y cierre de la receta
        document.getElementById('btnNFCSaltarFallback').addEventListener('click', () => {cerrarModalNFC(); ejecutarCierreOriginal();
        });
    }


    // muestra el modal cambiando el display a flex
    function abrirModalNFC() {
        const modal = document.getElementById(ID_MODAL);
        if (modal) modal.style.display = 'flex';
    }

    // oculta el modal, paraliza el escaneo y resetea el contenido al estado inicial para que la prox vez que se abra aparezca limpio
    function cerrarModalNFC() {
        const modal = document.getElementById(ID_MODAL);
        if (modal) modal.style.display = 'none';
        detenerEscaneoNFC();
        resetearEstadoModal();
    }

    // devuelve el modal a su estado inicial (icono, textos y visibilidad de elementos)
    function resetearEstadoModal() {
        // vuelve al estado inicial por si se abre de nuevo
        setMensaje('💳', t('nfc_titulo_inicial'), t('nfc_mensaje_inicial'));
        document.getElementById('nfcSpinner').style.display = 'none';
        document.getElementById('nfcBarraFondo').style.display = 'none';
        document.getElementById('nfcBotones').style.display = 'flex';
        document.getElementById('btnNFCSaltarFallback').style.display = 'none';
    }

    // actualiza el icono, titulo y cuerpo del mensaje del modal
    function setMensaje(icono, titulo, mensaje) {
        document.getElementById('nfcIcono').innerText = icono;
        document.getElementById('nfcTitulo').innerText = titulo;
        document.getElementById('nfcMensaje').innerText = mensaje;
    }


    // Lógica de la API Web NFC

    let nfcReader = null;
    let timeoutEscaneo = null;

    // Detiene el escaneo NFC en curso. aborta el NDEFReader mediante su AbortController, cancela el timeout de expiracion
    function detenerEscaneoNFC() {
        if (nfcReader) {
            try { nfcReader.abort(); } catch (_) {}
            nfcReader = null;
        }
        clearTimeout(timeoutEscaneo);
    }

    // inicia el escaneo NFC
    async function iniciarEscaneoNFC() {
        // mostramos el spinner y barra de tiempo
        document.getElementById('nfcSpinner').style.display = 'block';
        document.getElementById('nfcBarraFondo').style.display = 'block';

        // animacion de la barra hasta llegar a 0 en 30 seg
        const barra = document.getElementById('nfcBarra');
        barra.style.transition = 'none';
        barra.style.width = '100%';
        // para que arranque desde 100%
        void barra.offsetWidth;
        barra.style.transition = `width ${TIMEOUT_NFC}ms linear`;
        barra.style.width = '0%';

        setMensaje('📡', t('nfc_esperando'), t('nfc_esperando_msg'));

        try {
            nfcReader = new NDEFReader();
            const controlador = new AbortController();
            nfcReader._controlador = controlador;

            await nfcReader.scan({ signal: controlador.signal });

            nfcReader.addEventListener('reading', ({ serialNumber, message }) => {
                console.log('NFC: lectura recibida, serial:', serialNumber);
                onTarjetaLeida(serialNumber);
            });

            nfcReader.addEventListener('readingerror', () => {
                console.warn('NFC: error de lectura');
                mostrarErrorNFC('No se pudo leer la tarjeta. Inténtalo de nuevo.');
            });

            // timeout: si no acerca la tarjeta en 30 seg
            timeoutEscaneo = setTimeout(() => {
                detenerEscaneoNFC();
                mostrarTimeoutNFC();
            }, TIMEOUT_NFC);

        } catch (error) {
            console.warn('NFC: error al iniciar escaneo:', error);
            // error de permisos o dispositivo sin NFC
            mostrarFallbackNFC(error);
        }
    }

    function onTarjetaLeida(serial) {
        // cualquier tarjeta NFC sirve como confirmacion
        detenerEscaneoNFC();
        document.getElementById('nfcSpinner').style.display = 'none';
        document.getElementById('nfcBarraFondo').style.display = 'none';
        document.getElementById('nfcBotones').style.display = 'none';

        setMensaje('✅', t('nfc_exito_titulo'), t('nfc_exito_msg'));

        console.log('NFC: confirmación exitosa, serial:', serial);

        // pausa para que el usuario vea el exito antes de cerrar
        setTimeout(() => {
            cerrarModalNFC();
            ejecutarCierreOriginal();
        }, 1800);
    }

    function mostrarErrorNFC(texto) {
        document.getElementById('nfcSpinner').style.display = 'none';
        setMensaje('⚠️', t('nfc_error_titulo'), t('nfc_error_msg'));
        document.getElementById('btnNFCSaltarFallback').style.display = 'inline-block';
    }

    function mostrarTimeoutNFC() {
        document.getElementById('nfcSpinner').style.display = 'none';
        document.getElementById('nfcBarraFondo').style.display = 'none';
        setMensaje('⏰', t('nfc_timeout_titulo'), t('nfc_timeout_msg'));
        document.getElementById('btnNFCSaltarFallback').style.display = 'inline-block';
    }

    function mostrarFallbackNFC(error) {
        document.getElementById('nfcSpinner').style.display = 'none';
        document.getElementById('nfcBarraFondo').style.display = 'none';

        let icono = '📵';
        let titulo = t('nfc_no_disponible');
        let motivo = t('nfc_no_disponible');

        if (!('NDEFReader' in window)) {
            // la API no existe en este navegador
            const esAndroid = /android/i.test(navigator.userAgent);
            const esChrome  = /chrome/i.test(navigator.userAgent) && !/edg/i.test(navigator.userAgent);
            if (!esAndroid) {
                motivo = t('nfc_solo_chrome');
            } else if (!esChrome) {
                motivo = t('nfc_usar_chrome');
            } else {
                motivo = t('nfc_version_chrome');
            }
        } else if (error) {
            if (error.name === 'NotAllowedError') {
                // puede ser HTTP o permiso denegado explicitamente
                const esHTTPS = location.protocol === 'https:';
                if (!esHTTPS) {
                    icono = '🔒'; titulo = t('nfc_no_seguro_titulo'); motivo = t('nfc_no_seguro_msg');
                } else {
                    icono = '🚫'; titulo = t('nfc_denegado_titulo'); motivo = t('nfc_denegado_msg');
                }
            } else if (error.name === 'NotSupportedError') {
                icono = '📴'; titulo = t('nfc_desactivado_titulo'); motivo = t('nfc_desactivado_msg');
            } else {
                motivo = `${t('nfc_error_titulo')}: ${error.message || error.name}`;
            }
        }

        setMensaje(icono, titulo, motivo);

        // mostramos el "Reintentar" ademas de "Terminar sin NFC" para que pueda activar NFC en ajustes y volver
        let btnReintentar = document.getElementById('btnNFCReintentar');
        if (!btnReintentar) {
            btnReintentar = document.createElement('button');
            btnReintentar.id = 'btnNFCReintentar';
            btnReintentar.innerText = t('nfc_reintentar');
            btnReintentar.style.cssText = `
                background: #7c9eff;
                color: white;
                border: none;
                padding: 12px 28px;
                border-radius: 10px;
                font-size: 1rem;
                cursor: pointer;
            `;
            btnReintentar.addEventListener('click', () => {
                // ocultamos el boton y empezamos de nuevo el escaneo
                btnReintentar.style.display = 'none';
                document.getElementById('btnNFCSaltarFallback').style.display = 'none';
                iniciarEscaneoNFC();
            });
            document.getElementById('nfcBotones').prepend(btnReintentar);
        }
        btnReintentar.style.display = 'inline-block';
        document.getElementById('btnNFCSaltarFallback').style.display = 'inline-block';
    }


    // guardamos la funcion original de pasoReceta.js y la reemplazamos

    // esperamos a que el DOM este listo para capturar la funcion original
    function instalarInterceptor() {

        // confirmarCierreReceta es una función global definida en pasoReceta.js
        if (typeof confirmarCierreReceta !== 'function') {
            // Si por algún motivo aún no existe, reintentamos en el siguiente tick
            setTimeout(instalarInterceptor, 50);
            return;
        }

        // guardamos la referencia original
        const confirmarCierreOriginal = confirmarCierreReceta;

        // La exponemos para que nuestro código interno pueda llamarla
        ejecutarCierreOriginal = function () {
            // Ocultamos también el modal de pasoReceta.js por si quedó visible
            const modalViejo = document.getElementById('modalConfirmarCierre');
            if (modalViejo) modalViejo.style.display = 'none';
            confirmarCierreOriginal();
        };

        // Sobreescribimos la función global
        window.confirmarCierreReceta = function () {
            // Ocultamos el modal de confirmación de pasoReceta.js (ya tenemos el nuestro)
            const modalViejo = document.getElementById('modalConfirmarCierre');
            if (modalViejo) modalViejo.style.display = 'none';

            // comprobamos si la Web NFC API existe en este navegador
            if ('NDEFReader' in window) {
                abrirModalNFC();
                iniciarEscaneoNFC();
            } else {
                // sin soporte NFC: abrimos el modal pero mostramos directamente el fallback
                abrirModalNFC();
                mostrarFallbackNFC(null);
            }
        };

        console.log('NFC.js: interceptor instalado sobre confirmarCierreReceta.');
    }

    // Variable para la función de cierre original (se asigna en instalarInterceptor)
    let ejecutarCierreOriginal = function () {};

    // Punto de entrada

    // Creamos el modal en cuanto el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            crearModalNFC();
            instalarInterceptor();
        });
    } else {
        crearModalNFC();
        instalarInterceptor();
    }

})();