import { renderPaginacion } from "./historial.js";

export function renderPedidos(pedidosFiltrados = " ") {
    const lista = document.getElementById("lista-pedidos");
    lista.innerHTML = "";

    if (pedidosFiltrados.length === 0) {
        lista.appendChild(crearMensajeSinPedidos());
        return;
    }

    obtenerPedidosPagina().forEach(pedido => {
        lista.appendChild(crearTarjetaPedido(pedido));
    });

    renderPaginacion();
}

function obtenerPedidosPagina() {
    const inicio = (paginaActual - 1) * PEDIDOS_POR_PAGINA;

    return pedidosFiltrados.slice(
        inicio,
        inicio + PEDIDOS_POR_PAGINA
    );
}

function crearTarjetaPedido(pedido) {

    const tarjeta = document.createElement("div");
    tarjeta.classList.add(
        "rounded-3",
        "mb-3",
        "overflow-hidden",
        "mx-auto",
        "divcard"
    );

    tarjeta.append(
        crearCabeceraPedido(pedido),
        crearDetallePedido(pedido),
        crearPiePedido(pedido)
    );

    return tarjeta;
}

function crearCabeceraPedido(pedido) {

    const cabecera = document.createElement("div");
    cabecera.classList.add(
        "d-flex",
        "align-items-center",
        "justify-content-between",
        "flex-wrap",
        "gap-2",
        "px-3",
        "py-2",
        "div_a"
    );

    const info = document.createElement("div");

    const codigo = document.createElement("span");
    codigo.classList.add("span_d");
    codigo.textContent = `Pedido #${pedido.id}`;

    const fecha = document.createElement("span");
    fecha.classList.add("ms-3", "span_e");
    fecha.textContent = obtenerFechaFormateada(pedido.fecha);

    info.append(codigo, fecha);

    cabecera.append(
        info,
        badgeEstado(calcularEstado(pedido.fecha))
    );

    return cabecera;
}

function crearDetallePedido(pedido) {

    const contenedor = document.createElement("div");
    contenedor.classList.add(
        "px-3",
        "pt-2",
        "pb-1",
        "div_b_historial"
    );

    pedido.productos.forEach(producto => {
        contenedor.appendChild(crearProductoPedido(producto));
    });

    return contenedor;
}

function crearProductoPedido(producto) {

    const fila = document.createElement("div");
    fila.classList.add(
        "d-flex",
        "align-items-center",
        "gap-3",
        "py-2",
        "border-bottom"
    );

    const cantidad = document.createElement("span");
    cantidad.classList.add(
        "rounded-2",
        "d-flex",
        "align-items-center",
        "justify-content-center",
        "flex-shrink-0",
        "span_a"
    );
    cantidad.textContent = `x${producto.cantidad}`;

    const nombre = document.createElement("span");
    nombre.classList.add("flex-grow-1", "span_b");
    nombre.textContent = producto.nombre;

    const subtotal = document.createElement("span");
    subtotal.classList.add("span_c");
    subtotal.textContent = formatPrecio(
        producto.precio * producto.cantidad
    );

    fila.append(cantidad, nombre, subtotal);

    return fila;
}

function crearPiePedido(pedido) {

    const { total, cantidad } = calcularResumenPedido(pedido);

    const pie = document.createElement("div");
    pie.classList.add(
        "d-flex",
        "align-items-center",
        "justify-content-between",
        "px-3",
        "py-2",
        "div_c_historial"
    );

    const izquierda = crearCantidadProductos(cantidad);

    const derecha = document.createElement("span");
    derecha.classList.add("span_g");
    derecha.textContent = `Total: ${formatPrecio(total)}`;

    pie.append(izquierda, derecha);

    return pie;
}

function calcularResumenPedido(pedido) {

    let total = 0;
    let cantidad = 0;

    pedido.productos.forEach(producto => {
        total += producto.precio * producto.cantidad;
        cantidad += producto.cantidad;
    });

    return { total, cantidad };
}

function crearCantidadProductos(cantidad) {

    const span = document.createElement("span");
    span.classList.add("span_f");

    const icono = document.createElement("i");
    icono.classList.add("bi", "bi-bag", "me-1");

    span.append(
        icono,
        `${cantidad} ${cantidad === 1 ? "producto" : "productos"}`
    );

    return span;
}

function obtenerFechaFormateada(fecha) {
    return new Date(fecha).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function crearMensajeSinPedidos(lista) {
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
}