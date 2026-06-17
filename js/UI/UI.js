export function limpiarEstados() {
    const inputs = document.querySelectorAll(".form-control, .form-select")

    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}

function mostrarError(input, divError, mensaje) {
    const div=document.getElementById(divError)
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    div.textContent = mensaje
}

function mostrarExito(input) {
    input.classList.remove("is-invalid")
    input.classList.add("is-valid")
}

export function aplicarResultados(validaciones) {
    for (const val of validaciones) {
        if (val.formulario) {
            mostrarExito(val.id)
        } else {
            mostrarError(val.id, val.div, val.mensaje)
        }
    }
}