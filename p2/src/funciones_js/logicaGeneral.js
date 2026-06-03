// logicaGeneral.js

let baseDatosRecetas = {};

// Descargamos las recetas reales desde el servidor Node.js (MongoDB)
async function cargarRecetasDesdeBaseDeDatos() {
    try {
        const respuesta = await fetch('/api/recetas');
        const recetasArray = await respuesta.json();

        recetasArray.forEach(receta => {
            baseDatosRecetas[receta.identificador] = receta;
        });
        
        console.log("Recetas listas desde MongoDB:", baseDatosRecetas);
    } catch (error) {
        console.error("Error al cargar las recetas:", error);
    }
}

cargarRecetasDesdeBaseDeDatos();

function cambiarPantalla(urlDestino) {
    window.location.href = urlDestino;
}

// por si el micro entiende el numero como palabra en vez de digito (en temporizador)
const diccionarioNumeros = {
    // unidades
    'uno': 1, 'un': 1, 'dos': 2, 'tres': 3, 'cuatro': 4,
    'cinco': 5, 'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9,

    // decenas
    'diez': 10, 'quince': 15, 'veinte': 20,
    'veinticinco': 25, 'treinta': 30,
    'treinta y cinco': 35, 'cuarenta': 40,
    'cuarenta y cinco': 45, 'cincuenta': 50,
    'cincuenta y cinco': 55, 'sesenta': 60,
    'sesenta y cinco': 65, 'setenta': 70,
    'setenta y cinco': 75, 'ochenta': 80,
    'ochenta y cinco': 85, 'noventa': 90,
    'noventa y cinco': 95, 'cien': 100, 'ciento': 100,

    // digitos del 1 al 100
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    '15': 15, '20': 20, '25': 25, '30': 30,
    '35': 35, '40': 40, '45': 45, '50': 50,
    '55': 55, '60': 60, '65': 65, '70': 70,
    '75': 75, '80': 80, '85': 85, '90': 90,
    '95': 95, '100': 100
};

// mapa de recetas igual que en seleccion.js
const mapaRecetasGlobal = {
    1: 'tortilla',
    2: 'macarrones',
    3: 'pollo_horno',
    4: 'guacamole'
};

function obtenerPaginaActual() {
    const ruta = window.location.pathname.toLowerCase();
    if (ruta.includes('instrucciones.html'))  return 'instrucciones';
    if (ruta.includes('seleccion.html'))      return 'seleccion';
    if (ruta.includes('iniciar_receta.html')) return 'iniciar_receta';
    if (ruta.includes('paso_receta.html'))    return 'paso_receta';
    return 'index';
}

