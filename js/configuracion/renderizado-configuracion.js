import { obtenerConfiguracion } from "./servicios-configuracion-admin.js";

export function renderizarCampos(campos) {

    const config = obtenerConfiguracion();

    campos.sesion.inputSesion.value = config.sesion.tiempoSesion;
    campos.sesion.inputAuto.checked = config.sesion.cierreAuto;

    campos.listado.inputPag.value = config.listado.itemsPagina;
    campos.listado.inputMonto.value = config.listado.montoMinimo;

    campos.stock.inputBajo.value = config.stock.bajo;
    campos.stock.inputMedio.value = config.stock.medio;

    actualizarLeyenda(campos);
}

export function actualizarLeyenda(campos){

    const bajo = Number(campos.stock.inputBajo.value);
    const medio = Number(campos.stock.inputMedio.value);

    document.getElementById("valBajo").textContent = `${bajo} unidades`;
    document.getElementById("valMedio").textContent = `${medio} unidades`;

    document.getElementById("legendBajo").textContent =
        `Bajo: ≤ ${bajo} u.`;

    document.getElementById("legendMedio").textContent =
        `Medio: ${bajo + 1}–${medio} u.`;

    document.getElementById("legendNormal").textContent =
        `Normal: > ${medio} u.`;
}