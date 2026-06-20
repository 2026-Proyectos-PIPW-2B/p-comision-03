import {guardarLocalStorage } from "../core/localStorage.js";
import { renderPendientes, renderFinales } from "./renderizado-usuarios.js"
import { obtenerUsuariosFinales, aceptarUsuario,eliminarUsuario } from "./servicios-usuarios.js";

const ADMIN = {
  nombre: "Sistema",
  apellido: "Admin",
  email: "admin@sistema.com",
  password: "Admin1234",
  rol: "admin",
  alta: "01/01/2024",
  habilitado: true,
};

const pendienteUS=document.getElementById("pendienteUS")
const finalUS=document.getElementById("finalUS")
const buscadorFinal = document.getElementById("buscadorFinal");

window.onload= function(){
  inicializarAdmin()
  renderPendientes();
  renderFinales();
}


buscadorFinal.addEventListener("input", function () {
  renderFinales(this.value);
});

export function ini(nombre, apellido) {
  return (nombre[0] + apellido[0]).toUpperCase();
}


function inicializarAdmin() {
  const finales = obtenerUsuariosFinales();
  const yaExiste = finales.some(usuario => usuario.rol === "admin");
  if (!yaExiste) {
    finales.unshift(ADMIN);
    guardarLocalStorage(finales, "usuariosfinales");
  }
}