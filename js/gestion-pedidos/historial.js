import { actualizarNav, protegerPagina, obtenerUsuarioActual } from '../gestion-usuarios/sesion.js'
import { obtenerPedidos } from './servicios-pedidos.js'
import { actualizarBadgeCarrito } from '../carrito/nav-carrito.js'
import { renderPedidos } from './renderizado-historial-usuario.js'
import { parseFecha } from './util-pedidos.js'

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

function limpiarFiltros() {
    document.getElementById("filtroDesde").value = ""
    document.getElementById("filtroHasta").value = ""
    document.getElementById("filtroMontoMin").value = ""
    document.getElementById("filtroMontoMax").value = ""

    pedidosFiltrados = [...pedidos]
    paginaActual = 1
    actualizarSubtitulo()
    render()
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
/*-------------------------------------------------- */
function cargarHistorial() {
    const usuario = obtenerUsuarioActual();
    pedidos = obtenerPedidos().filter(
    p => p.usuario.email === usuario.email
);
    pedidosFiltrados = [...pedidos];

    paginaActual = 1;
    render();
}

function render() {
    renderPedidos({
        pedidos: pedidosFiltrados,
        paginaActual,
        porPagina: PEDIDOS_POR_PAGINA,
        onPaginaChange: cambiarPagina
    });

    actualizarSubtitulo();
}

function cambiarPagina(n) {
    const total = Math.ceil(pedidosFiltrados.length / PEDIDOS_POR_PAGINA);

    if (n < 1 || n > total) return;

    paginaActual = n;
    render();
}

function aplicarFiltros() {
    const desde = document.getElementById("filtroDesde").value;
    const hasta = document.getElementById("filtroHasta").value;
    const montoMin = Number(document.getElementById("filtroMontoMin").value) || 0;
    const montoMax = Number(document.getElementById("filtroMontoMax").value) || Infinity;

    pedidosFiltrados = pedidos.filter(p => {
        const fecha = parseFecha(p.fecha);

        const fechaDesde = desde ? new Date(desde + "T00:00:00") : null;
        const fechaHasta = hasta ? new Date(hasta + "T23:59:59") : null;

        const total = p.monto

        if (desde && fecha < new Date(desde + "T00:00:00")) return false;
        if (hasta && fecha > new Date(hasta + "T23:59:59")) return false;
        if (total < montoMin) return false;
        if (total > montoMax) return false;

        return true;
    });
    paginaActual = 1;
    render();
}

/*------------------------------------------- */


export function renderPaginacion({
    total,
    paginaActual,
    porPagina,
    onPaginaChange
}) {
    const totalPaginas = Math.ceil(total / porPagina);
    const pag = document.getElementById("paginacion");

    pag.innerHTML = "";

    if (totalPaginas <= 1) return;

    const crearBtn = (label, disabled, action, active = false) => {
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-sm", "btn-pag");
        btn.textContent = label;
        if (active) btn.classList.add("btn-pag-activo");
        btn.disabled = disabled;
        btn.addEventListener("click", action);
        return btn;
    };

    pag.appendChild(
        crearBtn("‹", paginaActual === 1, () =>
            onPaginaChange(paginaActual - 1)
        )
    );

    for (let i = 1; i <= totalPaginas; i++) {
        pag.appendChild(
            crearBtn(i, false, () => onPaginaChange(i), i === paginaActual)
        );
    }

    pag.appendChild(
        crearBtn("›", paginaActual === totalPaginas, () =>
            onPaginaChange(paginaActual + 1)
        )
    );
}