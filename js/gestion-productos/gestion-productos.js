import { actualizarSelectCategorias } from "../gestion-categorias/servicios-categorias.js"
import { guardarProducto } from './form-productos.js'
import { mostrarPreview, quitarImagen } from './imagen-productos.js'
import { renderizarTabla } from './renderizado-productos.js'

const selectCategorias = document.getElementById("categoria")
const inputNombre      = document.getElementById("nombre_prod")
const inputDescripcion = document.getElementById("descripcion")
const inputPrecio      = document.getElementById("precio")
const inputStock       = document.getElementById("stock")
const btnGuardar       = document.getElementById("btn_guardar")
const zonaImagen       = document.getElementById("zonaImagen")
const inputImagen      = document.getElementById("inputImagen")
const imgPreview       = document.getElementById("imgPreview")
const previewDiv       = document.getElementById("previewImagen")
const btnQuitar        = document.getElementById("btnQuitarImagen")



const campos = {
    nombre:      { input: inputNombre,      error: "errorNombre" },
    descripcion: { input: inputDescripcion, error: "errorDescripcion" },
    categoria:   { input: selectCategorias, error: "errorCategoria" },
    precio:      { input: inputPrecio,      error: "errorPrecio" },
    stock:       { input: inputStock,       error: "errorStock" },
}

window.onload = function () {
    actualizarSelectCategorias(selectCategorias)
    inicializarListeners()
    renderizarTabla()
}

export function obtenerTabla(){
    const tabla = document.getElementById("lista-prod")
    return tabla
}

function inicializarListeners() {
    zonaImagen.addEventListener("click",    () => inputImagen.click())
    inputImagen.addEventListener("change",  () => mostrarPreview(inputImagen.files[0],previewDiv,zonaImagen))
    btnQuitar.addEventListener("click",     () => quitarImagen(previewDiv,zonaImagen))
    btnGuardar.addEventListener("click",    () => guardarProducto(campos))
}



