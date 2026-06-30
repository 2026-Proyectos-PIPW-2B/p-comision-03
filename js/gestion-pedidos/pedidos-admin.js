import { renderizarTabla } from "./renderizado-pedidos.js";
import { inicializarFiltros } from "./filtros-pedidos.js";
import { obtenerPedidos } from "./servicios-pedidos.js";
import { obtenerPedidosRecientes } from "./util-pedidos.js";
import { crearPaginador, renderPaginacion } from "../core/paginador.js";

const PEDIDOS_POR_PAGINA = 10;

const filtros_nombre = document.getElementById("filtros_nombre");
const filtro_fecha_desde = document.getElementById("filtro_fecha_desde");
const filtro_fecha_hasta = document.getElementById("filtro_fecha_hasta");
const filtros_monto = document.getElementById("filtros_monto");

let pedidos = [];
let pedidosFiltrados = [];
let paginador;

window.onload = () => {
    pedidos = obtenerPedidos();
    pedidosFiltrados = [...pedidos];

    crearPaginacion();
    render();

    inicializarFiltros(filtros_nombre,filtro_fecha_desde,filtro_fecha_hasta,filtros_monto,actualizarListado);

    procesarAcciones();
};

function actualizarListado(resultado) {
    pedidosFiltrados = resultado;
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
    renderizarTabla(
        paginador.obtenerPagina()
    );

    renderPaginacion({
        paginador,
        onPaginaChange: cambiarPagina
    });
}

function cambiarPagina(n) {
    paginador.cambiarPagina(n);
    render();
}

function procesarAcciones() {
    const params = new URLSearchParams(window.location.search);
    const accion = params.get("accion");

    if (!accion) return;
    switch (accion) {
        case "pedidos-confirmados":
            actualizarListado(obtenerPedidosRecientes());
            break;
    }
}