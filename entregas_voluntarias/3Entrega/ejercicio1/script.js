const botonMic      = document.getElementById('botonMic');
const textoEstado   = document.getElementById('textoEstado');
const transcripcion = document.getElementById('transcripcion');
const tarjetaClima  = document.getElementById('tarjetaClima');
const tarjetaError  = document.getElementById('tarjetaError');
const loader        = document.getElementById('loader');

// DICCIONARIO DE CÓDIGOS DE CLIMA
// La API devuelve números.
// Este objeto traduce los números a descripciones legibles
const codigosClima = {
  0:  'Cielo despejado ☀️',
  1:  'Mayormente despejado 🌤️',
  2:  'Parcialmente nublado ⛅',
  3:  'Nublado ☁️',
  45: 'Niebla 🌫️',
  48: 'Niebla con escarcha 🌫️',
  51: 'Llovizna ligera 🌦️',
  53: 'Llovizna moderada 🌦️',
  55: 'Llovizna densa 🌧️',
  61: 'Lluvia ligera 🌧️',
  63: 'Lluvia moderada 🌧️',
  65: 'Lluvia intensa 🌧️',
  71: 'Nieve ligera ❄️',
  73: 'Nieve moderada ❄️',
  75: 'Nieve intensa ❄️',
  80: 'Chubascos ligeros 🌦️',
  81: 'Chubascos moderados 🌧️',
  82: 'Chubascos violentos ⛈️',
  95: 'Tormenta eléctrica ⛈️',
  99: 'Tormenta con granizo ⛈️🌨️',
};

// FUNCIONES DE INTERFAZ (actualizan lo que ve el usuario)

// cambia el texto de estado y su color
function mostrarEstado(mensaje, tipo = '') {
  textoEstado.textContent = mensaje;
  textoEstado.className = 'texto-estado ' + tipo;
}

// tarjeta de error
function mostrarError(mensaje) {
  tarjetaError.textContent = '⚠️ ' + mensaje;
  tarjetaError.className = 'tarjeta-error';
  tarjetaClima.className = 'tarjeta-clima oculto';
  loader.className = 'loader-oculto';
}

// oculta la tarjeta de error
function ocultarError() {
  tarjetaError.className = 'tarjeta-error oculto';
}

// muestra la animación de los puntos de carga
function mostrarLoader() {
  loader.className = 'loader-visible';
}

// oculta la animación de los puntos de carga
function ocultarLoader() {
  loader.className = 'loader-oculto';
}

// GEOLOCALIZACIÓN
function obtenerPosicion() {
  return new Promise((resolve, reject) => {

    // comprobamos que el navegador soporta geolocalización
    if (!navigator.geolocation) {
      reject(new Error('Tu navegador no soporta geolocalización.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(

      // resolvemos con latitud y longitud
      (posicion) => {
        resolve({
          lat: posicion.coords.latitude,
          lon: posicion.coords.longitude,
        });
      },

      // cada código de error tiene su mensaje descriptivo
      (error) => {
        const mensajes = {
          1: 'Permiso de ubicación denegado. Actívalo en el navegador.',
          2: 'Ubicación no disponible en este momento.',
          3: 'Tiempo de espera de ubicación agotado.',
        };
        reject(new Error(mensajes[error.code] || 'Error desconocido al obtener ubicación.'));
      },

      // máximo 15 segundos de espera, podemos usar una caché d ehasta un minuto
      { timeout: 15000, enableHighAccuracy: false, maximumAge: 60000 }
    );
  });
}

// PETICIÓN DE FETCH

async function pedirClima(lat, lon) {

  // construimos la URL con las coordenadas GPS del usuario
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const respuesta = await fetch(url);

  // si el servidor responde con un error, lanzamos el error
  if (!respuesta.ok) {
    throw new Error(`Error de API: ${respuesta.status} ${respuesta.statusText}`);
  }
  const datos = await respuesta.json();

  // verificamosque los datos contengan el campo que necesitamos
  if (!datos.current_weather) {
    throw new Error('La API no devolvió datos de clima actual.');
  }
  return datos;
}

// PINTAMOS EL CLIMA EN LA PANTALLA

// mostrar datos en pantalla
function pintarClima(datos, lat, lon) {
  const climaActual = datos.current_weather;
  const descripcion = codigosClima[climaActual.weathercode] || `Código ${climaActual.weathercode}`;

  // actualizamos el html con los datos del la API
  document.getElementById('climaTemp').textContent      = `${climaActual.temperature}°C`;
  document.getElementById('climaDesc').textContent      = descripcion;
  document.getElementById('climaViento').textContent    = `${climaActual.windspeed} km/h`;
  document.getElementById('climaDireccion').textContent = `${climaActual.winddirection}°`;
  document.getElementById('climaLat').textContent       = lat.toFixed(4);
  document.getElementById('climaLon').textContent       = lon.toFixed(4);
  document.getElementById('climaUbicacion').textContent = `📍 ${lat.toFixed(3)}, ${lon.toFixed(3)}`;
  document.getElementById('climaHora').textContent      = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit', minute: '2-digit',
  });

  tarjetaClima.className = 'tarjeta-clima';
  ocultarLoader();
}

