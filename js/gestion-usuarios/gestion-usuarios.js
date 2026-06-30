import { guardarLocalStorage } from "../core/localStorage.js";
import { inicializarSistema } from "../core/inicializacion.js";
import { renderPendientes, renderFinales } from "./renderizado-usuarios.js"
import { obtenerUsuariosFinales, aceptarUsuario,eliminarUsuario } from "./servicios-usuarios.js";

const pendienteUS=document.getElementById("pendienteUS")
const finalUS=document.getElementById("finalUS")
const buscadorFinal = document.getElementById("buscadorFinal");

window.onload= function(){
    renderPendientes()
    const q = localStorage.getItem("busquedaGlobal") || "";
    localStorage.removeItem("busquedaGlobal");
    if (q && buscadorFinal) buscadorFinal.value = q;
    renderFinales(q)
}

buscadorFinal.addEventListener("input", function () {
    renderFinales(this.value);
});

