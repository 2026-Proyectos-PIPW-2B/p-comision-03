import { inicializarUser } from '../core/inicializacion.js';
import { cerrarSesion, protegerPagina } from './sesion.js';
protegerPagina("admin");
const contenedor=document.getElementById("sesion")
 
inicializarUser(contenedor)
const btnCerrarSesion = document.getElementById("btnCerrarSesionAdmin");
if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener("click", (e) => {
    e.preventDefault();
    cerrarSesion();
  });
}