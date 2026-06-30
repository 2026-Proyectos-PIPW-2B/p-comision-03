import { configurarNotificación, inicializarUser,MenuLateralAdmin } from '../core/inicializacion.js';
import { cerrarSesion, protegerPagina,verificarExpiracion } from './sesion.js';

protegerPagina("admin");
verificarExpiracion();
setInterval(verificarExpiracion, 30 * 1000);
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