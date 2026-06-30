import { inicializarUser,MenuLateralAdmin, buscarGlobal, previsualizarBusquedaGlobal } from '../core/inicializacion.js';
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

const formBuscador = document.getElementById("formBuscadorGlobal");
const inputBuscador = document.getElementById("buscadorGlobal");
const dropdownBuscador = document.getElementById("dropdownBuscadorGlobal");

if (formBuscador && inputBuscador) {
  inputBuscador.addEventListener("input", () => {
    previsualizarBusquedaGlobal(inputBuscador.value, dropdownBuscador);
  });

  formBuscador.addEventListener("submit", (e) => {
    e.preventDefault();
    buscarGlobal(inputBuscador.value);
  });

  document.addEventListener("click", (e) => {
    if (dropdownBuscador && !formBuscador.contains(e.target)) {
      dropdownBuscador.style.display = "none";
    }
  });
}

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();
        cerrarSesion();
    });
}