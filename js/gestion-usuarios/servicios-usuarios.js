import { obtenerLocalStorage, guardarLocalStorage } from '../core/localStorage.js'

export function obtenerUsuarios(){
    return obtenerLocalStorage("usuariospendientes")
}

export function  guardarUsuario(nombre,apellido,email,edad,password,estado){
    const nuevoUsuario = {
        nombre: nombre.value.trim(),
        apellido: apellido.value.trim(),
        email: email.value.trim(),
        edad: Number(edad.value),
        password: password.value,
        estado: estado,
    }

    const usuarios = obtenerUsuarios()
    usuarios.push(nuevoUsuario)
    guardarLocalStorage(usuarios, "usuariospendientes")
}