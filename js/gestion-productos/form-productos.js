import { datosProductoValidos, datosProductoValidosExtendido, validarImagen } from "../validaciones/validaciones.js"
import { crearProducto, obtenerProductoEditar,actualizarProducto, crearProductoExtendido} from "./servicios-productos.js"
import { mostrarAlertaExito } from'../UI/Alertas.js'
import { limpiarEstados } from '../UI/UI.js'
import { obtenerLocalStorage } from "../core/localStorage.js"

export function guardarProducto(campos) {
    const formularioValido = datosProductoValidos(campos)
    const imagenValida = validarImagen(campos.imagen.valor, campos.imagen.error);

    if (!formularioValido || !imagenValida) return
    crearProducto(
            campos.nombre.input.value,  campos.descripcion.input.value,  campos.categoria.input.value,
            campos.precio.input.value,  campos.stock.input.value ,campos.imagen.valor
        )
    mostrarAlertaExito( campos.nombre.input.value, "Producto registrado con exitó", "productos-admin.html")
}


export function guardarProductoExtendido(campos){
    const formularioValido = datosProductoValidosExtendido(campos)
    const imagenAnterior = localStorage.getItem("imagenProductoEditar");

    const imagenValida = validarImagen(campos.imagen.valor,campos.imagen.error,!!imagenAnterior);

    if (!formularioValido || !imagenValida) {
        return;
    }


    const productoListEdit = obtenerProductoEditar()

    if(productoListEdit.length>0){
        const productoEditar=productoListEdit[0]
        let nombreImagen = localStorage.getItem("imagenProductoEditar");

        if(campos.imagen.valor !== ""){
            nombreImagen = campos.imagen.valor;
            campos.imagen.error = "";
        }
        actualizarProducto(
            productoEditar.id, campos.nombre.input.value, campos.descripcion.input.value,
            campos.categoria.input.value, campos.precio.input.value, campos.stock.input.value,
            campos.stockMinimo.input.value, campos.publicado.input.checked, campos.destacado.input.checked, nombreImagen
        )

        localStorage.removeItem("productoEditar")
        localStorage.removeItem("imagenProductoEditar")
        mostrarAlertaExito(productoEditar.nombre , "Producto actualizado con exitó","productos-admin.html")
    } 
    else{
        crearProductoExtendido(
        campos.nombre.input.value,  campos.descripcion.input.value,  campos.categoria.input.value,
        campos.precio.input.value,  campos.stock.input.value,  campos.stockMinimo.input.value,
        campos.publicado.input.checked, campos.destacado.input.checked ,campos.imagen.valor
    )
        mostrarAlertaExito( campos.nombre.input.value, "Producto registrado con exitó","productos-admin.html")
    }
}