// aviso para el temporizador (iniciado y acabado)
function mostrarAviso(mensaje, duracion = 3000) {
    let aviso = document.getElementById('avisaTemporizador');
    if (!aviso) {
        aviso = document.createElement('div');
        aviso.id = 'avisaTemporizador';
        aviso.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 16px 28px;
            border-radius: 12px;
            font-size: 1.2rem;
            z-index: 9999;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        `;
        document.body.appendChild(aviso);
    }
    aviso.innerText = mensaje;
    aviso.style.display = 'block';
    clearTimeout(aviso._timeout);
    aviso._timeout = setTimeout(() => {
        aviso.style.display = 'none';
    }, duracion);
}


// Logica de reconocimiento de voz
function iniciarReconocimientoVoz() {
    if (typeof annyang === 'undefined' || !annyang) {
        console.warn("Annyang no está definido en esta página. Añade el <script> de annyang al HTML.");
        return;
    }
    const codigoVoz = getLang() === 'en' ? 'en-US'
                : getLang() === 'pt' ? 'pt-BR'
                : getLang() + '-' + getLang().toUpperCase();
    annyang.setLanguage(codigoVoz);

    const comandos = {};

    // (pantalla de instrucciones) "empezar" --> pasa a la pantalla de seleccionar receta
    comandos[t('voz_empezar')] = () => {
        if (obtenerPaginaActual() !== 'instrucciones') return;
        cambiarPantalla('seleccion.html');
    };

    // (pantalla de ingredientes) "comenzar" --> empieza la receta en el paso 1
    comandos[t('voz_comenzar')] = () => {

        if (obtenerPaginaActual() !== 'iniciar_receta') return;
        console.log("Voz: 'comenzar'");

        // logica para añadir la receta a la memoria antes de ir a paso_receta.html
        const recetaElegida = localStorage.getItem('recetaSeleccionada');
        let abiertas = JSON.parse(localStorage.getItem('recetasAbiertas')) || [];
        let pasos = JSON.parse(localStorage.getItem('pasosActuales')) || [];

        // si la receta no estaba abierta, la añadimos al final de las pestañas
        if (recetaElegida && !abiertas.includes(recetaElegida)) {
            abiertas.push(recetaElegida);
            pasos.push(0);
            localStorage.setItem('recetasAbiertas', JSON.stringify(abiertas));
            localStorage.setItem('pasosActuales', JSON.stringify(pasos));
            localStorage.setItem('indiceRecetaActual', abiertas.length - 1);
        } else if (recetaElegida) {
            // si ya estaba abierta, saltamos a su pestaña
            localStorage.setItem('indiceRecetaActual', abiertas.indexOf(recetaElegida));
        }

        cambiarPantalla('paso_receta.html');
    };

    // (pantalla de cualquier paso) "en voz alta" --> lee el paso en voz alta
    comandos[t('voz_en_voz_alta')] = () => {
        if (obtenerPaginaActual() !== 'paso_receta') return;
        const texto = document.getElementById('descripcionPaso').innerText;
        const voz = new SpeechSynthesisUtterance(texto);
        const LANG_VOZ = {
            es: 'es-ES', en: 'en-US', fr: 'fr-FR', de: 'de-DE',
            it: 'it-IT', pt: 'pt-BR', nl: 'nl-NL', ja: 'ja-JP', zh: 'zh-CN'
        };
        voz.lang = LANG_VOZ[getLang()] || 'es-ES';
        window.speechSynthesis.speak(voz);
    };

    // (pantalla de cualquier paso) "silencio" --> deja de hablar
    comandos[t('voz_silencio')] = () => {
        if (obtenerPaginaActual() !== 'paso_receta') return;
        window.speechSynthesis.cancel();
    };

    comandos[t('voz_ayuda')] = () => {
        console.log("Voz: ayuda");
        cambiarPantalla('instrucciones.html');
    };

    // (pantalla de instrucciones) "volver" --> vuelve a la receta si había una abierta
    comandos[t('voz_volver')] = () => {
        if (obtenerPaginaActual() !== 'instrucciones') return;
        const recetasAbiertas = JSON.parse(localStorage.getItem('recetasAbiertas')) || [];
        if (recetasAbiertas.length > 0) {
            cambiarPantalla('paso_receta.html');
        }
    };

    // (desde cualquier pantalla) "Inicia un temporizador de X segundos/minutos" --> aviso de iniciado y terminado + vibración
    comandos['inicia un temporizador de *duracion'] = (duracion) => {
        const texto = duracion.toLowerCase().trim();

        let milisegundos = null;
        let descripcion = '';

        if (texto.includes('segundo')) {
            // extraemos el numero antes de "segundo(s)"
            const palabra = texto.replace(/segundos?/, '').trim();
            const seg = diccionarioNumeros[palabra] ?? parseInt(palabra);
            if (isNaN(seg)) return;
            milisegundos = seg * 1000;
            descripcion = `${seg} ${t('timer_segundo')}`;

        } else if (texto.includes('minuto')) {
            // extraemos el numero antes de "minuto(s)"
            const palabra = texto.replace(/minutos?/, '').trim();
            const min = diccionarioNumeros[palabra] ?? parseInt(palabra);
            if (isNaN(min)) return;
            milisegundos = min * 60000;
            descripcion = `${min} ${t('timer_minuto')}`;

        } else {
            // si no dice la unidad, asumimos que son minutos (comportamiento anterior)
            const min = diccionarioNumeros[texto] ?? parseInt(texto);
            if (isNaN(min)) return;
            milisegundos = min * 60000;
            descripcion = `${min} ${t('timer_minuto')}`;
        }

        mostrarAviso(t('timer_iniciado', descripcion));

        setTimeout(() => {
            if (navigator.vibrate) {
                navigator.vibrate([500, 200, 500, 200, 500, 200, 500, 200, 500]);
            }
            mostrarAviso(t('timer_finalizado', descripcion), 6000);
        }, milisegundos);
    };

    // (pantalla de seleccionar receta) decir un nº "1", "2", "uno", ... --> selecciona la receta
    ['uno','dos','tres','cuatro',
     '1','2','3','4'].forEach(palabra => {
        comandos[palabra] = () => {
            if (obtenerPaginaActual() !== 'seleccion') return;
            const numero = diccionarioNumeros[palabra];
            if (mapaRecetasGlobal[numero]) {
                console.log(`Voz: receta ${numero}`);
                localStorage.setItem('recetaSeleccionada', mapaRecetasGlobal[numero]);
                cambiarPantalla('iniciar_receta.html');
            }
        };
    });

    // (mientras se esta viendo un video) "volumen al X por ciento" --> se cambia el volumen del video
    comandos['volumen al *porcentaje por ciento'] = (porcentaje) => {
        if (obtenerPaginaActual() !== 'paso_receta') return;
        const palabra = porcentaje.toLowerCase().trim();
        let vol = diccionarioNumeros[palabra] ?? parseInt(palabra);
        if (isNaN(vol)) return;
        // entre 0 y 100
        vol = Math.max(0, Math.min(100, vol));
        console.log(`Voz: volumen al ${vol}%`);
        if (typeof establecerVolumen === 'function') establecerVolumen(vol);
    };

    annyang.addCommands(comandos);

    annyang.start({ autoRestart: true, continuous: true });
    console.log("Control por voz iniciado", obtenerPaginaActual());
}

// arrancamos el reconocimiento de voz automaticamente al cargar la pagina
iniciarReconocimientoVoz();

async function bucleGestos() {
    // Una mano - Avanzar
    if (await esUnaMano() === 1) {
        if (typeof avanzarPaso === 'function') avanzarPaso();
    }

    // Dos manos - Confirmar/Empezar
    if (await sonDosManos() === 1) {
        const btnE = document.getElementById('btnEmpezar');
        if (btnE) btnE.click();
        const btnC = document.getElementById('btnSimularConfirmar');
        if (btnC) btnC.click();
    }

    // Gesto T - Ayuda
    if (await esGestoT() === 1) {
        cambiarPantalla('instrucciones.html');
    }

    setTimeout(bucleGestos, 200);
}

bucleGestos();