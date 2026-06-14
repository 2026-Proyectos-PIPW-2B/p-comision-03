export function obtenerLocalStorage(bd){
    const bd_actual = localStorage.getItem(bd)
    let resultado

    if (bd_actual) {
        resultado = JSON.parse(bd_actual)
    } else {
        resultado = []
    }

    return resultado
}

export function guardarLocalStorage(bd_actual, bd){
    localStorage.setItem(bd, JSON.stringify(bd_actual))
