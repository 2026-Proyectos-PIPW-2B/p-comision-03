import { obtenerCarritoPorUsuario } from "./servicios-carrito.js"
import { obtenerUsuarioActual } from "../gestion-usuarios/sesion.js"

export function actualizarBadgeCarrito() {
    const usuarioActual = obtenerUsuarioActual()
    const badge = document.querySelector(".items-carrito")

    if (!usuarioActual || !badge) return

    const carritoUsuario = obtenerCarritoPorUsuario(usuarioActual)

    if (!carritoUsuario || carritoUsuario.compras.length === 0 || carritoUsuario.estado === "aprobado") {
        badge.textContent = 0
        return
    }

    let totalItems = 0
    carritoUsuario.compras.forEach(item => {
        totalItems += item.cantidad
    })
    badge.textContent = ""
    badge.textContent = totalItems
}
