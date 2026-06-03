async function consultarSensor(tipoGesto) {
    try {
        const respuesta = await fetch(`/api/verificar-gesto/${tipoGesto}`);
        const data = await respuesta.json();
        return data.resultado; // Devuelve 1 o 0
    } catch (e) {
        return 0;
    }
}

async function esUnaMano() {
    return await consultarSensor('una_mano');
}

async function sonDosManos() {
    return await consultarSensor('dos_manos');
}

async function esGestoT() {
    return await consultarSensor('gesto_T');
}