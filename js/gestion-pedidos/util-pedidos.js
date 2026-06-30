import { obtenerPedidos } from "./servicios-pedidos.js";

export const ESTADOS = {
    CONFIRMADO: "confirmado",
    EN_PREPARACION: "en preparacion",
    ENVIADO: "enviado",
    CAMINO: "en camino"
};

export function formatPrecio(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
}

export function calcularResumenPedido(pedido) {
    return pedido.compras.reduce(
        (acc, c) => {
            acc.total += c.producto.precio * c.cantidad;
            acc.cantidad += c.cantidad;
            return acc;
        },
        { total: 0, cantidad: 0 }
    );
}

export function parseFecha(fechaStr) {
    const [dia, mes, anio] = fechaStr.split("/");
    return new Date(`${anio}-${mes}-${dia}`);
}

export function obtenerClaseEstado(estado) {
    switch (estado.trim().toLowerCase()) {
        case ESTADOS.CONFIRMADO:
            return "pedidoConfirmado";
        case ESTADOS.ENVIADO:
            return "pedidoEnviado";
        case ESTADOS.EN_PREPARACION:
            return "pedidoPreparacion";
        case ESTADOS.CAMINO:
            return "pedidoCamino";
    }
}

export function obtenerPedidosRecientes(){
    return obtenerPedidos().filter(pedido =>(pedido.estado==="confirmado"))
}