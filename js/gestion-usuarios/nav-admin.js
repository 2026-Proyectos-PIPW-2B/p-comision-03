import { inicializarUser,MenuLateralAdmin } from '../core/inicializacion.js';
import { configurarNotificación } from '../core/notificaciones.js';
import { cerrarSesion, protegerPagina,verificarExpiracion } from './sesion.js';


const contenedor=document.getElementById("sesion")
const btnCerrarSesion = document.getElementById("btnCerrarSesionAdmin");
const notificacion=document.getElementById("campanita")
const cant_not=document.getElementById("cant-not")

protegerPagina("admin");
verificarExpiracion();
setInterval(verificarExpiracion, 30 * 1000);
MenuLateralAdmin()
configurarNotificación(notificacion,cant_not)
inicializarUser(contenedor)


if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();
        cerrarSesion();
    });
}