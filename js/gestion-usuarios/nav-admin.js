import { cerrarSesion, protegerPagina } from './sesion.js';
protegerPagina("admin");
 
const btnCerrarSesion = document.getElementById("btnCerrarSesionAdmin");
if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener("click", (e) => {
    e.preventDefault();
    cerrarSesion();
  });
}