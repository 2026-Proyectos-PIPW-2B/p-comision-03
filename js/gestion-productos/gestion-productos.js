import { actualizarSelectCategorias } from "../gestion-categorias/servicios-categorias.js"
import { guardarProducto } from './form-productos.js'
import { mostrarPreview, quitarImagen } from './imagen-productos.js'
import { renderizarTabla } from './renderizado-productos.js'
import { inicializarFiltros } from "./filtros-productos.js"
import { obtenerProductos } from "./servicios-productos.js"
import { obtenerProductosBajoStock, obtenerProductosSinStock } from "./util-productos.js"
import { crearPaginador, renderPaginacion } from "../core/paginador.js";

const selectCategorias      = document.getElementById("categoria")
const inputNombre           = document.getElementById("nombre_prod")
const inputDescripcion      = document.getElementById("descripcion")
const inputPrecio           = document.getElementById("precio")
const inputStock            = document.getElementById("stock")
const btnGuardar            = document.getElementById("btn_guardar")
const zonaImagen            = document.getElementById("zonaImagen")
const inputImagen           = document.getElementById("inputImagen")
const imgPreview            = document.getElementById("imgPreview")
const previewDiv            = document.getElementById("previewImagen")
const btnQuitar             = document.getElementById("btnQuitarImagen")
const btn_eliminar_filtros  = document.getElementById("btn_eliminar_filtros")
const filtros_nombre        = document.getElementById("filtros_nombre")
const filtros_categorias    = document.getElementById("filtros_categorias")

const STOCK_POR_PAGINA = 10;

let paginador;

const campos = {
    nombre:      { input: inputNombre,      error: "errorNombre" },
    descripcion: { input: inputDescripcion, error: "errorDescripcion" },
    categoria:   { input: selectCategorias, error: "errorCategoria" },
    precio:      { input: inputPrecio,      error: "errorPrecio" },
    stock:       { input: inputStock,       error: "errorStock" },
}

window.onload = function () {
    if (!zonaImagen || !inputImagen || !btnGuardar) return
    actualizarSelectCategorias(selectCategorias)
    actualizarSelectCategorias(filtros_categorias)
    inicializarListeners()
    renderizarTabla()
    inicializarFiltros(filtros_categorias, filtros_nombre, btn_eliminar_filtros)
    paginador = crearPaginador({
            data: obtenerProductos(),
            porPagina: STOCK_POR_PAGINA
    });
    render();
    procesarAcciones();
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

function procesarAcciones() {
    const params = new URLSearchParams(window.location.search);
    const accion = params.get("accion");

    if (!accion) return;

    switch (accion) {
        case "stock-bajo":
            renderizarTabla(obtenerProductosBajoStock());
            break;

        case "sin-stock":
            renderizarTabla(obtenerProductosSinStock() );
            break;
    }
}

function render() {
    renderizarTabla(
        paginador.obtenerPagina()
    );

    renderPaginacion({
        paginador,
        onPaginaChange: cambiarPagina
    });
}

function cambiarPagina(n) {
    paginador.cambiarPagina(n);
    render();
}