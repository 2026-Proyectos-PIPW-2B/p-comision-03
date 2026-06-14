import { obtenerLocalStorage } from './localStorage.js'
import{guardarLocalStorage}from './localStorage.js'
let errorNombre=document.getElementById("errorNom")
let errorApellido=document.getElementById("errorApellido")
let errorEmail=document.getElementById("errorEmail")
let errorEdad=document.getElementById("errorEdad")
let errorPassword=document.getElementById("errorPassword")
let errorConfirmarPassword=document.getElementById("errorConfirmarPassword")
window.addEventListener("load", function(){
    inicializar()
})

function inicializar(){
    const form = document.getElementById("formRegistro")

    form.addEventListener("submit", function(event) {
        event.preventDefault()
        
        limpiarEstados()

        if (datosValidos()) {
            guardarUsuario()
            mostrarAlertaExito()
        }
    });
}
function  guardarUsuario(){
    const nuevoUsuario = {
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        email: document.getElementById("email").value.trim(),
        edad: Number(document.getElementById("edad").value),
        password: document.getElementById("password").value,
        estado: "pendiente",
    }

    const usuarios = obtenerLocalStorage("usuariospendientes")
    usuarios.push(nuevoUsuario)
    guardarLocalStorage(usuarios, "usuariospendientes")
}

function mostrarAlertaExito() {
  if (document.getElementById("overlayExito")) return;

  const overlay = document.createElement("div");
  overlay.id = "overlayExito";
  overlay.classList.add("overlay-exito");

  overlay.innerHTML = `
    <div id="toastExito" class="toast-exito">
      <div class="check-circle">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
          stroke="#16a34a" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <p class="toast-titulo">¡Registro exitoso!</p>
      <p class="toast-subtitulo">El administrador tiene que verificar tu cuenta antes de que puedas ingresar.</p>
      <div class="barra-contenedor">
        <div id="barraTiempo" class="barra-progreso"></div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("visible");
      document.getElementById("toastExito").classList.add("visible");

      const barra = document.getElementById("barraTiempo");
      barra.style.transition = "width 3.5s linear";
      barra.style.width = "0%";
    });
  });

  setTimeout(() => {
    overlay.classList.remove("visible");
    setTimeout(() => {
      overlay.remove();
      window.location.href = "index.html";
    }, 300);
  }, 3500);
}
function limpiarEstados() {
    const inputs = document.querySelectorAll(".form-control, .form-select")
    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}

function datosValidos() {
    let formularioValido = true
    let nombre = document.getElementById("nombre")
    let apellido = document.getElementById("apellido")
    let email = document.getElementById("email")
    let edad = document.getElementById("edad")
    let password = document.getElementById("password")
    let confirmarPassword = document.getElementById("ConfirmarPassword")

    if (nombre.value.trim().length < 3 || nombre.value.trim().length > 20) {
        mostrarError(nombre, "errorNombre", "El nombre tiene que tener entre 3 y 20 caracteres")
        formularioValido = false
    }
    if (apellido.value.trim().length < 3 || apellido.value.trim().length > 20) {
        mostrarError(apellido, "errorApellido", "El apellido tiene que tener entre 3 y 20 caracteres")
        formularioValido = false
    }
    if (!validator.isEmail(email.value.trim())) {
        mostrarError(email, "errorEmail", "El email no es válido")
        formularioValido = false
    }
    if (Number(edad.value) < 18) {
        mostrarError(edad, "errorEdad", "Tenés que ser mayor de 18 años")
        formularioValido = false
    }
    if (password.value !== confirmarPassword.value || password.value === "") {
        mostrarError(password, "errorPassword", "Las contraseñas no coinciden")
        mostrarError(confirmarPassword, "errorConfirmarPassword", "Las contraseñas no coinciden")
        formularioValido = false
    }

    return formularioValido
}
function mostrarError(input, idDivError, mensaje) {
    input.classList.add("is-invalid")
    document.getElementById(idDivError).textContent = mensaje
}
