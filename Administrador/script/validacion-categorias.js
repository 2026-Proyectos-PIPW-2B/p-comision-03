let validaciones = []

function validarCamposNuevaCategoria(input_nombre,divError_nombre, input_descripcion, divError_descripcion){
    validarNombre(input_nombre,divError_nombre)
    validarDescripcion(input_descripcion,divError_descripcion)
    
    return validaciones
}

function validarNombre(input,divError) {
    let validacion

    if (validator.isEmpty(input.value.trim())) {

        validacion = {
            id: input,
            div: divError,
            mensaje: "Debe indicar un nombre para la categoria.",
            formulario: false
        }

    } else if (input.value.trim().length < 3) {

        validacion = {
            id: input,
            div: divError,
            mensaje: "Debe ingresar al menos 3 caracteres.",
            formulario: false
        }

    } else {

        validacion = {
            id: input,
            div: "",
            mensaje: "",
            formulario: true
        }
    }

    validaciones.push(validacion)
}

function validarDescripcion(input,divError) {

    let validacion

    if (validator.isEmpty(input.value.trim())) {

        validacion = {
            id: input,
            div: divError,
            mensaje: "Debe ingresar una descripcion.",
            formulario: false
        }

    } else {

        validacion = {
            id: input,
            div: "",
            mensaje: "",
            formulario: true
        }
    }

    validaciones.push(validacion)
}

function mostrarMensaje() {
    let form
    for (let i = 0; i < validaciones.length; i++) {

        const val = validaciones[i]
        form=val.formulario
        if (form) {
            mostrarExito(val.id)
        } else {
            mostrarError(val.id, val.div, val.mensaje)
        }
    }
}

function mostrarError(input, idDivError, mensaje) {

    input.classList.remove("is-valid")
    input.classList.add("is-invalid")

    document.getElementById(idDivError).textContent = mensaje
}

function mostrarExito(input) {

    input.classList.remove("is-invalid")
    input.classList.add("is-valid")
}

export function mostrarMensajeExito(){
    const mensaje = document.getElementById("correcto");

    mensaje.textContent = "Categoría cargada con éxito";
    mensaje.classList.add("mostrar");

    setTimeout(() => {
        mensaje.classList.remove("mostrar");
    }, 2000); 
}

export function limpiarEstados() {
    const inputs = document.querySelectorAll(".form-control")
    document.getElementById("correcto").textContent = ""

    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}

export function datosValidos(input_nombre,divError_nombre,input_descripcion,divError_descripcion){
    validaciones = []
    validarCamposNuevaCategoria(input_nombre,divError_nombre,input_descripcion,divError_descripcion)
    mostrarMensaje()
    let formValido=true
    for(let i = 0; i < validaciones.length; i++) 
        formValido=formValido && validaciones[i].formulario
    return formValido
}