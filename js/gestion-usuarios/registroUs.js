import { obtenerUsuarios, guardarUsuario } from './servicios-usuarios.js'
import { mostrarAlertaExito } from '../UI/Alertas.js'
import { limpiarEstados } from '../UI/UI.js'
import { datosUsuariosValidos } from '../validaciones/validaciones.js'

const inputNombre       = document.getElementById("nombre")
const inputApellido     = document.getElementById("apellido")
const inputEmail        = document.getElementById("email")
const inputEdad         = document.getElementById("edad")
const inputPassword     = document.getElementById("password")
const inputRePassword   = document.getElementById("ConfirmarPassword")

const campos = {
    nombre:     { input: inputNombre,       error: "errorNombre" },
    apellido:   { input: inputApellido,     error: "errorApellido" },
    email:      { input: inputEmail,        error: "errorEmail" },
    edad:       { input: inputEdad,         error: "errorEdad" },
    password:   { input: inputPassword,     error: "errorPassword" },
    repassword: { input: inputRePassword,   error: "errorConfirmarPassword" },
}

window.addEventListener("load", function(){
    inicializar()
})

function inicializar(){
    const form = document.getElementById("formRegistro")

    form.addEventListener("submit", function(event) {
        event.preventDefault()
        
        limpiarEstados()

        if (datosUsuariosValidos(campos)) {
            guardarUsuario(nombre,apellido,email,edad,password,"pendiente")
            mostrarAlertaExito("¡Registro exitoso!","El administrador tiene que verificar tu cuenta antes de que puedas ingresar.","index.html")
        }
    });
}

