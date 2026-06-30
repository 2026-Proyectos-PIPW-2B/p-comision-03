import {renderizarMetricas,renderizarPedidosRecientes,renderizarStockBajo} from "./renderizado-dashboard.js";
import { obtenerProductosParaStockBajo } from "./servicios-dashboard.js";
import { crearPaginador, renderPaginacion } from "../core/paginador.js";

const pedidosHoy = document.getElementById("pedidos-hoy");
const ingresosMensual = document.getElementById("ingreso-mes");
const usuariosTotal = document.getElementById("usuarios-totales");
const productosStock = document.getElementById("productos-stock");
const tablaPedidos = document.getElementById("pedidos_recientes");
const listaStock = document.getElementById("stock_bajo");

const STOCK_POR_PAGINA = 4;

let paginador;

window.onload = function () {
    renderizarMetricas(pedidosHoy,ingresosMensual,usuariosTotal,productosStock);

    renderizarPedidosRecientes(tablaPedidos);
    const productos = obtenerProductosParaStockBajo();

    paginador = crearPaginador({
        data: productos,
        porPagina: STOCK_POR_PAGINA
    });
    render();
}

function render() {
    renderizarStockBajo(
        listaStock,
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