import { obtenerLocalStorage,guardarLocalStorage } from "../core/localStorage.js"
import { obtenerProductos } from "../gestion-productos/servicios-productos.js"

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
        perros: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dog-icon lucide-dog"><path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/></svg>',
        gatos: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cat-icon lucide-cat"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>',
        aves: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bird-icon lucide-bird"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>',
        peces: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fish-icon lucide-fish"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"/></svg>',
        higiene: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bubbles-icon lucide-bubbles"><path d="M7.001 15.085A1.5 1.5 0 0 1 9 16.5"/><circle cx="18.5" cy="8.5" r="3.5"/><circle cx="7.5" cy="16.5" r="5.5"/><circle cx="7.5" cy="4.5" r="2.5"/></svg>',
        roedores:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rabbit-icon lucide-rabbit"><path d="M13 16a3 3 0 0 1 2.24 5"/><path d="M18 12h.01"/><path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"/><path d="M20 8.54V4a2 2 0 1 0-4 0v3"/><path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"/></svg>'
    }       
    return iconos[nombreCategoria.toLowerCase()] || '<i class="bi-tag-fill"></i>'
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
     if (!select) return 
    categorias.forEach(categoria => {
        const option = document.createElement("option")

        option.value = categoria.nombre
        option.textContent = categoria.nombre

        select.appendChild(option)
    })
}

export function actualizarStockCategorias(){
    const categorias = obtenerCategorias()
    const productos = obtenerProductos()

    categorias.forEach(categoria => {
        categoria.stock = productos.filter(
            producto => producto.categoria === categoria.nombre
        ).length
    })

    guardarLocalStorage(categorias, "bd-categoria")
}

