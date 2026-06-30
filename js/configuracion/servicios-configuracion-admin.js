import { obtenerLocalStorage, guardarLocalStorage } from '../core/localStorage.js';
import { mostrarAlertaExito } from "../UI/Alertas.js";
import { validarConfiguracion } from './validaciones-configuracion.js';

export function obtenerConfiguracion() {
    return obtenerLocalStorage("configuracion");
}

export function guardarConfiguracion(config) {
    guardarLocalStorage(config, "configuracion");
}

export function guardarCambios(campos){

    if(!validarConfiguracion(campos)){
        return;
    }

    const config = obtenerConfiguracion();

    config.sesion.tiempoSesion = Number(campos.sesion.inputSesion.value);
    config.sesion.cierreAuto = campos.sesion.inputAuto.checked;

    config.listado.itemsPagina = Number(campos.listado.inputPag.value);
    config.listado.montoMinimo = Number(campos.listado.inputMonto.value);

    config.stock.bajo = Number(campos.stock.inputBajo.value);
    config.stock.medio = Number(campos.stock.inputMedio.value);

    guardarConfiguracion(config);

    mostrarAlertaExito(
        "¡Cambios guardados!",
        "La configuración se actualizó correctamente.",
        "configuracion-admin.html"
    );
}