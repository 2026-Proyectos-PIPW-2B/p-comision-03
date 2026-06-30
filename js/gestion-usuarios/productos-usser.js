import { mostrarPublicados, mostrarProductos } from "../gestion-productos/renderizado-productos.js";
import { actualizarNav } from "./sesion.js";
import { obtenerProductos } from "../gestion-productos/servicios-productos.js";
import { obtenerIcono } from "../gestion-categorias/servicios-categorias.js";
import { mostrarCategorias } from "../gestion-categorias/renderizado-categorias.js";
import { crearPaginador, renderPaginacion } from "../core/Paginador.js";
import { obtenerConfiguracion } from "../configuracion/servicios-configuracion-admin.js";

const contenedorCategorias = document.getElementById("categorias");
const seccionCategorias = document.getElementById("seccion-categorias");
const infoCategoria = document.getElementById("info-categoria");
const contenedorProductos = document.getElementById("prod-publicados");
const inputFiltro = document.getElementById("filtro");

let categoriaActual = null;
let paginador = null;
let productosActuales = [];

document.addEventListener("DOMContentLoaded", () => {
    actualizarNav();
    mostrarCategorias(contenedorCategorias);

    const publicados = obtenerProductos().filter(p => p.publicado);
    inicializarPaginacion(publicados);

    inputFiltro.addEventListener("input", filtrarProductos);
});

function inicializarPaginacion(productos) {
    productosActuales = productos;

    paginador = crearPaginador({
        data: productosActuales,
        porPagina: obtenerConfiguracion().listado.itemsPagina
    });

    renderPagina();
}

function renderPagina() {
    const pagina = paginador.obtenerPagina();

    mostrarProductos(contenedorProductos, pagina);

    renderPaginacion({
        paginador,
        onPaginaChange: (n) => {
            if (paginador.cambiarPagina(n)) {
                renderPagina();
            }
        }
    });
}

export function mostrarCategoria(categoria) {
    seccionCategorias.classList.add("d-none");
    infoCategoria.classList.remove("d-none");

    categoriaActual = categoria.nombre;

    const productos = obtenerProductos().filter(
        p => p.categoria === categoria.nombre && p.publicado
    );

    infoCategoria.innerHTML = `
        <div class="categoria-info shadow-sm">
            <div class="categoria-icono">
                ${obtenerIcono(categoria.nombre)}
            </div>

            <h2>${categoria.nombre}</h2>
            <p>${categoria.descripcion}</p>

            <button id="btnVolverCategorias" class="btn btn-outline-secondary rounded-pill px-4">
                <i class="bi bi-arrow-left"></i> Volver
            </button>
        </div>
    `;

    document.getElementById("btnVolverCategorias")
        .addEventListener("click", volverInicio);

    inicializarPaginacion(productos);
}

function volverInicio() {
    categoriaActual = null;

    seccionCategorias.classList.remove("d-none");
    infoCategoria.classList.add("d-none");
    infoCategoria.innerHTML = "";

    mostrarCategorias(contenedorCategorias);

    const publicados = obtenerProductos().filter(p => p.publicado);
    inicializarPaginacion(publicados);
}

function filtrarProductos() {
    const texto = inputFiltro.value.trim().toLowerCase();

    let productos = obtenerProductos().filter(p => p.publicado);

    if (categoriaActual) {
        productos = productos.filter(p => p.categoria === categoriaActual);
    }

    productos = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    inicializarPaginacion(productos);
}