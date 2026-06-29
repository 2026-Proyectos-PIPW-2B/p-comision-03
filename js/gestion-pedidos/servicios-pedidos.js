import { obtenerLocalStorage,guardarLocalStorage } from "../core/localStorage.js";
import { renderizarTabla } from "./renderizado-pedidos.js";

export function obtenerPedidos(){
    return obtenerLocalStorage("pedidos")
}

function calcularMontoEItems(compras) {
    let monto_compra = 0;
    let cant_productos = 0;

    compras.forEach(item => {
        monto_compra += item.producto.precio * item.cantidad;
        cant_productos += item.cantidad;
    });

    return {
        monto_compra,
        cant_productos
    };
}

export function agregarPedido(carrito) {
    const pedidos = obtenerPedidos();

    const { monto_compra, cant_productos } = calcularMontoEItems(carrito.compras);

    const codigo = String(pedidos.length + 1).padStart(6, "0");

    const nuevo_pedido = {
        codigo,
        usuario: carrito.usuario,
        fecha: new Date().toLocaleDateString("es-AR"),
        monto: monto_compra,
        items: cant_productos,
        estado: "confirmado",
        compras:carrito.compras
    };

    pedidos.push(nuevo_pedido);
    guardarLocalStorage(pedidos,"pedidos");
}

export function cambiarEstadoPedido(codigo, nuevoEstado){
    const pedidos = obtenerPedidos();

    const pedido = pedidos.find(
        pedido => pedido.codigo === codigo
    );

    if(!pedido) return false;

    pedido.estado = nuevoEstado;

    guardarLocalStorage(pedidos,"pedidos");

    return true;
}