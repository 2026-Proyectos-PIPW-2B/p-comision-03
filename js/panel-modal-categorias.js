import{datosValidos} from './validacion-categorias.js'
import { obtenerCategorias,obtenerIcono } from './gestion-datos-categoria.js'
import { renderizarCards } from './renderizado-categorias.js'
import { guardarLocalStorage } from './localStorage.js'

const inputEditarNombre = document.getElementById("editar_nombre")
const inputEditarDescripcion = document.getElementById("editar_descripcion")
const btnGuardarEdicion = document.getElementById("btnGuardarEdicion")
const modalEditar = new bootstrap.Modal( document.getElementById("modalEditarCategoria"))

let idCategoriaEditando = null


export function abrirModalEditar(categoria){
    idCategoriaEditando = categoria.id

    inputEditarNombre.value = categoria.nombre
    inputEditarDescripcion.value = categoria.descripcion

    modalEditar.show()
}

export function incorporarListenerModalEditar(){
    btnGuardarEdicion.addEventListener("click", function(){
        if(!datosValidos(inputEditarNombre, "errorEditarNombre", inputEditarDescripcion, "errorEditarDescripcion")){
            return
        }
        const categorias =obtenerCategorias()
        const categoria = categorias.find(categoria =>categoria.id === idCategoriaEditando)
        if(categoria){
            categoria.nombre = inputEditarNombre.value.trim()
            categoria.descripcion = inputEditarDescripcion.value.trim()
            categoria.icono =obtenerIcono(inputEditarNombre.value.toLowerCase())
            guardarLocalStorage(categorias,"bd-categoria")
            renderizarCards()
            limpiarModalEditar()
            modalEditar.hide()
            idCategoriaEditando = null
        }
    })
}

function limpiarModalEditar(){

    inputEditarNombre.value = ""
    inputEditarDescripcion.value = ""

    inputEditarNombre.classList.remove("is-valid", "is-invalid")
    inputEditarDescripcion.classList.remove("is-valid", "is-invalid")

    document.getElementById("errorEditarNombre").textContent = ""
    document.getElementById("errorEditarDescripcion").textContent = ""

    let validaciones = []
}