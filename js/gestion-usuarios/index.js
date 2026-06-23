import { actualizarNav } from './sesion.js';
import { mostrarDetacados } from '../gestion-productos/renderizado-productos.js'
import { actualizarBadgeCarrito } from '../carrito/nav-carrito.js' 

export const contenedorDestacados = document.getElementById("prod-destacados")

    actualizarNav()
    mostrarDetacados(contenedorDestacados)
    actualizarBadgeCarrito()