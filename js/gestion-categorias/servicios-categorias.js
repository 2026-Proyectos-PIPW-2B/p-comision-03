import { obtenerLocalStorage,guardarLocalStorage } from "../core/localStorage.js"

const btnGuardarEdicion = document.getElementById("btnGuardarEdicion")
const inputEditarNombre = document.getElementById("editar_nombre")
const inputEditarDescripcion = document.getElementById("editar_descripcion")
const idCategoria = document.getElementById("categoria")


export function obtenerCategorias(){
    return obtenerLocalStorage("bd-categoria")
}

export function obtenerCategoriaPorId(id){
    return obtenerCategorias().find(
        categoria => categoria.id === id
    )
}

export function obtenerIcono(nombreCategoria){
    const iconos = {
        perros: "bi-heart-fill",
        gatos: "bi-stars",
        aves: "bi-feather",
        peces: "bi-water",
        roedores: "bi-emoji-smile",
        higiene:"bi bi-stars"
    }
    return iconos[nombreCategoria.toLowerCase()] || "bi-tag-fill"
}

export function crearCategoria(nombre,descripcion){
    const categoria = {
        id: crypto.randomUUID(),
        nombre: nombre,
        descripcion: descripcion,
        icono: obtenerIcono(nombre.toLowerCase()),
        stock: 0
    }
    agregarCategoria(categoria)
}

function agregarCategoria(categoria){
    const categorias = obtenerCategorias()
    categorias.push(categoria)
    guardarLocalStorage(categorias,"bd-categoria")
}

export function actualizarCategoria(id, nombre, descripcion){
    const categorias = obtenerLocalStorage("bd-categoria")
    const categoria = categorias.find(
        categoria => categoria.id === id
    )
    if(categoria){
        categoria.nombre = nombre
        categoria.descripcion = descripcion
        categoria.icono = obtenerIcono(nombre.toLowerCase())
        guardarLocalStorage(categorias, "bd-categoria")
    }
}

export function eliminarCategoria(id){

    let categorias = obtenerCategorias()

    categorias = categorias.filter(
        categoria => categoria.id !== id
    )

    guardarLocalStorage(categorias,"bd-categoria")
}

export function EditarCategoria(id){
    const categorias =obtenerCategorias()
    const categoria = categorias.find(categoria => categoria.id ===id)
    if(categoria){
        let idCategoriaEditando = categoria.id
        inputEditarNombre.value = categoria.nombre
        inputEditarDescripcion.value = categoria.descripcion
    }
}

export function actualizarSelectCategorias(select){
    const categorias = obtenerCategorias()

    categorias.forEach(categoria => {
        const option = document.createElement("option")

        option.value = categoria.id
        option.textContent = categoria.nombre

        select.appendChild(option)
    })
}

