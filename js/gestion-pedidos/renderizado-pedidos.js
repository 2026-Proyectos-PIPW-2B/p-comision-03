import { abrirModalPedido } from "./modal-pedidos.js";
import { obtenerPedidos,cambiarEstadoPedido } from "./servicios-pedidos.js";

const lista = document.getElementById("lista-ped");

export function renderizarTabla(pedidos) {
    lista.innerHTML = "";

    if (pedidos.length === 0) {
        lista.appendChild(tablaVacia())
        return;
    }

    pedidos.forEach(pedido => {
        lista.appendChild(crearFila(pedido));
    });
}

function tablaVacia(){
    const tr=document.createElement("tr")
    const td=document.createElement("td")
    td.colSpan=7;
    td.classList.add("text-muted","text-center","py-3")
    td.textContent="No se encontraron pedidos."
    tr.appendChild(td);

    return tr
}

function crearFila(pedido){
    const fila = document.createElement("tr")

    const tdCodigo= crearCeldaStrong(`#${pedido.codigo}`)
    const tdNombre = crearCelda(pedido.usuario.nombre +" "+ pedido.usuario.apellido)
    const tdFecha = crearCeldaMuted(pedido.fecha)
    const tdItems= crearCelda(pedido.items)
    const tdMonto = crearCeldaStrong(`$${pedido.monto}`)
    const tdEstado = crearCeldaEstado(pedido)
    const tdAcciones = crearCeldaAcciones(pedido.codigo);
    
    fila.append(tdCodigo, tdNombre,tdFecha, tdItems, tdMonto,tdEstado, tdAcciones)

    return fila
}

function crearCeldaStrong(mensaje){
    const td = document.createElement("td")

    const div=document.createElement("div")
    div.classList.add("d-flex", "align-items-center", "gap-2")
    
    const msjDiv= document.createElement("strong")
    msjDiv.textContent=mensaje

    div.appendChild(msjDiv)
    td.appendChild(div)

    return td
}

function crearCelda(mensaje){
    const td = document.createElement("td")
    td.textContent=mensaje
    return td
}

function crearCeldaMuted(mensaje){
    const td = document.createElement("td")
    td.classList.add("text-muted")
    td.textContent=mensaje
    return td
}

function crearCeldaEstado(pedido) {
    const td = document.createElement("td");
    td.classList.add("align-middle");

    const dropdown = crearDropdownEstado(pedido);
    dropdown.classList.add("d-inline-block");

    td.appendChild(dropdown);

    return td;
}

function crearDropdownEstado(pedido) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown", "d-inline-block");

    const boton = document.createElement("button");
    boton.classList.add( "btn","btn-sm","dropdown-toggle","rounded-pill","border-0" );

    boton.setAttribute("data-bs-toggle", "dropdown");
    boton.setAttribute("aria-expanded", "false");

    aplicarClaseEstado(boton, pedido.estado);

    boton.textContent = pedido.estado;

    const menu = document.createElement("ul");
    menu.classList.add("dropdown-menu");

    ["confirmado", "enviado", "en preparacion"].forEach(estado => {

        const li = document.createElement("li");

        const opcion = document.createElement("button");
        opcion.classList.add("dropdown-item");
        opcion.textContent = estado;

        opcion.addEventListener("click", () => {

            cambiarEstadoPedido(pedido.codigo, estado);

            pedido.estado = estado;

            boton.textContent = estado;

            boton.classList.remove(
                "pedidoConfirmado",
                "pedidoEnviado",
                "pedidoPreparacion"
            );

            aplicarClaseEstado(boton, estado);
        });

        li.appendChild(opcion);
        menu.appendChild(li);
    });

    dropdown.append(boton, menu);

    return dropdown;
}

export function aplicarClaseEstado(elemento, estado) {

    switch (estado.trim()) {

        case "confirmado":
            elemento.classList.add("pedidoConfirmado");
            break;

        case "enviado":
            elemento.classList.add("pedidoEnviado");
            break;

        case "en preparacion":
            elemento.classList.add("pedidoPreparacion");
            break;
    }
}

function crearCeldaAcciones(codigo){
    const td = document.createElement("td")
    const btn_verMas=crearBotonVerMas(codigo)
    
    td.appendChild(btn_verMas)
    return td
}

function crearBotonVerMas(codigo){
    const btn = document.createElement("button");

    btn.classList.add("btn","btn-sm","btn-ver");

    btn.dataset.codigo = codigo;

    btn.innerHTML = `<i class="bi bi-eye me-1"></i>Ver más`;

    btn.addEventListener("click", () => {
        const pedido = obtenerPedidos().find(
            pedido => pedido.codigo === codigo
        );

        abrirModalPedido(pedido);
    });

    return btn;
}