// FLUJO PRINCIPAL

async function consultarClima() {
  ocultarError();                                   // limpiamos cualquier error anterior
  tarjetaClima.className = 'tarjeta-clima oculto';  
  mostrarLoader();                                  // mostramos animación de carga
  mostrarEstado('Obteniendo tu ubicación GPS…', 'activo');

  try {
    const { lat, lon } = await obtenerPosicion();   // esperamos las coordenadas GPS
    mostrarEstado(`📍 ${lat.toFixed(3)}, ${lon.toFixed(3)} — Consultando API…`, 'activo');

    const datos = await pedirClima(lat, lon);       // esperamos los datos del clima

    mostrarEstado('✅ Clima obtenido correctamente', 'activo');
    pintarClima(datos, lat, lon);                   // pintamos los datos en pantalla

  } catch (error) {
    // captar cualquier error anterior
    mostrarError(error.message);
    mostrarEstado('Error al obtener el clima', 'error');
    console.error('[ClimaPorVoz]', error);
  }
}

// RECONOCIMIENTO DE VOZ
const ReconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!ReconocimientoVoz) {
  // Si el navegador no soporta la API, desactivamos el botón
  mostrarEstado('⚠️ Tu navegador no soporta reconocimiento de voz (usa Chrome)', 'error');
  botonMic.disabled = true;
  botonMic.style.opacity = '0.4';

} else {

  const reconocedor = new ReconocimientoVoz();
  reconocedor.lang = 'es-ES';            // Idioma: español de España
  reconocedor.continuous = false;        // Para después de detectar una frase
  reconocedor.interimResults = false;

  let estaEscuchando = false;            // Variable para saber si ya está activo el micrófono

  // Palabras que activan la consulta del clima
  const palabrasClave = ['clima', 'temperatura', 'tiempo', 'calor', 'frío', 'lluvia', 'weather'];

   // Al pulsar el botón: si ya escucha lo paramos, si no, lo iniciamos
  botonMic.addEventListener('click', () => {
    if (estaEscuchando) { reconocedor.stop(); return; }
    reconocedor.start();
  });

  // EVENTOS QUE SE EJECUTAN CUANDO OCURRE LO SIGUIENTE:
  // Cuando el reconocedor empieza a escuchar
  reconocedor.onstart = () => {
    estaEscuchando = true;
    botonMic.classList.add('escuchando');
    botonMic.querySelector('.icono-mic').textContent = '⏹';
    mostrarEstado('🎤 Escuchando… Habla ahora', 'activo');
    transcripcion.textContent = '…';
    transcripcion.className = 'caja-transcripcion';
  };

  // Cuando el reconocedor detecta lo que dijiste
  reconocedor.onresult = (evento) => {
    const textoOido = evento.results[0][0].transcript.toLowerCase();
    transcripcion.textContent = `"${evento.results[0][0].transcript}"`;
    transcripcion.className = 'caja-transcripcion con-contenido';
    mostrarEstado(`Entendí: "${textoOido}"`, 'activo');

    const hayCoincidencia = palabrasClave.some(palabra => textoOido.includes(palabra));
    if (hayCoincidencia) {
      consultarClima();
    } else {
      mostrarEstado('No reconocí una pregunta sobre el clima. Intenta de nuevo.', 'error');
    }
  };

  // Si hay un error durante la escucha, mostramos un mensaje descriptivo
  reconocedor.onerror = (evento) => {
    const erroresVoz = {
      'no-speech':     'No se detectó voz. Intenta de nuevo.',
      'audio-capture': 'No se detectó micrófono en tu dispositivo.',
      'not-allowed':   'Permiso de micrófono denegado. Actívalo en el navegador.',
      'network':       'Error de red durante el reconocimiento de voz.',
      'aborted':       'Reconocimiento cancelado.',
    };
    mostrarEstado(erroresVoz[evento.error] || `Error de voz: ${evento.error}`, 'error');
  };

   // Cuando el reconocedor termina (por éxito, error o al pulsar stop)
  reconocedor.onend = () => {
    estaEscuchando = false;
    botonMic.classList.remove('escuchando');
    botonMic.querySelector('.icono-mic').textContent = '🎙';
  };
}