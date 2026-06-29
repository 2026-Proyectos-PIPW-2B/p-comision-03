export function crearPaginador({data,paginaActual,porPagina}) {
    const totalPaginas = Math.ceil(data.length / porPagina);

    function obtenerPagina(n = paginaActual) {
        const inicio = (n - 1) * porPagina;
        return data.slice(inicio, inicio + porPagina);
    }

    return {
        totalPaginas,
        obtenerPagina
    };
}