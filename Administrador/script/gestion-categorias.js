import { obtenerLocalStorage } from './localStorage.js';
import { guardarLocalStorage } from './localStorage.js';

const nombre_categoria= document.getElementById("nombre_categoria")
const descripcion_categoria=document.getElementById("descripcion_categoria")
const form = document.getElementById("formCategoria")
const contenedorCategorias = document.getElementById("contenedor_categorias")

window.onload= function(){
    incorporarListenerBoton()
    renderizarCards()
    incorporarListenerCards()
}
/*Creación de categorias */
let validaciones = []

function incorporarListenerBoton(){
    form.addEventListener("submit", function (event) {
        event.preventDefault()

        limpiarEstados()

        if (datosValidos()) {
            crearCategoria(nombre_categoria.value,descripcion_categoria.value)
            renderizarCards()
            form.reset()
            limpiarEstados()
            mostrarMensajeExito()
        }
    })
}

function limpiarEstados() {
    const inputs = document.querySelectorAll(".form-control, .form-select, .form-check-input")
    document.getElementById("correcto").textContent = ""

    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}

function datosValidos() {
    validaciones = []

    console.log(nombre_categoria.value)
    validarNombre()
    validarDescripcion()

    mostrarMensaje()

    let formValido=true
    for(let i = 0; i < validaciones.length; i++) 
        formValido=formValido && validaciones[i].formulario
    

    return formValido
}

function validarNombre() {
    let validacion

    if (validator.isEmpty(nombre_categoria.value.trim())) {

        validacion = {
            id: nombre_categoria,
            div: "errorNombre",
            mensaje: "Debe indicar un nombre para la categoria.",
            formulario: false
        }

    } else if (nombre_categoria.value.trim().length < 3) {

        validacion = {
            id: nombre_categoria,
            div: "errorNombre",
            mensaje: "Debe ingresar al menos 3 caracteres.",
            formulario: false
        }

    } else {

        validacion = {
            id: nombre_categoria,
            div: "",
            mensaje: "",
            formulario: true
        }
    }

    validaciones.push(validacion)
}

function validarDescripcion() {

    let validacion

    if (validator.isEmpty(descripcion_categoria.value.trim())) {

        validacion = {
            id: descripcion_categoria,
            div: "errorDescripcion",
            mensaje: "Debe ingresar una descripcion.",
            formulario: false
        }

    } else {

        validacion = {
            id: descripcion_categoria,
            div: "",
            mensaje: "",
            formulario: true
        }
    }

    validaciones.push(validacion)
}

function mostrarMensaje() {
    let form
    for (let i = 0; i < validaciones.length; i++) {

        const val = validaciones[i]
        form=val.formulario
        if (form) {
            mostrarExito(val.id)
        } else {
            mostrarError(val.id, val.div, val.mensaje)
        }
    }
}

function mostrarError(input, idDivError, mensaje) {

    input.classList.remove("is-valid")
    input.classList.add("is-invalid")

    document.getElementById(idDivError).textContent = mensaje
}

function mostrarExito(input) {

    input.classList.remove("is-invalid")
    input.classList.add("is-valid")
}

function mostrarMensajeExito(){
    const mensaje = document.getElementById("correcto");

    mensaje.textContent = "Categoría cargada con éxito";
    mensaje.classList.add("mostrar");

    setTimeout(() => {
        mensaje.classList.remove("mostrar");
    }, 2000); 
}

function crearCategoria(nombre,descripcion){
    const categoria = {
        id: crypto.randomUUID(),
        nombre: nombre,
        descripcion: descripcion,
        icono: obtenerIcono(nombre.toLowerCase()),
        stock: 0
    }
    
    let bd_categorias=obtenerLocalStorage("bd-categoria")
    bd_categorias.push(categoria)
    guardarLocalStorage(bd_categorias, "bd-categoria")
}

/*Visualización dinamica*/
function obtenerIcono(nombreCategoria){

    const iconos = {
        perros: "bi-heart-fill",
        gatos: "bi-stars",
        aves: "bi-feather",
        peces: "bi-water",
        roedores: "bi-emoji-smile"
    }

    return iconos[nombreCategoria.toLowerCase()] || "bi-tag-fill"
}

function renderizarCards() {

    const categorias = obtenerLocalStorage("bd-categoria")

    contenedorCategorias.replaceChildren()

    categorias.forEach(categoria => {

        const col = document.createElement("div")
        col.className = "col-12 col-sm-6"

        const card = document.createElement("div")
        card.className = "card card-categoria shadow bg-light h-100"

        const body = document.createElement("div")
        body.className = "card-body p-3"

        const fila = document.createElement("div")
        fila.className = "d-flex align-items-start gap-3"

        const iconContainer = document.createElement("div")
        iconContainer.className = "cat-icon-circle"

        const icono = document.createElement("i")
        icono.className = `bi ${categoria.icono}`

        iconContainer.appendChild(icono)

        const contenido = document.createElement("div")
        contenido.className = "flex-grow-1"

        // CABECERA
        const header = document.createElement("div")
        header.className = "d-flex justify-content-between align-items-center"

        const titulo = document.createElement("h6")
        titulo.className = "fw-bold mb-0"
        titulo.textContent = categoria.nombre

        const badge = document.createElement("span")
        badge.className = "badge-stock"
        badge.textContent = `${categoria.stock} productos`

        header.append(titulo, badge)

        // DESCRIPCION
        const descripcion = document.createElement("p")
        descripcion.className = "text-muted mt-2 mb-0"
        descripcion.textContent = categoria.descripcion

        // BOTONES
        const acciones = document.createElement("div")
        acciones.className = "acciones-categoria d-flex justify-content-center gap-2"

        const btnEditar = document.createElement("button")
        btnEditar.textContent= "Editar"
        btnEditar.className = "btn btn-light rounded-pill shadow-sm btn-sm btn-editar"
        btnEditar.dataset.id = categoria.id

        const iconEditar = document.createElement("i")
        iconEditar.className = "bi bi-pencil"

        btnEditar.appendChild(iconEditar)

        const btnEliminar = document.createElement("button")
        btnEliminar.textContent="Eliminar"
        btnEliminar.className = "btn text-danger btn-sm btn-eliminar"
        btnEliminar.dataset.id = categoria.id

        const iconEliminar = document.createElement("i")
        iconEliminar.className = "bi bi-trash"

        btnEliminar.appendChild(iconEliminar)

        acciones.append(btnEditar, btnEliminar)

        contenido.append(header, descripcion, acciones)

        fila.append(iconContainer, contenido)

        body.appendChild(fila)

        card.appendChild(body)

        col.appendChild(card)

        contenedorCategorias.appendChild(col)
    })
}

function incorporarListenerCards(){

    contenedorCategorias.addEventListener("click", function(e){

        const btnEliminar = e.target.closest(".btn-eliminar")
        const btnEditar = e.target.closest(".btn-editar")

        if(btnEliminar){
            console.log("Eliminar:", btnEliminar.dataset.id)
        }

        if(btnEditar){
            console.log("Editar:", btnEditar.dataset.id)
        }
    })
}