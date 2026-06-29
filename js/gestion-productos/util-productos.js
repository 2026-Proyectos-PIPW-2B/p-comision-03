import { obtenerProductos } from "./servicios-productos.js"

export function obtenerProductosSinStock() {
    return obtenerProductos()
        .filter(producto => (producto.stock === 0) )
}

export function obtenerProductosBajoStock() {
    return obtenerProductos()
        .filter(producto => ((producto.stock <= producto.stockMinimo) && producto.stock>0) )
}