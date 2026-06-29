import { configurarNotificación, inicializarUser,MenuLateralAdmin } from '../core/inicializacion.js';
import { cerrarSesion, protegerPagina } from './sesion.js';
protegerPagina("admin");
const contenedor=document.getElementById("sesion")
const notificacion=document.getElementById("campanita")
MenuLateralAdmin()
configurarNotificación(notificacion)
inicializarUser(contenedor)
const btnCerrarSesion = document.getElementById("btnCerrarSesionAdmin");
if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener("click", (e) => {
    e.preventDefault();
    cerrarSesion();
  });
}