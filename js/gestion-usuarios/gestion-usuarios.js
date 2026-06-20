import { obtenerLocalStorage } from "../core/localStorage.js";
import { guardarLocalStorage } from "../core/localStorage.js";
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
let buscadorFinal = document.getElementById("buscadorFinal");


buscadorFinal.addEventListener("input", function () {
  renderFinales(this.value);
});

function ini(nombre, apellido) {
  return (nombre[0] + apellido[0]).toUpperCase();
}

function hoy() {
  return new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function inicializarAdmin() {
  const finales = obtenerLocalStorage("usuariosfinales")||[];
  const yaExiste = finales.some(usuario => usuario.rol === "admin");
  if (!yaExiste) {
    finales.unshift(ADMIN);
    guardarLocalStorage(finales, "usuariosfinales");
  }
}
inicializarAdmin()
renderPendientes();
renderFinales();

function renderPendientes() {
  const lista = obtenerLocalStorage("usuariospendientes")||[];
  pendienteUS.innerHTML = "";

  if (!lista.length) {
    let tr=document.createElement("tr")
    let td=document.createElement("td")
    td.colSpan=4;
    td.classList.add("text-muted","text-center","py-3")
    td.textContent="Sin usuarios pendientes."
    tr.appendChild(td);
    pendienteUS.appendChild(tr);
    return
  }
  for(let i=0;i<lista.length;i++){
    //--Fila 1 =icono+nombre
    let tr =document.createElement("tr")
    let td_Nombre=document.createElement("td")
    let div_nom=document.createElement("div")
    div_nom.classList.add("d-flex","align-items-center","gap-2")
    let div_icono= document.createElement("div")
    div_icono.classList.add("av-circle","estiloIcono")
    div_icono.textContent=`${ini(lista[i].nombre,lista[i].apellido)}`
    let nombreCompleto=document.createElement("strong")
    nombreCompleto.textContent=`${lista[i].apellido},${lista[i].nombre}`
    div_nom.append(div_icono,nombreCompleto)
    td_Nombre.appendChild(div_nom)

    //--Fila 2= email
    let tdEmail=document.createElement("td")
    tdEmail.classList.add("text-muted")
    tdEmail.textContent=`${lista[i].email}`

    //--Fila 3= edad
    let tdEdad=document.createElement("td")
    tdEdad.textContent=`${lista[i].edad} años`

    //--Fila 4= botones 
    let tdAcciones=document.createElement("td")
    let btnAceptar=crearBotonAccion("aceptar",i,`<path d="M20 6 9 17l-5-5"/>`)
    let btnEliminar=crearBotonAccion("eliminar",i,`<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`)
    tdAcciones.append(btnAceptar,btnEliminar)
    tr.append(td_Nombre,tdEmail,tdEdad,tdAcciones)
    pendienteUS.appendChild(tr)
  }
}

function crearBotonAccion(tipo, index, pathSvg) {
  const btn = document.createElement("button");
  btn.classList.add("p-1", "m-1", "rounded-circle", "border-0", `btn-${tipo}`);
  btn.dataset.index = index; 
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      ${pathSvg}
    </svg>
 `
  return btn;
}

pendienteUS.addEventListener("click",(e)=>{
    //busca boton mas cercano
    let btn=e.target.closest("button")
    //si hizo click en otro lado de la fila que no es un boton, sale
    if(!btn){
        return
    }
    let indice=Number(btn.dataset.index)
    if(btn.classList.contains("btn-aceptar")){
        aceptarUsuario(indice);
    }else{
        if(btn.classList.contains("btn-eliminar")){
            eliminarUsuario(indice);
        }
    }
})

function aceptarUsuario(indice){
    let pendientes = obtenerLocalStorage("usuariospendientes") || [];
    let finales = obtenerLocalStorage("usuariosfinales") || [];

    let usuario = pendientes.splice(indice, 1)[0];
    if (!usuario) {
        return;
    }
    usuario.alta = hoy();
    usuario.estado = "aprobado";
    usuario.habilitado = true;
    usuario.rol = "cliente";
    if (!finales.some(u => u.email === usuario.email)) {
    finales.push(usuario);
    }
    guardarLocalStorage(pendientes, "usuariospendientes");
    guardarLocalStorage(finales, "usuariosfinales");

    renderPendientes();
    renderFinales();
}
function eliminarUsuario(indice) {
    let pendientes = obtenerLocalStorage("usuariospendientes") || [];

    if (!pendientes[indice]) {
        return;
    }

    pendientes.splice(indice, 1);

    guardarLocalStorage(pendientes, "usuariospendientes");

    renderPendientes();
}

function renderFinales(filtro = "") {
  let  lista = obtenerLocalStorage("usuariosfinales")||[];
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
     let tr=document.createElement("tr")
    let td=document.createElement("td")
    td.colSpan=5;
    td.classList.add("text-muted","text-center","py-3")
    td.textContent="Ningún usuario aprobado aún."
    tr.appendChild(td);
    finalUS.appendChild(tr);
    return
  }
  for(let i=0;i<lista.length;i++){
     //--Fila 1 =icono+nombre//
    let tr=document.createElement("tr")
    let td_Nombre=document.createElement("td")
    let div_nom=document.createElement("div")
    div_nom.classList.add("d-flex","align-items-center","gap-2")
    let div_icono=document.createElement("div")
    div_icono.classList.add("av-circle","estiloIcono")
    div_icono.textContent=`${ini(lista[i].nombre,lista[i].apellido)}`
    let nombreCompleto=document.createElement("strong")
    nombreCompleto.textContent=`${lista[i].apellido},${lista[i].nombre}`
    div_nom.append(div_icono,nombreCompleto)
    td_Nombre.appendChild(div_nom)

     //--Fila 2= email
    let tdEmail=document.createElement("td")
    tdEmail.classList.add("text-muted")
    tdEmail.textContent=`${lista[i].email}`

    //--Fila 3= rol
    let tdRol=document.createElement("td")
    tdRol.textContent= `${lista[i].rol}`

     //--Fila 4= alta
    let tdAlta=document.createElement("td")
    tdAlta.textContent=`${lista[i].alta}`
    //Fila 5=Habilitacion
    let td_habilitacion=document.createElement("td")
    let div_habilitacion=document.createElement("div")
    div_habilitacion.classList.add("form-check","form-switch")
    let input_habilitacion=document.createElement("input")
    input_habilitacion.classList.add("form-check-input")
    input_habilitacion.type="checkbox"
    input_habilitacion.checked=lista[i].habilitado
    input_habilitacion.disabled = lista[i].rol === "admin";
    input_habilitacion.addEventListener("change",function(){
        toggleHabilitado(i,this.checked)
    })
    div_habilitacion.appendChild(input_habilitacion)
    td_habilitacion.appendChild(div_habilitacion)

    // -- Fila 6 = botón eliminar
  let tdEliminar = document.createElement("td");
  let btnEliminar = document.createElement("button");
  btnEliminar.classList.add("p-1", "rounded-circle", "border-0");
  btnEliminar.disabled = lista[i].rol === "admin"; // el admin no se puede eliminar
  btnEliminar.dataset.index = i;
  btnEliminar.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
    <path d="M3 6h18"/>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>`;
  btnEliminar.addEventListener("click", function () {
  eliminarUsuarioFinal(Number(this.dataset.index));
  });
  tdEliminar.appendChild(btnEliminar);


    tr.append(td_Nombre,tdEmail,tdRol,tdAlta,td_habilitacion,tdEliminar)
    finalUS.appendChild(tr)
  }

function eliminarUsuarioFinal(indice) {
  let usuarios = obtenerLocalStorage("usuariosfinales") || [];

  if (!usuarios[indice] || usuarios[indice].rol === "admin") {
    return; // nunca eliminar el admin
  }

  usuarios.splice(indice, 1);
  guardarLocalStorage(usuarios, "usuariosfinales");

  renderFinales();
}

function toggleHabilitado(indice, estado) {
    let usuarios = obtenerLocalStorage("usuariosfinales")||[];

    if (!usuarios[indice]) {
        return;
    }
     if (usuarios[indice].rol === "admin") {
        return;
    }

    usuarios[indice].habilitado = estado;

    guardarLocalStorage(usuarios, "usuariosfinales");
}
}