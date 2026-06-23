import { guardarLocalStorage, obtenerLocalStorage } from "../core/localStorage.js"
import { obtenerUsuarioActual } from "../gestion-usuarios/sesion.js"
import { mostrarAlertaWarning } from'../UI/Alertas.js'

export function obtenerCarritoPorUsuario(usuario){
    return obtenerCarrito().find(
            carrito => carrito.usuario.email === usuario.email)
}

export function obtenerCarrito(){
    return obtenerLocalStorage("carrito")
}

export function agregarCarrito(producto){
    const usuarioActual = obtenerUsuarioActual()

    if(!usuarioActual){
        mostrarAlertaWarning("ERROR", "Debe iniciar sesión en su cuenta","login.html")
        return
    }

    const carritos = obtenerCarrito()

    let carritoUsuario = carritos.find(
        carrito => carrito.usuario.email === usuarioActual.email
    )


    if(!carritoUsuario){
        carritoUsuario = {
            usuario: usuarioActual,
            compras: [],
            estado: "pendiente"
        }

        carritos.push(carritoUsuario)
    }
    if(carritoUsuario.estado === "aprobado"){
        carritoUsuario.estado = "pendiente"
        carritoUsuario.compras = []
    }
    let producExistente=carritoUsuario.compras.find(
        item => item.producto.id === producto.id
    )
    if(producExistente){
        producExistente.cantidad=obtenerCantidadProd(carritoUsuario,producto.id)
    }else{
        carritoUsuario.compras.push({"producto":producto,"cantidad":1})
    }
    //carritoUsuario.compras.push(producto)

    guardarLocalStorage(carritos, "carrito")
}
function obtenerCantidadProd(carritoUsuario,productoId){
     const item = carritoUsuario.compras.find(
        item => item.producto.id === productoId
    )

    if(item){
        return item.cantidad + 1
    }

    return 1
}