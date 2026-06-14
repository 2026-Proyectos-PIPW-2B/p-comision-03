import {datosValidos, limpiarEstados, mostrarMensajeExito} from './validacion-categorias.js'
import{crearCategoria, actualizarCategoria, eliminarCategoria, EditarCategoria,obtenerCategoriaPorId} from './gestion-datos-categoria.js'
import { renderizarCards } from './renderizado-categorias.js'
import { incorporarListenerModalEditar,abrirModalEditar} from './panel-modal-categorias.js'

const nombre_categoria = document.getElementById("nombre_categoria")
const descripcion_categoria = document.getElementById("descripcion_categoria")
const form = document.getElementById("formCategoria")
const contenedorCategorias = document.getElementById("contenedor_categorias")
let idCategoriaEditando = null

window.onload= function(){
    incorporarListenerBoton()
    renderizarCards()
    incorporarListenerCards()
    incorporarListenerModalEditar()
}

function incorporarListenerBoton(){
    form.addEventListener("submit", function (event) {
        event.preventDefault()
        limpiarEstados()
        if (datosValidos(nombre_categoria,"errorNombre",descripcion_categoria, "errorDescripcion")) {
            if(idCategoriaEditando){
                actualizarCategoria(idCategoriaEditando,nombre_categoria.value,descripcion_categoria.value)
                idCategoriaEditando = null
            }else{
                crearCategoria(nombre_categoria.value,descripcion_categoria.value)
            }
            renderizarCards()
            form.reset()
            limpiarEstados()
            mostrarMensajeExito()
        }
    })
}

function incorporarListenerCards(){
    contenedorCategorias.addEventListener("click", function(e){
        const btnEliminar = e.target.closest(".btn-eliminar")
        const btnEditar = e.target.closest(".btn-editar")

        if(btnEliminar){
            eliminarCategoria(btnEliminar.dataset.id)
            renderizarCards()
        }
        if(btnEditar){
            const categoria = obtenerCategoriaPorId(
                btnEditar.dataset.id
            )

            abrirModalEditar(categoria)
            EditarCategoria(btnEditar.dataset.id)
        }
    })
}

