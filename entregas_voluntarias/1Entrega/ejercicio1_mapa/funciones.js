//uniciamos el mapa en Madrid, auqnue podriamos añadir otra
var mapa = L.map('miMapa').setView([40.4168, -3.7038], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(mapa);

//Variables globales para guardar cosas
var marcadorDestino = null; 
var marcadorUsuario = null;
var posicionUsuario = null;
var metrosAviso = 50; 
//Evento de click en el mapa
mapa.on('click', function(evento) {
    // Borrar el anterior si existe
    if (marcadorDestino != null) {
        mapa.removeLayer(marcadorDestino);
    } 
    marcadorDestino = L.marker(evento.latlng).addTo(mapa);
    marcadorDestino.bindPopup("Destino fijado").openPopup();
    
    comprobarDistancia();
});
//Pedir ubicacion al GPS
if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(
        function(posicion) {
            var latitud = posicion.coords.latitude;
            var longitud = posicion.coords.longitude;
            
            posicionUsuario = L.latLng(latitud, longitud);

            if (marcadorUsuario == null) {
                marcadorUsuario = L.circleMarker(posicionUsuario, {
                    color: 'blue', radius: 8, fillOpacity: 0.8
                }).addTo(mapa);
                marcadorUsuario.bindPopup("Mi ubicacion");
                
                mapa.setView(posicionUsuario, 16);
            } else {
                marcadorUsuario.setLatLng(posicionUsuario);
            }

            comprobarDistancia();
        },
        function(error) {
            console.log("Fallo al obtener la ubicacion: " + error.message);
        },
        { enableHighAccuracy: true } 
    );
} else {
    alert("El navegador no tiene geolocalizacion");
}
function comprobarDistancia() {
    if (posicionUsuario != null && marcadorDestino != null) {
        var distancia = mapa.distance(posicionUsuario, marcadorDestino.getLatLng());
        // console.log("Distancia actual: " + distancia);
        if (distancia <= metrosAviso) {
            alert("Has llegado! Estas a menos de " + metrosAviso + " metros.");
            
            // Borramos para que no salte el alert todo el rato
            mapa.removeLayer(marcadorDestino);
            marcadorDestino = null;
        }
    }
}