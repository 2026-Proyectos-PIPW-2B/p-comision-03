import { configurarNotificación, inicializarUser,MenuLateralAdmin, buscarGlobal, previsualizarBusquedaGlobal } from '../core/inicializacion.js';
import { cerrarSesion, protegerPagina,verificarExpiracion } from './sesion.js';

protegerPagina("admin");
verificarExpiracion();
setInterval(verificarExpiracion, 30 * 1000);
const contenedor=document.getElementById("sesion")
const notificacion=document.getElementById("campanita")
MenuLateralAdmin()
configurarNotificación(notificacion)
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

const btnCerrarSesion = document.getElementById("btnCerrarSesionAdmin");
if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener("click", (e) => {
    e.preventDefault();
    cerrarSesion();
  });
}