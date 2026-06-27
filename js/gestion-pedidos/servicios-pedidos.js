import { obtenerLocalStorage,guardarLocalStorage } from "../core/localStorage.js";

let cant_pedidos="000000"
let cant_productos=""
let monto_compra=""

export function obtenerPedidos(){
    return obtenerLocalStorage("pedidos")
}

function establecerMontoEItems(compras) {
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

    const { monto_compra, cant_productos } = establecerMontoEItems(carrito.compras);

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