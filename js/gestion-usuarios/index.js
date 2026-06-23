import { actualizarNav } from './sesion.js';
import { mostrarDetacados } from '../gestion-productos/renderizado-productos.js'
import { actualizarBadgeCarrito } from '../carrito/nav-carrito.js' 
import { inicializarSistema } from '../core/inicializacion.js';

export const contenedorDestacados = document.getElementById("prod-destacados")

window.onload=function(){
    inicializarSistema()
    actualizarNav()
    mostrarDetacados(contenedorDestacados)
    actualizarBadgeCarrito()
}
    