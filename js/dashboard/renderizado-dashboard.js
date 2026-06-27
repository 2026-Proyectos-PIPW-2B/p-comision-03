import { obtenerMetricas,obtenerPedidosRecientes,obtenerProductosStockBajo } from './datos-dashboard.js'

export function renderizarMetricas(pedidosHoy,ingresosMensual,usuariosTotal,productosStock) {
    const metricas = obtenerMetricas()
    renderizarCards(pedidosHoy,ingresosMensual,usuariosTotal,productosStock,metricas)
}

function renderizarCards(pedidosHoy,ingresosMensual,usuariosTotal,productosStock,metricas) {
    pedidosHoy.textContent = metricas.pedidosHoy
    ingresosMensual.textContent = `$${metricas.ingresosMes}`
    usuariosTotal.textContent = metricas.usuarios
    productosStock.textContent = metricas.productos
}

/*----------------------------------------- */

export function renderizarPedidosRecientes(tablaPedidos) {
    const pedidos = obtenerPedidosRecientes();

    tablaPedidos.innerHTML = "";

    pedidos.forEach(pedido => {
        tablaPedidos.appendChild(crearFila(pedido));
    });
}

function crearFila(pedido) {
    const tr = document.createElement("tr");

    tr.classList.add("align-middle","border-bottom");

    tr.append(
        crearCeldaNombre(pedido.usuario.nombre, pedido.usuario.apellido, pedido.codigo),
        crearCeldaMonto(pedido.monto),
        crearCeldaEstado(pedido.estado)
    );

    return tr;
}

function crearCeldaNombre(nombre, apellido, codigo) {
    const td = document.createElement("td");
    td.style.width = "45%";

    const h6 = document.createElement("h6");
    h6.classList.add("fw-bold", "mb-1");
    h6.textContent = `#${codigo}`;

    const small = document.createElement("small");
    small.classList.add("text-muted");
    small.textContent = `${nombre} ${apellido}`;

    td.append(h6, small);

    return td;
}

function crearCeldaMonto(monto) {
    const td = document.createElement("td");
    td.style.width = "25%";
    td.classList.add("fw-semibold", "text-center");
    td.textContent = `$${monto.toLocaleString("es-AR")}`;

    return td;
}

function crearCeldaEstado(estado) {
    const td = document.createElement("td");
    td.style.width = "30%";
    td.classList.add("text-end");

    const span = document.createElement("span");
    span.classList.add("badge","rounded-pill","px-3","py-2","p-2","bg-success");
    span.textContent = estado;

    td.append(span);

    return td;
}

/*-------------------------------------------- */
export function renderizarStockBajo(listaStock) {
    const productos = obtenerProductosStockBajo();

    listaStock.innerHTML = "";

    productos.forEach(producto => {
        listaStock.appendChild(crearProductoStock(producto));
    });
}

function crearProductoStock(producto) {
    const col = document.createElement("div");
    col.classList.add("col", "mb-3");

    col.append(
        crearCabeceraProducto(producto),
        crearCategoria(producto.categoria),
        crearBarraStock(producto)
    );

    return col;
}

function crearCabeceraProducto(producto) {
    const contenedor = document.createElement("div");
    contenedor.classList.add("d-flex");

    const nombre = document.createElement("h6");
    nombre.classList.add("mb-0");
    nombre.textContent = producto.nombre;

    const stock = document.createElement("p");
    stock.classList.add("text-danger", "ms-auto", "mb-0");
    stock.textContent = `${producto.stock} u.`;

    contenedor.append(nombre, stock);

    return contenedor;
}

function crearCategoria(categoria) {
    const p = document.createElement("p");
    p.classList.add("text-muted", "mb-1");
    p.textContent = categoria;

    return p;
}

function crearBarraStock(producto) {
    const porcentaje = calcularPorcentajeStock(producto);

    const fondo = document.createElement("div");
    fondo.classList.add("stock-bar-bg", "mb-2");

    const barra = document.createElement("div");
    barra.classList.add("stock-bar");
    barra.style.width = `${porcentaje}%`;

    fondo.appendChild(barra);

    return fondo;
}

function calcularPorcentajeStock(producto) {
    return Math.min(
        (producto.stock / producto.stockMinimo) * 100,
        100
    );
}