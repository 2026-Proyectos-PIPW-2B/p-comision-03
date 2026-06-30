export function crearPaginador({ data, porPagina }) {
    let paginaActual = 1;

    function obtenerPagina() {
        const inicio = (paginaActual - 1) * porPagina;
        return data.slice(inicio, inicio + porPagina);
    }

    function cambiarPagina(n) {
        if (n < 1 || n > totalPaginas()) return false;

        paginaActual = n;
        return true;
    }

    function totalPaginas() {
        return Math.ceil(data.length / porPagina);
    }

    return {
        obtenerPagina,
        cambiarPagina,
        totalPaginas,
        get paginaActual() {
            return paginaActual;
        }
    };
}

export function renderPaginacion({
    paginador,
    onPaginaChange,
    contenedor = document.getElementById("paginacion")
}) {

    contenedor.innerHTML = "";

    const totalPaginas = paginador.totalPaginas();

    if (totalPaginas <= 1) return;

    const crearBoton = (texto, accion, deshabilitado = false, activo = false) => {
        const boton = document.createElement("button");

        boton.classList.add("btn", "btn-sm", "btn-pag");

        if (activo) {
            boton.classList.add("btn-pag-activo");
        }

        boton.textContent = texto;
        boton.disabled = deshabilitado;
        boton.addEventListener("click", accion);

        return boton;
    };

    contenedor.appendChild(
        crearBoton(
            "‹",
            () => onPaginaChange(paginador.paginaActual - 1),
            paginador.paginaActual === 1
        )
    );

    for (let i = 1; i <= totalPaginas; i++) {
        contenedor.appendChild(
            crearBoton(
                i,
                () => onPaginaChange(i),
                false,
                i === paginador.paginaActual
            )
        );
    }

    contenedor.appendChild(
        crearBoton(
            "›",
            () => onPaginaChange(paginador.paginaActual + 1),
            paginador.paginaActual === totalPaginas
        )
    );
}