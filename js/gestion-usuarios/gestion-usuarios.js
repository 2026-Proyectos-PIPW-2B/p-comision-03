import { crearPaginador, renderPaginacion } from "../core/paginador.js";
import { obtenerUsuariosPendientes,obtenerUsuariosFinales } from "./servicios-usuarios.js";
import { renderPendientes,renderFinales } from "./renderizado-usuarios.js";

const buscadorFinal = document.getElementById("buscadorFinal");


window.onload= function(){
    renderPendientes()
    const q = localStorage.getItem("busquedaGlobal") || "";
    localStorage.removeItem("busquedaGlobal");
    if (q && buscadorFinal) buscadorFinal.value = q;
    renderFinales(q)
}
const USUARIOS_POR_PAGINA = 8;

let pendientes = [];
let finales = [];

let pagPendientes;
let pagFinales;

window.onload = () => {
    cargarPendientes();
    cargarFinales();

};

function cargarPendientes() {
    pendientes = obtenerUsuariosPendientes();

    pagPendientes = crearPaginador({
        data: pendientes,
        porPagina: USUARIOS_POR_PAGINA
    });

    renderPendientesPagina();
}

function cargarFinales(texto = "") {
    finales = obtenerUsuariosFinales(texto);

    pagFinales = crearPaginador({
        data: finales,
        porPagina: USUARIOS_POR_PAGINA
    });

    renderFinalesPagina();
}

function renderPendientesPagina() {
    renderPendientes(
        pagPendientes.obtenerPagina()
    );

    renderPaginacion({
        contenedor: document.getElementById("paginacionPendientes"),
        paginador: pagPendientes,
        onPaginaChange: cambiarPendientes
    });

}

function renderFinalesPagina() {
    renderFinales(
        pagFinales.obtenerPagina()
    );

    renderPaginacion({
        contenedor: document.getElementById("paginacionFinales"),
        paginador: pagFinales,
        onPaginaChange: cambiarFinales
    });

}

function cambiarPendientes(n) {
    pagPendientes.cambiarPagina(n);
    renderPendientesPagina();
}

function cambiarFinales(n) {
    pagFinales.cambiarPagina(n);
    renderFinalesPagina();
}

buscadorFinal.addEventListener("input", e => {
    cargarFinales(e.target.value);
});