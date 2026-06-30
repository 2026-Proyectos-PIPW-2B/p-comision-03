import { inicializarUser,MenuLateralAdmin } from '../core/inicializacion.js';
import { cerrarSesion, protegerPagina } from './sesion.js';
import { configurarNotificación } from '../core/notificaciones.js';

const contenedor=document.getElementById("sesion")
const btnCerrarSesion = document.getElementById("btnCerrarSesionAdmin");
const notificacion=document.getElementById("campanita")
const cant_not=document.getElementById("cant-not")

protegerPagina("admin");
MenuLateralAdmin()
configurarNotificación(notificacion,cant_not)
inicializarUser(contenedor)


if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();
        cerrarSesion();
    });
}