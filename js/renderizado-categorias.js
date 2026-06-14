import {obtenerCategorias} from './gestion-datos-categoria.js'

const contenedorCategorias = document.getElementById("contenedor_categorias")

export function renderizarCards() {

    const categorias = obtenerCategorias()

    contenedorCategorias.replaceChildren()

    categorias.forEach(categoria => {
        let card=crearCard(categoria)
        contenedorCategorias.appendChild(card)
    })
}

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
