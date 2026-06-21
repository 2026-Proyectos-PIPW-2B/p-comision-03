import { mostrarPublicados,crearColumna, mostrarProductos } from "../gestion-productos/renderizado-productos.js"
import { actualizarNav } from "./sesion.js"
import { obtenerProductos } from "../gestion-productos/servicios-productos.js"
import { obtenerIcono } from "../gestion-categorias/servicios-categorias.js"
import { mostrarCategorias } from '../gestion-categorias/renderizado-categorias.js'

const contendorCategorias=document.getElementById("categorias")
const seccionCategorias = document.getElementById("seccion-categorias")
const infoCategoria = document.getElementById("info-categoria")
const contenedorProductos = document.getElementById("prod-publicados")
const inputFiltro = document.getElementById("filtro")

let categoriaActual = null

window.onload= function(){
    actualizarNav()
    mostrarCategorias(contendorCategorias)
    mostrarPublicados(contenedorProductos)
    inputFiltro.addEventListener("input", filtrarProductos)
}
 
export function mostrarCategoria(categoria){
    seccionCategorias.classList.add("d-none")
    infoCategoria.classList.remove("d-none")

    categoriaActual = categoria.nombre

    const productos = obtenerProductos().filter(producto => producto.categoria === categoria.nombre && producto.publicado)

    mostrarProductos( contenedorProductos, productos)

    infoCategoria.innerHTML = `
        <div class="categoria-info shadow-sm">
            <div class="categoria-icono">
                ${obtenerIcono(categoria.nombre)}
            </div>

            <h2 class="categoria-titulo">
                ${categoria.nombre}
            </h2>

            <p class="categoria-descripcion">
                ${categoria.descripcion}
            </p>

            <button
                id="btnVolverCategorias"
                class="btn btn-outline-secondary rounded-pill px-4"
            >
                <i class="bi bi-arrow-left"></i>
                Volver
            </button>
        </div>
        `

    document.getElementById("btnVolverCategorias").addEventListener("click", volverInicio)
}

function volverInicio(){
    categoriaActual = null
    seccionCategorias.classList.remove("d-none")
    infoCategoria.classList.add("d-none")
    infoCategoria.innerHTML = ""

    mostrarCategorias(contendorCategorias)
    mostrarPublicados(contenedorProductos)
}

function filtrarProductos(){
    const texto = document.getElementById("filtro").value.trim().toLowerCase()

    let productos = obtenerProductos().filter(producto => producto.publicado)

    if(categoriaActual)
        productos = productos.filter( producto => producto.categoria === categoriaActual)
    
    productos = productos.filter( producto => producto.nombre.toLowerCase().includes(texto))

    mostrarProductos(contenedorProductos,productos)
}