import { obtenerLocalStorage } from "../core/localStorage.js"
import { actualizarCategoria, actualizarSelectCategorias } from "../gestion-categorias/servicios-categorias.js"
import { guardarProducto, guardarProductoExtendido } from './form-productos.js'
import { mostrarPreview, quitarImagen } from './imagen-productos.js'
import { obtenerProductoEditar } from "./servicios-productos.js"

const selectCategorias = document.getElementById("categoria")
const inputNombre      = document.getElementById("nombre_prod")
const inputDescripcion = document.getElementById("descripcion")
const inputPrecio      = document.getElementById("precio")
const inputStock       = document.getElementById("stock")
const inputStockMinimo = document.getElementById("stock_minimo")
const checkPublicado   = document.getElementById("publicado")
const checkDestacado   = document.getElementById("destacado")
const btnGuardar       = document.getElementById("btn_guardar")
const formStock        = document.getElementById("formStock")
const formBasic        = document.getElementById("formBasic")
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
    stockMinimo: { input: inputStockMinimo, error: "errorStockMinimo" },
    destacado:   { input: checkDestacado.checked},
    publicado:   { input: checkPublicado.checked},
}

window.onload = function () {
    actualizarSelectCategorias(selectCategorias)
    inicializarListeners()
    if(obtenerProductoEditar().length>0)
        cargarModoEdicion()
}

function cargarModoEdicion(){
    const producto=obtenerProductoEditar()[0]
    
    if(!producto) return

    document.getElementById("tituloFormulario").textContent = "Editar producto"
    btnGuardar.textContent="Actualizar producto"
    const btnVolver = document.getElementById("btn-volver")

    btnVolver.addEventListener("click", () => {
        localStorage.removeItem("productoEditar")
    })

    inputNombre.value = producto.nombre
    inputDescripcion.value = producto.descripcion
    inputPrecio.value = producto.precio
    inputStock.value = producto.stock
    inputStockMinimo.value = producto.stockMinimo

    checkPublicado.checked = producto.publicado
    checkDestacado.checked = producto.destacado

    selectCategorias.value = producto.categoria
    imgPreview.src = `img/${producto.imagen}`

    previewDiv.classList.remove("d-none")
    zonaImagen.classList.add("d-none")
    localStorage.setItem( "imagenProductoEditar", producto.imagen )
}

function inicializarListeners() {
    btnGuardar.addEventListener("click",    () => guardarProductoExtendido(campos))
    zonaImagen.addEventListener("click",    () => inputImagen.click())
    inputImagen.addEventListener("change",  () => mostrarPreview(inputImagen.files[0],previewDiv,zonaImagen))
    btnQuitar.addEventListener("click", () => {
        localStorage.removeItem("imagenProductoEditar")
        quitarImagen( inputImagen,imgPreview,previewDiv,zonaImagen)
    })
    
}



