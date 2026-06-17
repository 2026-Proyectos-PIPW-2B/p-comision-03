import { obtenerLocalStorage } from './localStorage.js'
import{guardarLocalStorage}from './localStorage.js'
const ADMIN = {
  nombre: "Sistema",
  apellido: "Admin",
  email: "admin@sistema.com",
  password: "Admin1234",
  rol: "admin",
  alta: "01/01/2024",
  habilitado: true,
};
let pendienteUS=document.getElementById("pendienteUS")
let finalUS=document.getElementById("finalUS")

function ini(nombre, apellido) {
  return (nombre[0] + apellido[0]).toUpperCase();
}

function hoy() {
  return new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function inicializarAdmin() {
  const finales = obtenerLocalStorage("usuariosfinales");
  const yaExiste = finales.some(usuario => usuario.rol === "admin");
  if (!yaExiste) {
    finales.unshift(ADMIN);
    guardarLocalStorage(finales, "usuariosfinales");
  }
}

function renderPendientes() {
  const lista = obtenerLocalStorage("usuariospendientes");
  pendienteUS.innerHTML = "";

  if (!lista.length) {
    pendienteUS.innerHTML = `<tr><td colspan="4" class="text-muted text-center py-3">Sin usuarios pendientes.</td></tr>`;
    return;
  }
  for(let i=0;i<lista.length;i++){
    let tr =document.createElement("tr")
    let td_nombre= document.createElement("td")
    let div_nom=document.createElement("div")
    div_nom.classList.add("d-flex","align-items-center","gap-2")
    tr.innerHTML=`
    <td>
    <div class="d-flex align-items-center gap-2">
    <div class="av-circle estiloIcono">${ini(lista[i].nombre,lista[i].apellido)}
    </div>
    <strong>${lista[i].apellido},${lista[i].nombre}</strong>
    </div>
    <td class="text-muted">${lista[i].email}</td>
    <td>${lista[i].edad} años</td>
    <td>
    <button id="btn-aceptar" class="p-1 m-1 rounded-circle border-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
    </button>
    <button id="btn-eliminar" class="p-1 rounded-circle border-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    </button>
    </td>
    `;
    pendienteUS.appendChild(tr)
  }
}

function renderFinales() {
  let  lista = obtenerLocalStorage("usuariosfinales");
  finalUS.innerHTML = "";

  if (!lista.length) {
    finalUS.innerHTML = `<tr><td colspan="5" class="text-muted text-center py-3">Ningún usuario aprobado aún.</td></tr>`;
    return;
  }
  for(let i=0;i<lista.length;i++){
    let tr=document.createElement("tr")
    tr.innerHTML=`
    <td>
    <div class="d-flex align-items-center gap-2">
    <div class="av-circle estiloIcono">${ini(lista[i].nombre,lista[i].apellido)}
    </div>
    <strong>${lista[i].apellido},${lista[i].nombre}</strong>
    </div>
    </td>
    <td class="text-muted">${lista[i].email}</td>
    <td><span class="badge-rol cliente">${lista[i].rol}</span></td>
    <td class="text-muted">${lista[i].alta}</td>
    <td>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" ${lista.habilitado ? "checked" : ""} onchange="toggleHabilitado(${i}, this.checked)">
        </div>
      </td>
    `
    finalUS.appendChild(tr);
  }
}
