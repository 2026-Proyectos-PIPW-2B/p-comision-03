import { actualizarNav,verificarExpiracion } from './sesion.js';
import { mostrarDetacados } from '../gestion-productos/renderizado-productos.js'
import { actualizarBadgeCarrito } from '../carrito/nav-carrito.js' 
import { inicializarSistema, inicializarUser } from '../core/inicializacion.js';

export const contenedorDestacados = document.getElementById("prod-destacados")
const user=document.getElementById("sesion")

document.addEventListener("DOMContentLoaded", function(){
    actualizarNav()
    mostrarDetacados(contenedorDestacados)
    actualizarBadgeCarrito()
    inicializarUser(user)
    inicializarSistema()
    verificarExpiracion();
    setInterval(verificarExpiracion, 30 * 1000);
})