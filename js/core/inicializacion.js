import { obtenerCategorias,crearCategoria } from "../gestion-categorias/servicios-categorias.js"
import { obtenerProductos,crearProductoExtendido,crearProducto } from "../gestion-productos/servicios-productos.js"
import { obtenerUsuariosFinales } from "../gestion-usuarios/servicios-usuarios.js"
import { obtenerUsuarioActual } from "../gestion-usuarios/sesion.js";
import { guardarLocalStorage } from "./localStorage.js";
import { cerrarSesion}from "../gestion-usuarios/sesion.js";
const ADMIN = {
    nombre: "Sistema",
    apellido: "Admin",
    email: "admin@sistema.com",
    password: "Admin1234",
    rol: "admin",
    alta: "01/01/2024",
    habilitado: true,
};

export function inicializarSistema(){
    inicializarAdmin()
    inicalizarCategorias()
    inicializarProductos()
}

function inicalizarCategorias(){
    if(obtenerCategorias().length===0){
        const perros=crearCategoria("Perros","Todo lo que tu mejor amigo necesita para una vida feliz, saludable y llena de aventuras.")
        const gatos=crearCategoria("Gatos","Productos seleccionados para el bienestar, la diversión y el cuidado diario de tu felino.")
        const peces=crearCategoria("Peces","Encuentra productos para crear un ambiente saludable y atractivo para tus peces.")
        const aves=crearCategoria("Aves","Accesorios y alimentos para mantener a tus aves sanas, activas y felices.")
    }
}

function inicializarProductos(){
    if(obtenerProductos().length === 0){
        // PERROS
        crearProductoExtendido("Alimento Premium Adulto 15kg","Nutrición completa y equilibrada para perros adultos, rica en proteínas, vitaminas y minerales esenciales.","Perros",32500,9,10,true,true,"balanceado.jpg");
        crearProducto("Correa Extensible 5m","Correa resistente con sistema retráctil que brinda mayor libertad durante los paseos.","Perros",12500,18,"correa.png");
        crearProducto("Pelota Interactiva", "Juguete diseñado para estimular la actividad física y mental de tu mascota.","Perros", 4200, 15,"pelota.png");
        crearProducto("Cama Confort Mediana","Cama acolchada y suave que proporciona comodidad y descanso durante todo el día.","Perros",28000,10,"cama-perro.png");

        // GATOS
        crearProductoExtendido("Alimento Premium Gato Adulto 7kg","Fórmula balanceada que ayuda a mantener una buena salud y un pelaje brillante.","Gatos",24900,18, 8, true, true,"alimento-gato.png" );
        crearProducto("Arena Sanitaria 10kg", "Arena absorbente que controla olores y facilita la limpieza diaria.","Gatos",8500,25,"arena.png");
        crearProducto("Rascador Compacto","Ideal para el desgaste natural de las uñas y el entretenimiento de tu gato.", "Gatos", 15000, 4,"rascador.png");
        crearProducto("Ratón con Catnip","Juguete relleno con catnip que estimula el instinto de juego y caza.","Gatos",3500,40,"raton.jpg");

        // AVES
        crearProductoExtendido("Mezcla de Semillas Premium 1kg","Combinación de semillas seleccionadas para una alimentación nutritiva y equilibrada.","Aves",4500,25,6,true,false,"semillas.png");
        crearProducto("Jaula Mediana para Aves","Jaula espaciosa con perchas y bandeja removible para facilitar la limpieza.","Aves",45000,5,"jaula.png");
        crearProducto("Columpio de Madera","Accesorio recreativo que promueve la actividad y el bienestar de las aves.", "Aves",2800, 3,"columpio.png");
        crearProducto("Barra Nutritiva de Frutas","Snack elaborado con frutas y semillas que complementa la alimentación diaria.","Aves",1900,35,"barra-frutas.png");

        // PECES
        crearProductoExtendido("Pecera de Vidrio 20L","Acuario compacto ideal para principiantes y pequeños peces ornamentales.","Peces",35000,6,2,true,true,"pecera.png");
        crearProducto("Alimento en Escamas 100g","Alimento flotante de fácil digestión para peces tropicales de agua dulce.","Peces",3200,2,"escamas.png");
        crearProducto("Filtro Interno para Acuario","Sistema de filtrado que ayuda a mantener el agua limpia y oxigenada.", "Peces",12500,12,"filtro.png");
        crearProducto("Decoración Castillo Marino","Adorno decorativo que aporta refugio y atractivo visual al acuario.","Peces",7800,15,"castillo.png");
    }
}

