import { abrirModalPedido } from "./modal-pedidos.js";
import { obtenerPedidos } from "./servicios-pedidos.js";

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
    const tdMonto = crearCeldaStrong(pedido.monto)
    const tdEstado = crearCeldaEstado(pedido.estado)
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

function crearCeldaEstado(estado){
    const td = document.createElement("td")
    const span = document.createElement("span")
    span.classList.add("badge" ,"bg-success")
    span.textContent=estado
    td.appendChild(span)
    return td
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

