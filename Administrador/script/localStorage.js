export function obtenerCategorias(){
    const categorias = localStorage.getItem("bd-categorias")
    let resultado

    if (categorias) {
        resultado = JSON.parse(categorias)
    } else {
        resultado = []
    }

    return resultado
}

export function guardarCategorias(categorias){
    localStorage.setItem("bd-categoria", JSON.stringify(categorias))
}
