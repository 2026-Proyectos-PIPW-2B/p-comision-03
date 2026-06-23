import {guardarLocalStorage } from "../core/localStorage.js";
import { inicializarSistema } from "../core/inicializacion.js";
import { renderPendientes, renderFinales } from "./renderizado-usuarios.js"
import { obtenerUsuariosFinales, aceptarUsuario,eliminarUsuario } from "./servicios-usuarios.js";

const pendienteUS=document.getElementById("pendienteUS")
const finalUS=document.getElementById("finalUS")
const buscadorFinal = document.getElementById("buscadorFinal");

window.onload= function(){
    renderPendientes()
    renderFinales()
}

buscadorFinal.addEventListener("input", function () {
    renderFinales(this.value);
});

export function ini(nombre, apellido) {
    return (nombre[0] + apellido[0]).toUpperCase();
}