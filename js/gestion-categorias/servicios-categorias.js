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
/*Cambiar los icons a svg */
export function obtenerIcono(nombreCategoria){
    const iconos = {
        perros: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dog-icon lucide-dog"><path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/></svg>',
        gatos: "bi-stars",
        aves: "bi-feather",
        peces: "bi-water",
        roedores:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dog-icon lucide-dog"><path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/></svg>',
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
    const categoria = obtenerCategoriaPorId(id)
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
    const categoria =obtenerCategoriaPorId(id)
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

        option.value = categoria.nombre
        option.textContent = categoria.nombre

        select.appendChild(option)
    })
}

