import { actualizarNav, protegerPagina, obtenerUsuarioActual } from '../gestion-usuarios/sesion.js'
import { obtenerLocalStorage } from '../core/localStorage.js'
import { actualizarBadgeCarrito } from './nav-carrito.js'
import { renderPedidos } from './renderizado-historial-usuario.js'

const PEDIDOS_POR_PAGINA = 4
let paginaActual = 1
let pedidos = []
let pedidosFiltrados = [] 

document.addEventListener("DOMContentLoaded", () => {
    protegerPagina()
    actualizarNav()
    actualizarBadgeCarrito()
    cargarHistorial()

    document.getElementById("btnFiltrar").addEventListener("click", aplicarFiltros)
    document.getElementById("btnLimpiar").addEventListener("click", limpiarFiltros)
})


function aplicarFiltros() {
    const desde = document.getElementById("filtroDesde").value
    const hasta = document.getElementById("filtroHasta").value
    const montoMin = Number(document.getElementById("filtroMontoMin").value) || 0
    const montoMax = Number(document.getElementById("filtroMontoMax").value) || Infinity

    pedidosFiltrados = []

    for (let i = 0; i < pedidos.length; i++) {
        const p = pedidos[i]
        const fecha = new Date(p.fecha)

        let total = 0
        for (let j = 0; j < p.productos.length; j++) {
            total += p.productos[j].precio * p.productos[j].cantidad
        }

       if (desde && fecha < new Date(desde + "T00:00:00")) continue
        if (hasta && fecha > new Date(hasta + "T23:59:59")) continue
        if (total < montoMin) continue
        if (total > montoMax) continue

        pedidosFiltrados.push(p)
    }

    paginaActual = 1
    actualizarSubtitulo()
    renderPedidos(pedidosFiltrados)
}

function limpiarFiltros() {
    document.getElementById("filtroDesde").value = ""
    document.getElementById("filtroHasta").value = ""
    document.getElementById("filtroMontoMin").value = ""
    document.getElementById("filtroMontoMax").value = ""

    pedidosFiltrados = pedidos
    paginaActual = 1
    actualizarSubtitulo()
    renderPedidos()
}

function actualizarSubtitulo() {
    const subtitulo = document.getElementById("subtitulo")
    const total = pedidosFiltrados.length
    if (total === 0) {
    subtitulo.textContent = "No se encontraron compras."
    } else{
        if (total === 1) {
        subtitulo.textContent = "1 compra en total"
        } else {
        subtitulo.textContent = `${total} compras en total`
        }
    } 
}

function calcularEstado(fechaStr) {
    const fechaPedido = new Date(fechaStr)
    const ahora = new Date()
    const Dias = Math.floor((ahora - fechaPedido) / (1000 * 60 * 60 * 24))

    if (Dias === 0){
        return "En preparación"
    }else{
        if (Dias === 1){
            return "En camino"
        }else{
             return "Entregado"
        }
    }   
}

function cargarHistorial() {
    const usuario = obtenerUsuarioActual()
    const historial = obtenerLocalStorage("historial-pedidos") || []
    let historialUsuario = null

    for (let i = 0; i < historial.length; i++) {
        if (historial[i].email === usuario.email) {
            historialUsuario = historial[i]  
            break
        }
    }

   if (historialUsuario) {
        pedidos = historialUsuario.pedidos
    } else {
        pedidos = []
    }
    pedidosFiltrados = pedidos
    actualizarSubtitulo()
    renderPedidos()
}

// Formatea un número como precio en pesos argentinos: 49200 → "$49.200"
function formatPrecio(n) {
    return "$" + Math.round(n).toLocaleString("es-AR")
}

function badgeEstado(estado) {
    let clase = ""

    if (estado === "Entregado") {
        clase = "entregado"
    } else if (estado === "En camino") {
        clase = "camino"
    } else if (estado === "En preparación") {
        clase = "preparacion"
    } else {
        clase = "proceso"
    }
    const span = document.createElement("span")
        span.classList.add("badge-estado", clase)
        span.textContent = estado
    return span
}


export function renderPaginacion() {
    const totalPaginas = Math.ceil(pedidosFiltrados.length / PEDIDOS_POR_PAGINA)
    const pag = document.getElementById("paginacion")
    pag.innerHTML = ""

    if (totalPaginas <= 1) return

    // Botón anterior
    const btnAnterior = document.createElement("button")
    btnAnterior.classList.add("btn", "btn-sm", "rounded-2", "btn-pag")
    btnAnterior.innerHTML = `<i class="bi bi-chevron-left"></i>`

    if (paginaActual === 1) {
        btnAnterior.disabled = true
    }

    btnAnterior.addEventListener("click", () => {
        cambiarPagina(paginaActual - 1)
    })

    pag.appendChild(btnAnterior)

    // Botones de página
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement("button")
        btn.classList.add("btn", "btn-sm", "rounded-2", "btn-pag")
        btn.textContent = i

        if (i === paginaActual) {
            btn.classList.add("btn-pag-activo")
        }

        btn.addEventListener("click", () => {
            cambiarPagina(i)
        })

        pag.appendChild(btn)
    }

    // Botón siguiente
    const btnSiguiente = document.createElement("button")
    btnSiguiente.classList.add("btn", "btn-sm", "rounded-2", "btn-pag")
    btnSiguiente.innerHTML = `<i class="bi bi-chevron-right"></i>`

    if (paginaActual === totalPaginas) {
        btnSiguiente.disabled = true
    }

    btnSiguiente.addEventListener("click", () => {
        cambiarPagina(paginaActual + 1)
    })

    pag.appendChild(btnSiguiente)
}

function cambiarPagina(n) {
    const totalPaginas = Math.ceil(pedidosFiltrados.length / PEDIDOS_POR_PAGINA)
    if (n < 1 || n > totalPaginas) return
    paginaActual = n
    renderPedidos()
    window.scrollTo({ top: 0, behavior: "smooth" })
}