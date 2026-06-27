import { actualizarNav, protegerPagina, obtenerUsuarioActual } from '../gestion-usuarios/sesion.js'
import { obtenerLocalStorage } from '../core/localStorage.js'
import { actualizarBadgeCarrito } from './nav-carrito.js'
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
    renderPedidos()
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
function renderPedidos() {
    const lista = document.getElementById("lista-pedidos")
     lista.innerHTML = "" 
    if (pedidosFiltrados.length === 0) {
        let div_contenedor=document.createElement("div")
        div_contenedor.classList.add("text-center","py-5","contenedorhistorial")
        let i=document.createElement("i")
        i.classList.add("bi","bi-bag-x","iconhistorial")
        let p=document.createElement("p")
        p.classList.add("mb-3")
        p.textContent="Todavía no realizaste ninguna compra."
        let a=document.createElement("a")
        a.href="producto.html"
        a.classList.add("btn","rounded-pill","px-4","a_historial")
        a.textContent="Ver productos"
        div_contenedor.append(i,p,a)
        lista.appendChild(div_contenedor)
        return
    }

    const inicio = (paginaActual - 1) * PEDIDOS_POR_PAGINA
    const pagina = pedidosFiltrados.slice(inicio, inicio + PEDIDOS_POR_PAGINA)

    const contenedor = document.createElement("div")

    for (let i = 0; i < pagina.length; i++) {
        const p = pagina[i]
        const estado = calcularEstado(p.fecha)
        // Convierte la fecha ISO a formato legible en español: "27 de junio de 2026"
        const fechaMostrar = new Date(p.fecha).toLocaleDateString("es-AR", {
            day: "numeric",  // día como número
             month: "long",  // mes completo
             year: "numeric" // año completo
        })

        let total = 0
        let cantTotal = 0
        for (let j = 0; j < p.productos.length; j++) {
            total += p.productos[j].precio * p.productos[j].cantidad
            cantTotal += p.productos[j].cantidad
        }

        const prods = document.createElement("div")
        for (let j = 0; j < p.productos.length; j++) {
            const pr = p.productos[j]
            let div=document.createElement("div")
            div.classList.add("d-flex","align-items-center","gap-3","py-2","border-bottom")
            let span_a=document.createElement("span")
            span_a.classList.add("rounded-2","d-flex","align-items-center","justify-content-center","flex-shrink-0","span_a")
            span_a.textContent=`x${pr.cantidad}`
            let span_b=document.createElement("span")
            span_b.classList.add("flex-grow-1","span_b")
            span_b.textContent=`${pr.nombre}`
            let span_c=document.createElement("span")
            span_c.classList.add("span_c")
            span_c.textContent=`${formatPrecio(pr.precio*pr.cantidad)}`
            div.append(span_a,span_b,span_c)
            prods.appendChild(div)
        }

        let div_contene=document.createElement("div")
        div_contene.classList.add("rounded-3","mb-3","overflow-hidden","mx-auto","divcard")
        let div_a=document.createElement("div")
        div_a.classList.add("d-flex","align-items-center","justify-content-between","flex-wrap","gap-2","px-3","py-2","div_a")
        let div_suba=document.createElement("div")
        let span_d=document.createElement("span")
        span_d.classList.add("span_d")
        span_d.textContent=`Pedido #${p.id}`
        let span_e=document.createElement("span")
        span_e.classList.add("ms-3","span_e")
        span_e.textContent=`${fechaMostrar}`
        div_suba.append(span_d,span_e)
        div_a.append(div_suba,badgeEstado(estado))
        let div_b=document.createElement("div")
        div_b.classList.add("px-3","pt-2","pb-1","div_b_historial")
        div_b.appendChild(prods)
        let div_c=document.createElement("div")
        div_c.classList.add("d-flex","align-items-center","justify-content-between","px-3","py-2","div_c_historial")
        let textoProducto = ""
        if (cantTotal > 1) {
        textoProducto = `${cantTotal} productos`
        } else {
        textoProducto = `${cantTotal} producto`
        }
        let span_f=document.createElement("span")
        span_f.classList.add("span_f")
        let icono=document.createElement("i")
        icono.classList.add("bi","bi-bag","me-1")
        span_f.append(icono,textoProducto)
        let span_g=document.createElement("span")
        span_g.classList.add("span_g")
        span_g.textContent=`Total: ${formatPrecio(total)}`
        div_c.append(span_f,span_g)
        div_contene.append(div_a,div_b,div_c)
        contenedor.appendChild(div_contene)
    }

    lista.appendChild(contenedor)
    renderPaginacion()
}

function renderPaginacion() {
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