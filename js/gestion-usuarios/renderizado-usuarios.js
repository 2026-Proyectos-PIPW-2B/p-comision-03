import { obtenerUsuariosPendientes, obtenerUsuariosFinales,toggleHabilitado,eliminarUsuarioFinal,aceptarUsuario,eliminarUsuario } from "./servicios-usuarios.js";
import { guardarLocalStorage } from "../core/localStorage.js";
import { ini } from "./gestion-usuarios.js";

/*--------------------------creación celdas------------------------------*/

function crearNombre(nombre,apellido){
    const td_Nombre=document.createElement("td")

    const div_nom=document.createElement("div")
    div_nom.classList.add("d-flex","align-items-center","gap-2")

    const div_icono= document.createElement("div")
    div_icono.classList.add("av-circle","estiloIcono")
    div_icono.textContent=`${ini(nombre,apellido)}`

    const nombreCompleto=document.createElement("strong")
    nombreCompleto.textContent=`${apellido},${nombre}`

    div_nom.append(div_icono,nombreCompleto)
    td_Nombre.appendChild(div_nom)

    return td_Nombre
}

function crearEmail(email){
    const tdEmail=document.createElement("td")
    tdEmail.classList.add("text-muted")
    tdEmail.textContent=`${email}`

    return tdEmail
}

function crearBotones(i){
    const tdAcciones=document.createElement("td")
    const btnAceptar=crearBotonAccion("aceptar",i,`<path d="M20 6 9 17l-5-5"/>`,"cliente","pendiente")
    const btnEliminar=crearBotonAccion("eliminar",i,`<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,"cliente","pendiente")
    tdAcciones.append(btnAceptar,btnEliminar)

    return tdAcciones
}

function crearCelda(col){
    const td=document.createElement("td")
    td.textContent= `${col}`
    return td
}

function crearBotonHabilitacion(habilitado,rol,index){
    const td_habilitacion=document.createElement("td")

    const div_habilitacion=document.createElement("div")
    div_habilitacion.classList.add("form-check","form-switch")

    const input_habilitacion=document.createElement("input")
    input_habilitacion.classList.add("form-check-input")
    input_habilitacion.type="checkbox"
    input_habilitacion.checked=habilitado
    input_habilitacion.disabled = rol === "admin";
    input_habilitacion.addEventListener("change", function () {
       toggleHabilitado(index, this.checked);
    });

    div_habilitacion.appendChild(input_habilitacion)
    td_habilitacion.appendChild(div_habilitacion)

    return td_habilitacion
}

function crearBotonAccion(tipo, index, pathSvg, rol, estado) {
  const btn = document.createElement("button");
  btn.classList.add("p-1", "m-1", "rounded-circle", "border-0", `btn-${tipo}`);
  btn.disabled = rol === "admin"; // el admin no se puede eliminar
  btn.dataset.index = index; 
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      ${pathSvg}
    </svg>
  `
  if(tipo==="aceptar" && estado==="pendiente")
      btn.addEventListener("click", function(){
          aceptarUsuario(index);
          renderPendientes();
          renderFinales();
      })
  else 
    if(tipo==="eliminar" && estado==="pendiente")
        btn.addEventListener("click", function(){
            eliminarUsuario(index);
            renderPendientes();})
  return btn;
}

function crearEliminarUP(i){
    const tdEliminar = document.createElement("td");
    const btnEliminar=crearBotonAccion("eliminar",i,`<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`, rol,"pendiente")

    btnEliminar.addEventListener("click", function () {
      eliminarUsuarioFinal(Number(this.dataset.index));
      renderFinales()
    });

    tdEliminar.appendChild(btnEliminar);

    return tdEliminar
}

function crearEliminarUF(i,rol){
    const tdEliminar = document.createElement("td");
    const btnEliminar=crearBotonAccion("eliminar",i,`<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`, rol, "final")

    btnEliminar.addEventListener("click", function () {
      eliminarUsuarioFinal(Number(this.dataset.index));
      renderFinales()
    });

    tdEliminar.appendChild(btnEliminar);

    return tdEliminar
}

function celdaVacia(mensaje,col){
    const tr=document.createElement("tr")
    const td=document.createElement("td")
    td.colSpan=col;
    td.classList.add("text-muted","text-center","py-3")
    td.textContent=mensaje
    tr.appendChild(td);

    return tr
}

/*--------------------------exports------------------------------*/
export function renderFinales(filtro = "") {
  let  lista = obtenerUsuariosFinales();
  finalUS.innerHTML = "";

if (filtro.trim()) {
    let texto = filtro.trim().toLowerCase();
    lista = lista.filter(u =>
      u.nombre.toLowerCase().includes(texto) ||
      u.apellido.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto)
    );
  }
  if (!lista.length) {
    const tr=celdaVacia("Ningún usuario aprobado aún.", 5)
    finalUS.appendChild(tr);
    return
  }

  for(let i=0;i<lista.length;i++){
    const tr=document.createElement("tr")
    const tdNombre = crearNombre(lista[i].nombre, lista[i].apellido)
    const tdEmail = crearEmail(lista[i].email)
    const tdRol = crearCelda(lista[i].rol)
    const tdAlta = crearCelda(lista[i].alta)
    const tdhabilitacion = crearBotonHabilitacion(lista[i].habilitado, lista[i].rol,i)
    const tdEliminar = crearEliminarUF(i, lista[i].rol)
  
    tr.append(tdNombre,tdEmail,tdRol,tdAlta,tdhabilitacion,tdEliminar)
    finalUS.appendChild(tr)
  }
}

export function renderPendientes() {
  const lista = obtenerUsuariosPendientes();
  pendienteUS.innerHTML = "";

  if (!lista.length) {
    const tr=celdaVacia("Sin usuarios pendientes.",4)
    pendienteUS.appendChild(tr);
    return
  }
  for(let i=0;i<lista.length;i++){
    const tr=document.createElement("tr")
    const tdNombre=crearNombre(lista[i].nombre,lista[i].apellido)
    const tdEmail=crearEmail(lista[i].email)
    const tdEdad=crearCelda(lista[i].edad)
    const tdAcciones= crearBotones(i)

    tr.append(tdNombre,tdEmail,tdEdad,tdAcciones)
    pendienteUS.appendChild(tr)
  }
}