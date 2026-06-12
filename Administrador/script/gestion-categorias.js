import { obtenerCategorias } from './localStorage.js';
import { guardarCategorias } from './localStorage.js';

const nombre_categoria= document.getElementById("nombre_categoria")
const descripcion_categoria=document.getElementById("descripcion_categoria")
const form = document.getElementById("formCategoria")

let validaciones = []

window.onload= function(){
    incorporarListeners()
}

function incorporarListeners(){
    form.addEventListener("submit", function (event) {
        event.preventDefault()

        limpiarEstados()

        if (datosValidos()) {
            crearCategoria(nombre_categoria.value,descripcion_categoria.value)
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
    const categoria={
        nombre:nombre,
        descripcion:descripcion
    }

    let bd_categorias=obtenerCategorias()
    bd_categorias.push(categoria)
    guardarCategorias(bd_categorias)
}

console.log(obtenerCategorias())