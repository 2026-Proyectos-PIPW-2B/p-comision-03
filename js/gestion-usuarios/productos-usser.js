import { mostrarPublicados } from "../gestion-productos/renderizado-productos.js"
import { actualizarNav } from "./sesion.js"

const contenedorPublicados=document.getElementById("prod-publicados")
window.onload= function(){
    actualizarNav()
    mostrarPublicados(contenedorPublicados)
}
 
