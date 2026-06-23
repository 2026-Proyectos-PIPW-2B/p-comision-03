import { obtenerLocalStorage } from '../core/localStorage.js';
import { iniciarSesionUsuario } from './sesion.js';
import { mostrarAlertaWarning, mostrarAlertaDanger } from '../UI/Alertas.js';
import { inicializarSistema } from '../core/inicializacion.js';

const inputMail = document.getElementById("mail");
const inputContra = document.getElementById("contra");
const btnLogin = document.querySelector(".btnlogin");
const errorlogin=document.getElementById("errorlogin") 

window.onload=function(){
  inicializarSistema()
  btnLogin.addEventListener("click", iniciarSesion);
}
 
function iniciarSesion() {
  errorlogin.textContent = "";
  const email = inputMail.value.trim().toLowerCase();
  const password = inputContra.value;
 
  if (!email && !password) {
    errorlogin.textContent="El Email y la contraseña no pueden estar vacios"
    return;
  }else{
    if(!email){
      errorlogin.textContent=""
      errorlogin.textContent="El email no puede ser vacio"
      return
    }else{
      if(!password){
        errorlogin.textContent=""
        errorlogin.textContent="La contraseña no puede ser vacia"
        return
      }
    }
  }
 
  const finales = obtenerLocalStorage("usuariosfinales") || [];
  const usuario = finales.find(u => u.email.toLowerCase() === email);
 
  // No existe ningún perfil aprobado con ese email -> avisa y manda a registro
  if (!usuario) {
    mostrarAlertaWarning("No tenés cuesta registrada","Te vamos a redirigir al registro","../registroUF.html")
    return;
  }
 
  // Existe el email pero la contraseña no coincide
  if (usuario.password !== password) {
    errorlogin.textContent="El email o contraseña son incorrectos."
    return;
  }
 
  // Existe, la contraseña es correcta, pero está deshabilitado
  if (!usuario.habilitado) {
    mostrarAlertaDanger("Tu cuenta esta deshabilitada","El administrador deshabilito tu cuenta por algun incumplimiento","../index.html")
    return;
  }
 
  // Login OK: guardamos la sesión y redirigimos según el rol
  iniciarSesionUsuario(usuario);
 
  if (usuario.rol === "admin") {
    window.location.href ="dashboard-admin.html";
  } else {
    window.location.href = "index.html";
  }
}