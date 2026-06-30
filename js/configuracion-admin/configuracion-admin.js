import { guardarConfigSesion, obtenerConfigSesion } from '../gestion-usuarios/sesion.js';
import { mostrarAlertaExito } from '../UI/Alertas.js';

document.addEventListener("DOMContentLoaded", () => {
  const config = obtenerConfigSesion();
  document.getElementById("tiempoSesion").value = config.minutos;
  document.getElementById("cierreAuto").checked  = config.cierreAuto;

  document.getElementById("btnGuardar").addEventListener("click", guardarCambios);
});

function guardarCambios() {
  let inputTiempoSesion=document.getElementById("tiempoSesion");
  const minutos    = Number(inputTiempoSesion.value);
  const cierreAuto = document.getElementById("cierreAuto").checked;
  const errorTiempo = document.getElementById("errorTiempo");
  if (!minutos || minutos < 1) {
    inputTiempoSesion.classList.add("is-invalid")
    errorTiempo.textContent="El tiempo tiene que ser mayor a 0"
    return;
  }
  inputTiempoSesion.classList.remove("is-invalid");  
  errorTiempo.textContent=""
  guardarConfigSesion(minutos, cierreAuto);
  mostrarAlertaExito("¡Cambios guardados!", "La configuración se actualizó correctamente.", "configuracion-admin.html");
}