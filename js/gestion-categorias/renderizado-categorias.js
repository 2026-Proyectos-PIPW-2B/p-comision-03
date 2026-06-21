import {obtenerCategorias, obtenerIcono } from './servicios-categorias.js'
import { mostrarCategoria } from '../gestion-usuarios/productos-usser.js'

const contenedorCategorias = document.getElementById("contenedor_categorias")

/*---------------------- creacion cards admin ---------------------- */

function crearCard(categoria){
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
    iconContainer.innerHTML=categoria.icono

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
    badge.textContent = `${categoria.stock} prod.`

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

    return col
}

/*---------------------- creacion cards usser ---------------------- */
function crearColumnaCategoria(categoria){
    const div=document.createElement("div")
    div.classList.add("col-12", "col-md-6", "col-lg-3")
    const card=crearCardUsser(categoria)

    div.appendChild(card)
    return div
}

function crearCardUsser(categoria){
    const div = document.createElement("div")
    div.classList.add("card-categoria")

    const link = crearCategoria(categoria)

    div.appendChild(link)

    return div
}   

function crearCategoria(categoria){
    const div = document.createElement("div")
    div.classList.add("text-decoration-none", "text-dark")
    
    div.style.cursor = "pointer"

    div.addEventListener("click", () => {
        mostrarCategoria(categoria)
    })

    const divIcon = document.createElement("div")
    divIcon.classList.add("icono")
    divIcon.innerHTML = obtenerIcono(categoria.nombre)
 
    const nombreCat = document.createElement("h3")
    nombreCat.textContent = categoria.nombre

    const stockCategoria = document.createElement("p")
    stockCategoria.textContent= categoria.stock

    div.append(divIcon,nombreCat,stockCategoria)
        
    return div
}

/*---------------------- exports ---------------------- */

export function renderizarCards() {

    const categorias = obtenerCategorias()

    contenedorCategorias.replaceChildren()

    categorias.forEach(categoria => {
        let card=crearCard(categoria)
        contenedorCategorias.appendChild(card)
    })
}

export function mostrarCategorias(contenedor){
    contenedor.innerHTML = ""

    const categorias = obtenerCategorias()

    for(const categoria of categorias){
        contenedor.appendChild(
            crearColumnaCategoria(categoria)
        )
    }
}