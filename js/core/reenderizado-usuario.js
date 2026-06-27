import { obtenerIniciales } from "./inicializacion.js";
import { cerrarSesion } from "../gestion-usuarios/sesion.js";

export function renderizarUsuario(usuario, contenedor) {
    if (usuario.rol === "admin") {
        contenedor.appendChild(crearUsuarioSoloTexto(usuario));
    } else {
        contenedor.appendChild(crearDropdownUsuario(usuario));
    }
}

function crearUsuarioSoloTexto(usuario) {
    const div = document.createElement("div");
    div.classList.add("d-flex","align-items-center","gap-2","px-2","py-1","div_contenedor");
    
    const avatar = document.createElement("div");
    avatar.classList.add("av-circle");
    avatar.textContent = obtenerIniciales(usuario.nombre, usuario.apellido);

    const texto = crearBloqueUsuario(usuario);

    div.append(avatar, texto);

    return div;
}

function crearDropdownUsuario(usuario) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown", "w-100");

    const trigger = crearTrigger(usuario);
    const menu = crearMenu(usuario);

    dropdown.append(trigger, menu);
    return dropdown;
}

function crearTrigger(usuario) {
    const iniciales = obtenerIniciales(usuario.nombre, usuario.apellido);

    const trigger = document.createElement("div");
    trigger.classList.add("d-flex","align-items-center","gap-2","px-2","py-1","dropdown-toggle","div_contenedor");

    trigger.setAttribute("data-bs-toggle", "dropdown");

    const avatar = document.createElement("div");
    avatar.classList.add("av-circle","align-items-center","d-flex", "text-center");
    avatar.textContent = iniciales;

    const texto = crearBloqueUsuario(usuario);

    trigger.append(avatar, texto);

    return trigger;
}

function crearBloqueUsuario(usuario) {
    const bloque = document.createElement("div");
    bloque.classList.add("d-none", "d-sm-block", "lh-sm");

    const nombre = document.createElement("div");
    nombre.classList.add("fw-bold");
    nombre.textContent = `${usuario.nombre} ${usuario.apellido}`;

    const rol = document.createElement("div");
    rol.classList.add("text-muted");
    rol.textContent =
        usuario.rol === "cliente" ? "Usuario" : "Administrador";

    bloque.append(nombre, rol);
    return bloque;
}

function crearMenu(usuario) {
    const menu = document.createElement("ul");
    menu.classList.add("dropdown-menu", "dropdown-menu-end","shadow","border-0","p-0", "mt-2","menu");

    const liHeader = crearHeader(usuario);
    const liHistorial = crearHistorial();
    const liCerrar = crearCerrarSesion();

    menu.append(liHeader, crearDivider(), liHistorial, crearDivider(), liCerrar);

    return menu;
}

function crearHeader(usuario) {
    const li = document.createElement("li");

    const header = document.createElement("div");
    header.classList.add("d-flex", "align-items-center", "gap-3", "p-3");

    const icono = document.createElement("div");
    icono.classList.add("rounded-circle","iconoMenu","d-flex","align-items-center","justify-content-center");
    icono.textContent = obtenerIniciales(usuario.nombre, usuario.apellido);
    
    const info = document.createElement("div");

    const nombre = document.createElement("p");
    nombre.classList.add("mb-0", "fw-semibold");
    nombre.textContent = `${usuario.nombre} ${usuario.apellido}`;

    const email = document.createElement("p");
    email.classList.add("mb-0");
    email.textContent = usuario.email;

    info.append(nombre, email);
    header.append(icono, info);

    li.appendChild(header);
    return li;
}

function crearHistorial() {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.classList.add("dropdown-item","d-flex","align-items-center","gap-2","py-2","px-3");
    a.href = "historial.html";

    a.innerHTML = `<i class="bi bi-clock-history" style="color:#c05a20;"></i>Historial de compras <i class="bi bi-chevron-right ms-auto" style="font-size:12px;"></i>`;

    li.appendChild(a);
    return li;
}

function crearCerrarSesion() {
    const li = document.createElement("li");
    li.classList.add("p-2");

    const btn = document.createElement("button");
    btn.classList.add("btn","w-100","d-flex","align-items-center","justify-content-center","gap-2","rounded-3");

    btn.innerHTML = `<i class="bi bi-box-arrow-right"></i> Cerrar sesión`;

    btn.addEventListener("click", cerrarSesion);

    li.appendChild(btn);
    return li;
}

function crearDivider() {
    const li = document.createElement("li");
    li.innerHTML = `<hr class="dropdown-divider m-0">`;
    return li;
}