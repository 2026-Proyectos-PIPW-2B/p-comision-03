import { obtenerIniciales } from "../core/inicializacion.js";
import { obtenerLocalStorage,guardarLocalStorage } from "../core/localStorage.js";

/**Devuelve el usuario logueado actualmente, o null si no hay sesión iniciada.**/
export function obtenerUsuarioActual() {
  const usuario =obtenerLocalStorage("usuarioActual");
   if (!usuario || Array.isArray(usuario) || !usuario.email) {
    return null;
  }
  return usuario;
}
 
/** Guarda el usuario logueado en la sesión.**/
export function iniciarSesionUsuario(usuario) {
  guardarLocalStorage(usuario, "usuarioActual");
  localStorage.setItem("loginTime", Date.now());
}
 
/**Cierra la sesión actual y redirige al login. */
export function cerrarSesion() {
  localStorage.removeItem("usuarioActual");
  window.location.href = "login.html";
}
export function protegerPagina(rolRequerido = null) {
  const usuario = obtenerUsuarioActual();
  if (!usuario) {
    window.location.href = "login.html";
    return null;
  }
 
  if (!usuario.habilitado) {
    localStorage.removeItem("usuarioActual");
    alert("Tu perfil fue deshabilitado por el administrador.");
    window.location.href = "login.html";
    return null;
  }
 
  if (rolRequerido && usuario.rol !== rolRequerido) {
    // Lo mando a la página que le corresponde según su propio rol
    if (usuario.rol === "admin") {
        window.location.href = "dashboard-admin.html"
    } else {
        window.location.href = "index.html"
    }
    return null
}
 
  return usuario;
}
export function actualizarNav() {
  const usuario = obtenerUsuarioActual();
  const haySesion = !!usuario;
  // Se buscan acá adentro, frescos, cada vez que se llama a la función.
  const navLogin = document.getElementById("navLogin");
  const navPerfil = document.getElementById("navPerfil");
  const navCarrito = document.getElementById("navCarrito");
  const navCerrarSesion = document.getElementById("navCerrarSesion");
 
  if (navLogin){
     navLogin.classList.toggle("d-none", haySesion);
    }
  if (navPerfil){
     navPerfil.classList.toggle("d-none", !haySesion);
  }
  if (navCarrito){ 
    navCarrito.classList.toggle("d-none", !haySesion);
  }
  if (navCerrarSesion){ 
    navCerrarSesion.classList.toggle("d-none", !haySesion);
  }
 
  if (haySesion && navPerfil) {
    navPerfil.classList.add("av-circle", "estiloIcono");
    navPerfil.textContent = obtenerIniciales(usuario.nombre, usuario.apellido);
  }
 
  if (navCerrarSesion) {
    navCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  }}


export function verificarExpiracion() {

    const configuracion = obtenerLocalStorage("configuracion");

    if (!configuracion.sesion.cierreAuto) return;

    const loginTime = Number(localStorage.getItem("loginTime"));

    const limite = configuracion.sesion.tiempoSesion * 60 * 1000;

    if (!loginTime || Date.now() - loginTime > limite) {
        localStorage.removeItem("usuarioActual");
        localStorage.removeItem("loginTime");
        window.location.href = "login.html";
    }
}