function inicializarAdmin() {
    const finales = obtenerUsuariosFinales();
    const yaExiste = finales.some(usuario => usuario.rol === "admin");
    if (!yaExiste) {
        finales.unshift(ADMIN);
        guardarLocalStorage(finales, "usuariosfinales");
    }
}

export function inicializarUser(contenedor) {
    const usuario = obtenerUsuarioActual();
    if (!usuario) return;

    const iniciales = ini(usuario.nombre, usuario.apellido);

    const div = document.createElement("div");
    div.classList.add("d-flex", "align-items-center", "gap-2", "px-2", "py-1","div_contenedor");

    // --- DROPDOWN en el ícono ---
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const boton = document.createElement("button");
    boton.classList.add("btn", "rounded-circle", "p-0", "dropdown-toggle", "border-0", "av-circle");
    boton.setAttribute("data-bs-toggle", "dropdown");
    boton.setAttribute("aria-expanded", "false");
    boton.textContent = iniciales;

    const menu = document.createElement("ul");
    menu.classList.add("dropdown-menu", "dropdown-menu-end", "shadow", "border-0", "p-0", "mt-2","menu");

    // Header
    const liHeader = document.createElement("li");
    const header = document.createElement("div");
    header.classList.add("d-flex", "align-items-center", "gap-3", "p-3","conten");

    const iconoMenu = document.createElement("div");
   iconoMenu.classList.add("rounded-circle", "d-flex", "align-items-center", "justify-content-center", "flex-shrink-0","iconoMenu");
    iconoMenu.textContent = iniciales;

    const infoUsuario = document.createElement("div");
    const nombreEl = document.createElement("p");
    nombreEl.classList.add("mb-0", "fw-semibold","nombreEl");
    nombreEl.textContent = `${usuario.nombre} ${usuario.apellido}`;
    const emailEl = document.createElement("p");
    emailEl.classList.add("mb-0","emailEl");
    emailEl.textContent = usuario.email;
    infoUsuario.append(nombreEl, emailEl);
    header.append(iconoMenu, infoUsuario);
    liHeader.appendChild(header);

    // Divider
    const liDiv1 = document.createElement("li");
    liDiv1.innerHTML = `<hr class="dropdown-divider m-0">`;

    // Historial
    const liHistorial = document.createElement("li");
    const linkHistorial = document.createElement("a");
    linkHistorial.classList.add("dropdown-item", "d-flex", "align-items-center", "gap-2", "py-2", "px-3","link-historial");
    linkHistorial.href = "historial.html";
    linkHistorial.innerHTML = `
        <i class="bi bi-clock-history" style="color:#c05a20;font-size:16px;"></i>
        Historial de compras
        <i class="bi bi-chevron-right ms-auto" style="font-size:12px;color:#c8a98a;"></i>
    `;
    liHistorial.appendChild(linkHistorial);

    // Divider
    const liDiv2 = document.createElement("li");
    liDiv2.innerHTML = `<hr class="dropdown-divider m-0">`;

    // Cerrar sesión
    const liCerrar = document.createElement("li");
    liCerrar.classList.add("p-2");
    const btnCerrar = document.createElement("button");
    btnCerrar.classList.add("btn", "w-100", "d-flex", "align-items-center", "justify-content-center", "gap-2", "rounded-3","boton-cerrarSesion{");
    btnCerrar.innerHTML = `<i class="bi bi-box-arrow-right"></i> Cerrar sesión`;
    btnCerrar.addEventListener("click", () => cerrarSesion());
    liCerrar.appendChild(btnCerrar);

    menu.append(liHeader, liDiv1, liHistorial, liDiv2, liCerrar);
    dropdown.append(boton, menu);

    // --- Bloque nombre/rol (igual que antes) ---
    const bloque = document.createElement("div");
    bloque.classList.add("d-none", "d-sm-block", "lh-sm");
    const nombre = document.createElement("div");
    nombre.classList.add("fw-bold");
    nombre.textContent = `${usuario.nombre} ${usuario.apellido}`;
    const rol = document.createElement("div");
    rol.classList.add("text-muted");
    if (usuario.rol === "cliente") {
    rol.textContent = "Usuario"
    } else {
    rol.textContent = "Administrador"
    }
    bloque.append(nombre, rol);

    div.append(dropdown, bloque);
    contenedor.appendChild(div);
}

export function ini(nombre, apellido) {
    return (nombre[0] + apellido[0]).toUpperCase();
}
