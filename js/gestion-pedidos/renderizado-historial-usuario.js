import { formatPrecio, calcularResumenPedido } from "./util-pedidos.js";
import { badgeEstado } from "./pedido-ui.js";

export function renderPedidos(pedidosPagina) {
    const lista = document.getElementById("lista-pedidos");
    lista.innerHTML = "";

    if (pedidosPagina.length === 0) {
        lista.appendChild(crearMensajeSinPedidos());
        return;
    }

    pedidosPagina.forEach(pedido => {
        lista.appendChild(crearTarjetaPedido(pedido));
    });
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
    codigo.textContent = `Pedido #${pedido.codigo}`;

    const fecha = document.createElement("span");
    fecha.classList.add("ms-3", "span_e");
    fecha.textContent = pedido.fecha;

    info.append(codigo, fecha);

    cabecera.append(
        info,
        badgeEstado(pedido.estado)
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

    pedido.compras.forEach(item => {
        contenedor.appendChild(crearProductoPedido(item));
    });

    return contenedor;
}

function crearProductoPedido(compra) {

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
    cantidad.textContent = `x${compra.cantidad}`;

    const nombre = document.createElement("span");
    nombre.classList.add("flex-grow-1", "span_b");
    nombre.textContent = compra.producto.nombre;

    const subtotal = document.createElement("span");
    subtotal.classList.add("span_c");
    subtotal.textContent = formatPrecio(
        compra.producto.precio * compra.cantidad
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

function crearMensajeSinPedidos() {

    const div = document.createElement("div");
    div.classList.add(
        "text-center",
        "py-5",
        "contenedorhistorial"
    );

    const icono = document.createElement("i");
    icono.classList.add(
        "bi",
        "bi-bag-x",
        "iconhistorial"
    );

    const texto = document.createElement("p");
    texto.classList.add("mb-3");
    texto.textContent = "Todavía no realizaste ninguna compra.";

    const boton = document.createElement("a");
    boton.href = "producto.html";
    boton.classList.add(
        "btn",
        "rounded-pill",
        "px-4",
        "a_historial"
    );
    boton.textContent = "Ver productos";

    div.append(icono, texto, boton);

    return div;
}