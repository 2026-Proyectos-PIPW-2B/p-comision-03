import { renderizarTabla } from "./renderizado-pedidos.js"
import { inicializarFiltros } from "./filtros-pedidos.js"
import { obtenerPedidos } from "./servicios-pedidos.js"
import { obtenerPedidosRecientes } from "./util-pedidos.js"

const filtros_nombre = document.getElementById("filtros_nombre")
const filtro_fecha_desde = document.getElementById("filtro_fecha_desde")
const filtro_fecha_hasta = document.getElementById("filtro_fecha_hasta")
const filtros_monto = document.getElementById("filtros_monto")

window.onload= function(){
    renderizarTabla(obtenerPedidos())
    inicializarFiltros(filtros_nombre,filtro_fecha_desde,filtro_fecha_hasta,filtros_monto)
    procesarAcciones()
}

function procesarAcciones() {
    const params = new URLSearchParams(window.location.search);
    const accion = params.get("accion");

    if (!accion) return;

    switch (accion) {
        case "pedidos-confirmados":
            renderizarTabla(obtenerPedidosRecientes());
            break;
    }
}