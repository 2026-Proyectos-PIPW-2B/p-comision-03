import {aplicarResultados} from '../UI/UI.js'

let validaciones = []

// ── validadores individuales ───────────────────────────────
function validarNombre(input, divError, name) {
    let validacion
    if (input.value.trim() === "" ) {
        validacion = { id: input, div: divError, mensaje: `Debe indicar un ${name}`, formulario: false }
    } else if (input.value.trim().length < 3  || input.value.trim().length > 30) {
        validacion = { id: input, div: divError, mensaje: "Debe contener entre 3 y 30 caracteres", formulario: false }
    } else {
        validacion = { id: input, div: "", mensaje: "", formulario: true }
    }
    validaciones.push(validacion)
}

function validarDescripcion(input,divError) {
    let validacion
    if (input.value.trim() === "") 
        validacion = { id: input, div: divError, mensaje: "Debe ingresar una descripcion.", formulario: false}
     else 
        validacion = { id: input, div: "", mensaje: "", formulario: true}

    validaciones.push(validacion)
}

function validarCategoria(input,divError){
    let validacion

    if (input.value==="") 
        validacion = { id: input, div: divError, mensaje: "Debe seleccionar una categoría.", formulario: false}
    else
        validacion = { id: input, div: "", mensaje: "", formulario: true}

    validaciones.push(validacion)
}

function validarPrecio(input, divError){
    let validacion

    if (Number(input.value)<=0) 
        validacion = { id: input, div: divError, mensaje: "El precio debe superar los $0.", formulario: false}
    else
        validacion = { id: input, div: "", mensaje: "", formulario: true}

    validaciones.push(validacion)
}

function validarStock(input, divError){
    let validacion

    if (Number(input.value)<0) 
        validacion = { id: input, div: divError, mensaje: "El stock no puede ser negativo.", formulario: false }
    else
        validacion = { id: input, div: "", mensaje: "", formulario: true}

    validaciones.push(validacion)
}

function validarStockMinimo(input, divError){
    let validacion

    if (Number(input.value)<=0 ) 
        validacion = { id: input, div: divError, mensaje: "El stock mínimo debe ser mayor a 0.", formulario: false}
    else
        validacion = { id: input, div: "", mensaje: "", formulario: true}

    validaciones.push(validacion)
}

function validarEmail(input,divError){
    let validacion
     if (!validator.isEmail(email.value.trim()))
        validacion = { id: input, div: divError, mensaje: "El email no es válido", formulario: false}
    else
        validacion = { id: input, div: "", mensaje: "", formulario: true}
    
    validaciones.push(validacion)
}

function validarEdad(input, divError){
    let validacion

    if (Number(input.value)<18) 
        validacion = { id: input, div: divError, mensaje: "Tenés que ser mayor de 18 años", formulario: false}
    else
        validacion = { id: input, div: "", mensaje: "", formulario: true}

    validaciones.push(validacion)
}

function validarPassword(input_pass, divError_pass ,input_repass, divError_repass){
    let validacionPass
    let validacionRePass

    if (input_pass.value !== input_repass.value || input_pass.value === "") {
        validacionPass= { id: input_pass, div:divError_pass, mensaje: "Las contraseñas no coinciden", formulario: false}
        validacionRePass = { id: input_repass, div: divError_repass, mensaje: "Las contraseñas no coinciden", formulario: false}
    }
    else{
        validacionPass = { id: input_pass, div: "", mensaje: "", formulario: true}
        validacionRePass = { id: input_pass, div: "", mensaje: "", formulario: true}
    }

    validaciones.push(validacionPass)
    validaciones.push(validacionRePass)
}

// ── exports ────────────────────────────────────────────────
export function validarImagen(nombreImagen, divError, imagenExistente = false) {
    const div = document.getElementById(divError);

    if (!nombreImagen && !imagenExistente) {
        div.textContent = "Debe seleccionar una imagen.";
        div.classList.remove("d-none");
        return false;
    }

    div.textContent = "";
    div.classList.add("d-none");

    return true;
}

export function datosCategoriasValidos(input_nombre, divError_nombre, input_descripcion, divError_descripcion) {
    validaciones = []
    validarNombre(input_nombre, divError_nombre, "nombre")
    validarDescripcion(input_descripcion, divError_descripcion)
    aplicarResultados(validaciones)
    return validaciones.every(v => v.formulario)
}

export function datosProductoValidosExtendido(campos) {
    validaciones = []
    validarNombre(campos.nombre.input, campos.nombre.error)
    validarDescripcion(campos.descripcion.input, campos.descripcion.error)
    validarCategoria(campos.categoria.input, campos.categoria.error)
    validarPrecio(campos.precio.input, campos.precio.error)
    validarStock(campos.stock.input, campos.stock.error)
    validarStockMinimo(campos.stockMinimo.input, campos.stockMinimo.error)
    aplicarResultados(validaciones)
    return validaciones.every(v => v.formulario)
}

export function datosProductoValidos(campos){
    validaciones = []
    validarNombre(campos.nombre.input, campos.nombre.error)
    validarDescripcion(campos.descripcion.input, campos.descripcion.error)
    validarCategoria(campos.categoria.input, campos.categoria.error)
    validarPrecio(campos.precio.input, campos.precio.error)
    validarStock(campos.stock.input, campos.stock.error)
    aplicarResultados(validaciones)
    return validaciones.every(v => v.formulario)
}

export function datosUsuariosValidos(campos) {
    validaciones = []

    validarNombre(campos.nombre.input, campos.nombre.error, "nombre")
    validarNombre(campos.apellido.input, campos.apellido.error, "apellido")
    validarEmail(campos.email.input, campos.email.error)
    validarEdad(campos.edad.input, campos.edad.error)
    validarPassword(campos.password.input, campos.password.error, campos.repassword.input, campos.repassword.error )
    aplicarResultados(validaciones)
    return validaciones.every(v => v.formulario)
}

