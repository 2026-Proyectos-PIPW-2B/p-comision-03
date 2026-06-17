import { datosProductoValidos, datosProductoValidosExtendido, validarImagen } from "../validaciones/validaciones.js"
import { crearProducto } from "./servicios-productos.js"
import { mostrarAlertaExito } from'../UI/Alertas.js'
import { limpiarEstados } from '../UI/UI.js'

export function guardarProductoExtendido(campos) {
    const formularioValido = datosProductoValidosExtendido(campos)
    const imagenValida     = validarImagen(inputImagen, "errorImagen")

    if (!formularioValido || !imagenValida) return

    const archivo = inputImagen.files[0]
    crearProductoExtendido(
        campos.nombre.input,  campos.descripcion.input,  campos.categoria.input,
        campos.precio.input,  campos.stock.input,  campos.stockMinimo.input,
        campos.publicado.input, campos.destacado.input ,archivo.name
    )
    mostrarAlertaExito( campos.nombre.input.value, "Producto registrado con exitó", "new-product-admin.html")
}

export function guardarProducto(campos){
    const formularioValido = datosProductoValidos(campos)
    const imagenValida     = validarImagen(inputImagen, "errorImagen")

    if (!formularioValido || !imagenValida) return

    const archivo = inputImagen.files[0]
    crearProducto(
        campos.nombre.input,  campos.descripcion.input,  campos.categoria.input,
        campos.precio.input,  campos.stock.input ,archivo.name
    )
    mostrarAlertaExito( campos.nombre.input.value, "Producto registrado con exitó","productos-admin.html")
}