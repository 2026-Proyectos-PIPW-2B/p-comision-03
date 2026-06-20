import { actualizarNav } from './sesion.js';
import { mostrarDetacados } from '../gestion-productos/renderizado-productos.js'

export const contenedorDestacados = document.getElementById("prod-destacados")

window.onload= function(){
    actualizarNav()
    mostrarDetacados(contenedorDestacados)
}
 