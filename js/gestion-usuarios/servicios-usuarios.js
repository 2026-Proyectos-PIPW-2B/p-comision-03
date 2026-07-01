import { obtenerLocalStorage, guardarLocalStorage } from '../core/localStorage.js'


export function obtenerUsuariosPendientes(){
    return obtenerLocalStorage("usuariospendientes")
}

function hoy() {
  return new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function obtenerUsuariosFinales(){
    return obtenerLocalStorage("usuariosfinales")
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

    const usuarios = obtenerUsuariosPendientes()
    usuarios.push(nuevoUsuario)
    guardarLocalStorage(usuarios, "usuariospendientes")
}

export function eliminarUsuarioFinal(indice) {
  let usuarios = obtenerUsuariosFinales();

  if (!usuarios[indice] || usuarios[indice].rol === "admin") {
    return; // nunca eliminar el admin
  }

  usuarios.splice(indice, 1);
  guardarLocalStorage(usuarios, "usuariosfinales");
}

export function toggleHabilitado(indice, estado) {
    console.log("estoy en toogle")
    let usuarios =obtenerUsuariosFinales();

    if (!usuarios[indice]) {
        return;
    }
     if (usuarios[indice].rol === "admin") {
        return;
    }

    usuarios[indice].habilitado = estado;

    guardarLocalStorage(usuarios, "usuariosfinales");
}

export function aceptarUsuario(indice){
    let pendientes = obtenerLocalStorage("usuariospendientes") || [];
    let finales = obtenerLocalStorage("usuariosfinales") || [];

    let usuario = pendientes.splice(indice, 1)[0];
    if (!usuario) {
        return;
    }
    usuario.alta = hoy();
    usuario.estado = "aprobado";
    usuario.habilitado = true;
    usuario.rol = "cliente";
    if (!finales.some(u => u.email === usuario.email)) {
    finales.push(usuario);
    }
    guardarLocalStorage(pendientes, "usuariospendientes");
    guardarLocalStorage(finales, "usuariosfinales");
    
}

export function eliminarUsuario(indice) {
    let pendientes = obtenerLocalStorage("usuariospendientes") || [];

    if (!pendientes[indice]) {
        return;
    }

    pendientes.splice(indice, 1);

    guardarLocalStorage(pendientes, "usuariospendientes");
}
