import { renderizarMetricas,renderizarPedidosRecientes,renderizarStockBajo } from "./renderizado-dashboard.js"; 

const pedidosHoy = document.getElementById("pedidos-hoy");
const ingresosMensual = document.getElementById("ingreso-mes");
const usuariosTotal = document.getElementById("usuarios-totales");
const productosStock = document.getElementById("productos-stock");
const tablaPedidos = document.getElementById("pedidos_recientes");
const listaStock = document.getElementById("stock_bajo"); // id nuevo

window.onload = function () {
    renderizarMetricas(pedidosHoy,ingresosMensual,usuariosTotal,productosStock)
    renderizarPedidosRecientes(tablaPedidos)
    renderizarStockBajo(listaStock)
}



