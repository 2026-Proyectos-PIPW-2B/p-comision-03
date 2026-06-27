import { obtenerCarrito, obtenerCarritoPorUsuario } from "./servicios-carrito.js"
import { obtenerUsuarioActual,protegerPagina } from "../gestion-usuarios/sesion.js"
import { obtenerLocalStorage,guardarLocalStorage } from "../core/localStorage.js"
import { mostrarAlertaConfirm, mostrarAlertaWarning } from "../UI/Alertas.js"
import { mostrarAlertaExito } from "../UI/Alertas.js"
import { obtenerProductos } from "../gestion-productos/servicios-productos.js"
let envio_gratis=20000
let Costo_Envio=8000


protegerPagina();

const listaCarrito = document.querySelector(".lista-carrito")

 
function formatCLP(valor) {
    return "$" + Math.round(valor).toLocaleString("es-AR")
    
}

function crearTarjetaProducto(item) {
    const { producto, cantidad } = item
 
    const card = document.createElement("div")
    card.classList.add("card","mb-3","rounded-5","item-carrito") 
    card.dataset.id = producto.id
 
    let div_contenedor=document.createElement("div")
    div_contenedor.classList.add("d-flex","flex-colum","flex-sm-row")
    let div_imagen=document.createElement("div")
    div_imagen.classList.add("d-flex","align-items-center","justify-content-center","ps-4","pe-4")
    let img_produc=document.createElement("img")
    img_produc.src=`img/${producto.imagen}`
    img_produc.classList.add("img-fluid","rounded-4","img-carrito")
    div_imagen.appendChild(img_produc)
    let div_body=document.createElement("div")
    div_body.classList.add("flex-grow-1","p-0")
    let div_b=document.createElement("div")
    div_b.classList.add("card-body")
    let p_categoria=document.createElement("p")
    p_categoria.classList.add("card-text","mb-0")
    let small=document.createElement("small")
    small.classList.add("text-body-secondary")
    small.textContent=`${producto.categoria.toUpperCase()}`
    p_categoria.appendChild(small)
    let h_nom=document.createElement("h5")
    h_nom.classList.add("card-title")
    h_nom.textContent=`${producto.nombre}`
    let p_precio=document.createElement("p")
    p_precio.classList.add("card-text","fw-bold","mb-2")
    p_precio.textContent=`${formatCLP(producto.precio)}`
    let div_contboton=document.createElement("div")
    div_contboton.classList.add("d-flex","align-items-center","justify-content-between","controles-carrito")
    let div_button=document.createElement("div")
    let btn_resta=document.createElement("button")
    btn_resta.type="button"
    btn_resta.classList.add("btn","rounded-circle","border","botonCarrito","btn-restar")
    let i_resta=document.createElement("i")
    i_resta.classList.add("bi","bi-dash")
    btn_resta.appendChild(i_resta)
    let span=document.createElement("span")
    span.classList.add("text-center","cantidad-valor")
    span.textContent=`${cantidad}`
    let btn_suma=document.createElement("button")
    btn_suma.type="button"
    btn_suma.classList.add("btn","rounded-circle","border","botonCarrito","btn-sumar")
    let i_suma=document.createElement("i")
    i_suma.classList.add("bi","bi-plus")
    btn_suma.appendChild(i_suma)
    div_button.append(btn_resta,span,btn_suma)
    let div_eliminar=document.createElement("div")
    let btn_eliminar=document.createElement("button")
    btn_eliminar.type="button"
    btn_eliminar.classList.add("btn","rounded-5","botonCarrito","btn-eliminar")
    btn_eliminar.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`
    div_eliminar.appendChild(btn_eliminar)
    div_contboton.append(div_button,div_eliminar)
    div_b.append(p_categoria,h_nom,p_precio,div_contboton)
    div_body.appendChild(div_b)
    div_contenedor.append(div_imagen,div_body)

    card.appendChild(div_contenedor)

    card.querySelector(".btn-sumar").addEventListener("click", () => sumarCantidad(producto.id))
    card.querySelector(".btn-restar").addEventListener("click", () => restarCantidad(producto.id))
    card.querySelector(".btn-eliminar").addEventListener("click", () => eliminarProducto(producto.id))
 
    return card
}
function renderizarCarrito() {
    const usuarioActual = obtenerUsuarioActual()
    const carritoUsuario = obtenerCarritoPorUsuario(usuarioActual)
    const compras = carritoUsuario ? carritoUsuario.compras : []
 
    listaCarrito.innerHTML = ""
 

    if (!carritoUsuario || carritoUsuario.estado === "aprobado" || compras.length === 0) {
        let div_card=document.createElement("div")
        div_card.classList.add("card","mb-3","rounded-5")
        let div_contenedor=document.createElement("div")
        div_contenedor.classList.add("d-flex","flex-colum","flex-sm-row")
        let div_a=document.createElement("div")
        div_a.classList.add("d-flex","align-items-center","justify-content-center","ps-4","pe-4")
        let i=document.createElement("i")
        i.classList.add("bi","bi-bag-x","carritoVacio")
        div_a.appendChild(i)
        let div_b=document.createElement("div")
        div_b.classList.add("flex-grow-1","p-0")
        let div_body=document.createElement("div")
        div_body.classList.add("card-body")
        let h5=document.createElement("h5")
        h5.classList.add("card-title","text-muted")
        h5.textContent="Tu carrito está vacío"
        let p=document.createElement("p")
        p.classList.add("card-text","text-muted")
        p.textContent="Todavía no agregaste ningún producto"
        let a=document.createElement("a")
        a.href="producto.html"
        a.classList.add("btn","buttoncarrito","rounded-pill","px-4")
        a.textContent="Ver producto"
        div_body.append(h5,p,a)
        div_b.appendChild(div_body)
        div_contenedor.append(div_a,div_b)
        div_card.appendChild(div_contenedor)
        listaCarrito.appendChild(div_card)   
        actualizarResumen([])
        return
    }
    compras.forEach(item => {
        listaCarrito.appendChild(crearTarjetaProducto(item))
    })
 
    actualizarResumen(compras)
}


function actualizarResumen(compras) {
    let subtotal = 0
    let cantidadProductos = 0
 
    for (let i = 0; i < compras.length; i++) {
        subtotal += compras[i].producto.precio * compras[i].cantidad
        cantidadProductos += compras[i].cantidad
    }
    const envio = subtotal === 0 || subtotal >= envio_gratis ? 0 : Costo_Envio
    const total = subtotal + envio
 
    document.querySelector(".subtotal-label").textContent =`Subtotal (${cantidadProductos} producto${cantidadProductos === 1 ? "" : "s"})`
    document.querySelector(".subtotal-valor").textContent = formatCLP(subtotal)
    document.querySelector(".textenvio").textContent = envio === 0 ? "-" : formatCLP(envio)
    document.querySelector(".total-valor").textContent = formatCLP(total)
 
    const btnFinalizar = document.querySelector(".buttoncarrito")
    if (btnFinalizar) btnFinalizar.disabled = cantidadProductos === 0
}


function guardarCambios(carritos) {
    guardarLocalStorage(carritos, "carrito")
}
 
function sumarCantidad(productoId) {
    const usuarioActual = obtenerUsuarioActual()
    const carritos = obtenerCarrito()
    const carritoUsuario = carritos.find(c => c.usuario.email === usuarioActual.email)

    const item = carritoUsuario.compras.find(i => i.producto.id === productoId)
    if (!item) return

    if (item.cantidad >= item.producto.stock){
        mostrarAlertaWarning("Sin stock","No hay más unidades disponibles","")
        return 
    }
    item.cantidad += 1

    guardarCambios(carritos)
    renderizarCarrito()
}
 
function restarCantidad(productoId) {
    const usuarioActual = obtenerUsuarioActual()
    const carritos = obtenerCarrito()
    const carritoUsuario = carritos.find(c => c.usuario.email === usuarioActual.email)
 
    const item = carritoUsuario.compras.find(i => i.producto.id === productoId)
    if (!item) return
 
    item.cantidad -= 1
 
    if (item.cantidad <= 0) {
        eliminarDelCarrito(productoId, carritoUsuario, carritos)
        return
    }
 
    guardarCambios(carritos)
    renderizarCarrito()
}
 
function eliminarProducto(productoId) {
    const usuarioActual = obtenerUsuarioActual()
    const carritos = obtenerCarrito()
    const carritoUsuario = carritos.find(c => c.usuario.email === usuarioActual.email)
 
    eliminarDelCarrito(productoId, carritoUsuario, carritos)
}
 
function eliminarDelCarrito(productoId, carritoUsuario, carritos) {
    let index = -1
    for (let i = 0; i < carritoUsuario.compras.length; i++) {
        if (carritoUsuario.compras[i].producto.id === productoId) {
         index = i
            break
        }
    }
    if (index === -1) return
 
    carritoUsuario.compras.splice(index, 1)
 
    guardarCambios(carritos)
    renderizarCarrito()
}

function confirmarCompra() {
    const usuarioActual = obtenerUsuarioActual()
    if (!usuarioActual) return

    const carritos = obtenerCarrito()
    const carritoUsuario = carritos.find(c => c.usuario.email === usuarioActual.email)
    if (!carritoUsuario) return

    const productos = obtenerProductos()
    let huboAjuste = false

    
    carritoUsuario.compras = carritoUsuario.compras.filter(item => {
        const producto = productos.find(p => p.id === item.producto.id)
        if (!producto || producto.stock === 0) {
            huboAjuste = true
            return false  
        }
        if (item.cantidad > producto.stock) {
            item.cantidad = producto.stock 
            huboAjuste = true
        }
        return true
    })

    if (huboAjuste) {
        guardarLocalStorage(carritos, "carrito")
        renderizarCarrito()
        mostrarAlertaWarning(
            "Stock insuficiente",
            "Algunos productos fueron ajustados según el stock disponible. Revisá tu carrito antes de confirmar.",
            ""
        )
        return
    }
    carritoUsuario.compras.forEach(item => {
        const producto = productos.find(p => p.id === item.producto.id)
        if (producto) producto.stock -= item.cantidad
    })
    guardarLocalStorage(productos, "bd-productos")

    const pedido = {
    id: Date.now(),
    fecha:new Date().toISOString(),
    estado: "En camino",
    // map recorre las compras y devuelve un array nuevo con solo los datos necesarios para guardar en el historial
    productos: carritoUsuario.compras.map(item => ({
        nombre: item.producto.nombre,
        imagen: item.producto.imagen,
        cantidad: item.cantidad,
        precio: item.producto.precio
    }))
    }

    const historial = obtenerLocalStorage("historial-pedidos") || []
    const historialUsuario = historial.find(h => h.email === usuarioActual.email)

    if (historialUsuario) {
    historialUsuario.pedidos.unshift(pedido)
    } else {
    historial.push({ email: usuarioActual.email, pedidos: [pedido] })
    }

    guardarLocalStorage(historial, "historial-pedidos")

    carritoUsuario.estado = "aprobado"
    carritoUsuario.compras = []
    guardarLocalStorage(carritos, "carrito")
    renderizarCarrito()
    mostrarAlertaExito("¡Compra confirmada!", "Tu pedido está en camino 🐾", "index.html")
}

renderizarCarrito()

document.querySelector(".buttoncarrito").addEventListener("click", () => {   
    mostrarAlertaConfirm(
        "¿Confirmar compra?",
        "¿Estás seguro que querés finalizar el pedido?",
        confirmarCompra
    )
})