import { obtenerPedidos } from '../gestion-pedidos/servicios-pedidos.js'
import { obtenerUsuariosFinales } from '../gestion-usuarios/servicios-usuarios.js';
import { obtenerProductos } from '../gestion-productos/servicios-productos.js'
import { obtenerProductosSinStock,obtenerProductosBajoStock } from '../gestion-productos/util-productos.js';

function calcularPedidosHoy() {
    const pedidos = obtenerPedidos()

    const hoy = new Date();
    const fechaHoy = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`

    return pedidos.filter(pedido => pedido.fecha === fechaHoy).length
}
 
function calcularIngresosMes() {
    const pedidos = obtenerPedidos()
    const hoy = new Date()

    return pedidos
        .filter(pedido => {
            const [dia, mes, anio] = pedido.fecha.split("/").map(Number)

            return mes === hoy.getMonth() + 1 &&
                   anio === hoy.getFullYear()
        })
        .reduce((total, pedido) => total + pedido.monto, 0)
}

function calcularUsuariosTotales() {
    const usuarios = obtenerUsuariosFinales()
    return usuarios.length -1
}

function calcularProductosEnStock() {
    const productos = obtenerProductos()
    return productos.filter(producto => producto.stock > 0).length
}

export function obtenerMetricas() {
    return {
        pedidosHoy: calcularPedidosHoy(),
        ingresosMes: calcularIngresosMes(),
        usuarios: calcularUsuariosTotales(),
        productos: calcularProductosEnStock()
    };
}

export function obtenerPedidosRecientes() {
    return obtenerPedidos()
        .sort((a, b) => Number(b.codigo) - Number(a.codigo))
        .slice(0, 4);
}

export function obtenerProductosParaStockBajo() {
    const bajoStock=obtenerProductosBajoStock()
    const sinStock= obtenerProductosSinStock()
    return (bajoStock.concat(sinStock)).sort((a, b) => a.stock - b.stock);
}

