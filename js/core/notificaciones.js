import { reenderizarNotificaciones } from "./render-notificaciones-admin.js";
import { obtenerProductosBajoStock,obtenerProductosSinStock } from "../gestion-productos/util-productos.js";
import { obtenerUsuariosPendientes } from "../gestion-usuarios/servicios-usuarios.js";
import { obtenerPedidosRecientes } from "../gestion-pedidos/util-pedidos.js";

export function configurarNotificación(dropdown,span){
    const noticaciones=obtenerNotificaciones()
    span.textContent=noticaciones.length
    reenderizarNotificaciones(dropdown,noticaciones)
}

function obtenerNotificaciones() {
    const notificaciones = [];

    // Productos con stock bajo
    const bajoStock = obtenerProductosBajoStock();
    if (bajoStock.length > 0) {
        notificaciones.push({
            ref: "./productos-admin.html?accion=stock-bajo",
            titulo: "Productos con stock bajo",
            subtitulo: `${bajoStock.length} productos requieren reposición`
        })
    }

    // Productos sin stock
    const sinStock = obtenerProductosSinStock();
    if (sinStock.length > 0) {
        notificaciones.push({
            ref: "./productos-admin.html?accion=sin-stock",
            titulo: "Productos sin stock",
            subtitulo: `${sinStock.length} productos agotados`
        });
    }

    // Usuarios pendientes de alta
    const pendientes = obtenerUsuariosPendientes();
    if (pendientes.length > 0) {
        notificaciones.push({
            ref: "./usuarios-admin.html",
            titulo: "Usuarios pendientes",
            subtitulo: `${pendientes.length} usuario(s) esperan aprobación`
        });
    }

    const pedidosRecientes= obtenerPedidosRecientes()
        if(pedidosRecientes.length>0){
            notificaciones.push({
                ref:"./pedidos-admin.html?accion=pedidos-confirmados",
                titulo: "Pedidos recibidos",
                subtitulo: `${pedidosRecientes.length} pedidos confirmados por el usuario`
            })
        }

    return notificaciones;
}

