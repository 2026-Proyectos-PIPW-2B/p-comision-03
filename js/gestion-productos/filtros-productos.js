import { obtenerProductos } from "./servicios-productos.js"
import { renderizarTabla } from "./renderizado-productos.js"

let filtro_categoria, filtro_texto, boton_limpiar

const filtros = {
    categoria: "",
    texto: ""
}

export function inicializarFiltros(categoria, texto, botonLimpiar){
    filtro_categoria = categoria
    filtro_texto = texto
    boton_limpiar = botonLimpiar

    filtro_categoria.addEventListener("change", aplicarFiltros)
    filtro_texto.addEventListener("input", aplicarFiltros)

    boton_limpiar.addEventListener("click", limpiarFiltros)

    actualizarBotonLimpiar()
}

function aplicarFiltros(){
    leerFiltros()

    let productos = obtenerProductos()
    productos = filtrarProductos(productos)

    renderizarTabla(productos)
}

function leerFiltros(){
    filtros.categoria = filtro_categoria.value
    filtros.texto = filtro_texto.value.toLowerCase()
}

function filtrarProductos(productos){
    return productos.filter(cumpleFiltros)
}

function cumpleFiltros(producto){
    if(filtros.categoria && producto.categoria !== filtros.categoria)
        return false
    
    if(filtros.texto && !producto.nombre.toLowerCase().includes(filtros.texto))
        return false

    return true
}

