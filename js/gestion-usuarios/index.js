import { actualizarNav,verificarExpiracion } from './sesion.js';
import { mostrarDetacados } from '../gestion-productos/renderizado-productos.js'
import { actualizarBadgeCarrito } from '../carrito/nav-carrito.js' 
import { inicializarSistema, inicializarUser, visualizarMontoMinimo, resetearApp } from '../core/inicializacion.js';

export const contenedorDestacados = document.getElementById("prod-destacados")
const user=document.getElementById("sesion")
const btnResetApp = document.getElementById("btnResetApp")

document.addEventListener("DOMContentLoaded", function(){
    actualizarNav()
    mostrarDetacados(contenedorDestacados)
    actualizarBadgeCarrito()
    inicializarUser(user)
    inicializarSistema()
    verificarExpiracion();
    visualizarMontoMinimo();
    setInterval(verificarExpiracion, 30 * 1000);
     if (btnResetApp) {
        btnResetApp.addEventListener("click", () => {
                resetearApp()
                location.reload()
        })
    }
})

