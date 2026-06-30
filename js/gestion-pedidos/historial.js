import { actualizarNav, protegerPagina, obtenerUsuarioActual } from "../gestion-usuarios/sesion.js";
import { obtenerPedidos } from "./servicios-pedidos.js";
import { actualizarBadgeCarrito } from "../carrito/nav-carrito.js";
import { renderPedidos } from "./renderizado-historial-usuario.js";
import { parseFecha } from "./util-pedidos.js";
import { crearPaginador, renderPaginacion } from "../core/Paginador.js";

const PEDIDOS_POR_PAGINA = 4;

let pedidos = [];
let pedidosFiltrados = [];
let paginador;

document.addEventListener("DOMContentLoaded", () => {
    protegerPagina();
    actualizarNav();
    actualizarBadgeCarrito();

    cargarHistorial();

    document
        .getElementById("btnFiltrar")
        .addEventListener("click", aplicarFiltros);

    document
        .getElementById("btnLimpiar")
        .addEventListener("click", limpiarFiltros);
});

function cargarHistorial() {
    const usuario = obtenerUsuarioActual();

    pedidos = obtenerPedidos().filter(
        p => p.usuario.email === usuario.email
    );

    pedidosFiltrados = [...pedidos];

    crearPaginacion();

    render();
}

function crearPaginacion() {
    paginador = crearPaginador({
        data: pedidosFiltrados,
        porPagina: PEDIDOS_POR_PAGINA
    });
}

function render() {

    renderPedidos(
        paginador.obtenerPagina()
    );

    renderPaginacion({
        paginador,
        onPaginaChange: cambiarPagina
    });

    actualizarSubtitulo();
}

function cambiarPagina(n) {
    paginador.cambiarPagina(n);
    render();
}

function aplicarFiltros() {

    const desde = document.getElementById("filtroDesde").value;
    const hasta = document.getElementById("filtroHasta").value;

    const montoMin =
        Number(document.getElementById("filtroMontoMin").value) || 0;

    const montoMax =
        Number(document.getElementById("filtroMontoMax").value) || Infinity;

    pedidosFiltrados = pedidos.filter(p => {

        const fecha = parseFecha(p.fecha);

        if (desde && fecha < new Date(desde + "T00:00:00")) return false;

        if (hasta && fecha > new Date(hasta + "T23:59:59")) return false;

        if (p.monto < montoMin) return false;

        if (p.monto > montoMax) return false;

        return true;
    });

    crearPaginacion();

    render();
}

function limpiarFiltros() {

    document.getElementById("filtroDesde").value = "";
    document.getElementById("filtroHasta").value = "";
    document.getElementById("filtroMontoMin").value = "";
    document.getElementById("filtroMontoMax").value = "";

    pedidosFiltrados = [...pedidos];

    crearPaginacion();

    render();
}

function actualizarSubtitulo() {

    const subtitulo = document.getElementById("subtitulo");
    const total = pedidosFiltrados.length;

    if (total === 0) {
        subtitulo.textContent = "No se encontraron compras.";
    } else if (total === 1) {
        subtitulo.textContent = "1 compra en total";
    } else {
        subtitulo.textContent = `${total} compras en total`;
    }
}