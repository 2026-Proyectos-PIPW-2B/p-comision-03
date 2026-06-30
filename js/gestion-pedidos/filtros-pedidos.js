import { obtenerPedidos } from "./servicios-pedidos.js";

let filtros_nombre;
let filtro_fecha_desde;
let filtro_fecha_hasta;
let filtros_monto;
let onFiltrar;

const filtros = {
    nombre: "",
    monto: "",
    desde: "",
    hasta: ""
};

export function inicializarFiltros(
    nombre,
    desde,
    hasta,
    monto,
    callback
) {
    filtros_nombre = nombre;
    filtro_fecha_desde = desde;
    filtro_fecha_hasta = hasta;
    filtros_monto = monto;
    onFiltrar = callback;

    filtros_nombre.addEventListener("input", aplicarFiltros);
    filtro_fecha_desde.addEventListener("change", aplicarFiltros);
    filtro_fecha_hasta.addEventListener("change", aplicarFiltros);
    filtros_monto.addEventListener("input", aplicarFiltros);
}

function aplicarFiltros() {
    leerFiltros();

    let pedidos = obtenerPedidos();
    pedidos = filtrarPedidos(pedidos);

    onFiltrar(pedidos);
}

function leerFiltros() {
    filtros.nombre = filtros_nombre.value.toLowerCase();
    filtros.desde = filtro_fecha_desde.value;
    filtros.hasta = filtro_fecha_hasta.value;
    filtros.monto = Number(filtros_monto.value);
}

function filtrarPedidos(pedidos) {
    return pedidos.filter(cumpleFiltros);
}

function cumpleFiltros(pedido) {

    const fechaPedido = convertirFecha(pedido.fecha);

    if (filtros.monto && pedido.monto <= filtros.monto)
        return false;

    if (
        filtros.nombre &&
        !pedido.usuario.nombre.toLowerCase().includes(filtros.nombre) &&
        !pedido.codigo.includes(filtros.nombre)
    )
        return false;

    if (filtros.desde) {
        const desde = new Date(filtros.desde);
        if (fechaPedido < desde)
            return false;
    }

    if (filtros.hasta) {
        const hasta = new Date(filtros.hasta);
        if (fechaPedido > hasta)
            return false;
    }

    return true;
}

function convertirFecha(fecha) {
    const [dia, mes, anio] = fecha.split("/");

    return new Date(anio, mes - 1, dia);
}