import { renderizarCampos, actualizarLeyenda } from "./renderizado-configuracion.js";
import { guardarCambios } from "./servicios-configuracion-admin.js";

const campos = {
    sesion:{
        inputSesion: document.getElementById("tiempoSesion"),
        inputAuto: document.getElementById("cierreAuto"),
        divError: document.getElementById("errorTiempo")
    },

    listado:{
        inputPag: document.getElementById("itemsPagina"),
        inputMonto: document.getElementById("montoMinimo"),
        divErrorPag: document.getElementById("errorPagina"),
        divErrorMonto: document.getElementById("errorMonto")
    },

    stock:{
        inputBajo: document.getElementById("stockBajo"),
        inputMedio: document.getElementById("stockMedio"),
        divErrorBajo: document.getElementById("errorBajo"),
        divErrorMedio: document.getElementById("errorMedio")
    }
};

const btnGuardar = document.getElementById("btnGuardar");

document.addEventListener("DOMContentLoaded", () => {

    renderizarCampos(campos);

    campos.stock.inputBajo.addEventListener(
        "input",
        () => actualizarLeyenda(campos)
    );

    campos.stock.inputMedio.addEventListener(
        "input",
        () => actualizarLeyenda(campos)
    );

    btnGuardar.addEventListener(
        "click",
        () => guardarCambios(campos)
    );
});