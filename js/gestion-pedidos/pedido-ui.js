import { obtenerClaseEstado } from "./util-pedidos.js";

export function badgeEstado(estado) {
    const span = document.createElement("span");
    span.classList.add("badge-estado", obtenerClaseEstado(estado));
    span.textContent = estado;
    return span;
}

export function aplicarClaseEstado(el, estado) {
    el.classList.remove(
        "pedidoConfirmado",
        "pedidoEnviado",
        "pedidoPreparacion",
        "pedidoCamino"
    );

    const clase = obtenerClaseEstado(estado);
    if (clase) el.classList.add(clase);
}