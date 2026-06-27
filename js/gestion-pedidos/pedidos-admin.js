import { renderizarTabla } from "./renderizado-pedidos.js"
import { inicializarFiltros } from "./filtros-pedidos.js"
import { obtenerPedidos } from "./servicios-pedidos.js"

const filtros_nombre = document.getElementById("filtros_nombre")
const filtro_fecha_desde = document.getElementById("filtro_fecha_desde")
const filtro_fecha_hasta = document.getElementById("filtro_fecha_hasta")
const filtros_monto = document.getElementById("filtros_monto")

window.onload= function(){
    renderizarTabla(obtenerPedidos())
    inicializarFiltros(filtros_nombre,filtro_fecha_desde,filtro_fecha_hasta,filtros_monto)
}