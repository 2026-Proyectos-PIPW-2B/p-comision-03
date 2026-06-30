import { obtenerConfiguracion } from "../configuracion/servicios-configuracion-admin.js";
import { obtenerCategorias,crearCategoria } from "../gestion-categorias/servicios-categorias.js"
import { obtenerProductos,crearProductoExtendido,crearProducto } from "../gestion-productos/servicios-productos.js"
import { obtenerUsuariosFinales, obtenerUsuariosPendientes } from "../gestion-usuarios/servicios-usuarios.js"
import { obtenerUsuarioActual,cerrarSesion } from "../gestion-usuarios/sesion.js";
import { guardarLocalStorage } from "./localStorage.js";
import { renderizarUsuario } from "./reenderizado-usuario.js";
import { formatPrecio } from '../gestion-pedidos/util-pedidos.js';

const ADMIN = {
    nombre: "Sistema",
    apellido: "Admin",
    email: "admin@sistema.com",
    password: "Admin1234",
    rol: "admin",
    alta: "01/01/2024",
    habilitado: true,
};
const UsuarioFinal = {
    nombre: "Usuario",
    apellido: "Final",
    email: "final@user.com",
    password: "Final1234",
    rol: "cliente",
    alta: "01/07/2026",
    habilitado: true,
};

const UsuarioPendiente = {
    nombre: "Usuario",
    apellido: "Pendiente",
    email: "pendiente@user.com",
    password: "Pendiente1234",
    edad: 123,  
    estado: "pendiente"
};


export function inicializarSistema(){
    inicializarAdmin()
    inicalizarCategorias()
    inicializarConfiguracion()
    inicializarProductos()
    crearUsuarios()
}

function inicializarConfiguracion(){
    if(obtenerConfiguracion().length===0){
        const config={
            sesion:{ 
                tiempoSesion : 30,
                cierreAuto: true
            },
            listado:{
                itemsPagina: 10,
                montoMinimo:5000,
            },
            stock:{
                bajo:5,
                medio:25
            }
        }
        guardarLocalStorage(config, "configuracion")
    }
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

    const iniciales = obtenerIniciales(usuario.nombre, usuario.apellido);
    renderizarUsuario(usuario,contenedor)
}

export function obtenerIniciales(nombre, apellido) {
    return (nombre[0] + apellido[0]).toUpperCase();
}

export function MenuLateralAdmin() {
    const menuBtn = document.getElementById("menuBtn");
    const overlay = document.getElementById("overlay");

    if (!menuBtn) return;

    function isMobile() {
        return window.innerWidth < 992;
    }

    function actualizarLayout() {
        if (isMobile()) {
            document.body.classList.add("collapsed");
        } else {
            document.body.classList.remove("collapsed");
        }
    }

    menuBtn.addEventListener("click", () => {
        document.body.classList.toggle("collapsed");
    });

    if (overlay) {
        overlay.addEventListener("click", () => {
            document.body.classList.add("collapsed");
        });
    }

    window.addEventListener("resize", actualizarLayout);

    actualizarLayout();
}


function obtenerResultadosBusqueda(texto){
    const termino = (texto || "").trim().toLowerCase();
    if (!termino) return { termino, usuariosMatch: [], productosMatch: [] };
 
    const usuariosMatch = obtenerUsuariosFinales().filter(u =>
        (u.nombre && u.nombre.toLowerCase().includes(termino)) ||
        (u.apellido && u.apellido.toLowerCase().includes(termino)) ||
        (u.email && u.email.toLowerCase().includes(termino))
    );
 
    const productosMatch = obtenerProductos().filter(p =>
        (p.nombre && p.nombre.toLowerCase().includes(termino)) ||
        (p.categoria && p.categoria.toLowerCase().includes(termino))
    );
 
    return { termino, usuariosMatch, productosMatch };
}

export function buscarGlobal(texto){
    const { termino, usuariosMatch, productosMatch } = obtenerResultadosBusqueda(texto);
    if (!termino) return;
 
    localStorage.setItem("busquedaGlobal", termino);
 
    if (usuariosMatch.length > 0) {
        window.location.href = "usuarios-admin.html";
        return;
    }
 
    if (productosMatch.length > 0) {
        window.location.href = "productos-admin.html";
        return;
    }
 
    window.location.href = "usuarios-admin.html";
}

export function previsualizarBusquedaGlobal(texto, dropdown) {
    if (!dropdown) return;

    const { termino, usuariosMatch, productosMatch } = obtenerResultadosBusqueda(texto);

    if (!termino) {
        dropdown.style.display = "none";
        dropdown.innerHTML = "";
        return;
    }

    const MAX_ITEMS = 5;
    dropdown.innerHTML = ""; 

    if (usuariosMatch.length === 0 && productosMatch.length === 0) {
        const span = document.createElement("span");
        span.classList.add("list-group-item", "text-muted", "small");
        span.textContent = `Sin resultados para "${termino}"`;
        dropdown.appendChild(span); 

    } else {
        if (usuariosMatch.length > 0) {
            const titulo = document.createElement("span");
            titulo.classList.add("list-group-item", "disabled", "text-uppercase", "small", "text-muted", "py-1");
            titulo.textContent = "Usuarios";
            dropdown.appendChild(titulo);

            usuariosMatch.slice(0, MAX_ITEMS).forEach(u => {
                const a = document.createElement("a");
                a.href = "usuarios-admin.html";
                a.classList.add("list-group-item", "list-group-item-action", "py-2");
                a.dataset.busqueda = termino;

                const icono = document.createElement("i");
                icono.classList.add("fa-solid", "fa-user", "fa-fw", "text-muted", "me-2");

                const nombre = document.createElement("strong");
                nombre.textContent = `${u.nombre} ${u.apellido}`;

                const email = document.createElement("small");
                email.classList.add("text-muted", "d-block");
                email.textContent = u.email;

                a.append(icono, nombre, email);

                a.addEventListener("click", (e) => {
                    e.preventDefault();
                    localStorage.setItem("busquedaGlobal", a.dataset.busqueda);
                    window.location.href = a.href;
                });

                dropdown.appendChild(a);
            });
        }

        if (productosMatch.length > 0) {
            const titulo = document.createElement("span");
            titulo.classList.add("list-group-item", "disabled", "text-uppercase", "small", "text-muted", "py-1");
            titulo.textContent = "Productos";
            dropdown.appendChild(titulo);

            productosMatch.slice(0, MAX_ITEMS).forEach(p => {
                const a = document.createElement("a");
                a.href = "productos-admin.html";
                a.classList.add("list-group-item", "list-group-item-action", "py-2");
                a.dataset.busqueda = termino;

                const icono = document.createElement("i");
                icono.classList.add("fa-solid", "fa-box", "fa-fw", "text-muted", "me-2");

                const nombre = document.createElement("strong");
                nombre.textContent = p.nombre;

                const categoria = document.createElement("small");
                categoria.classList.add("text-muted", "d-block");
                categoria.textContent = p.categoria;

                a.append(icono, nombre, categoria);

                a.addEventListener("click", (e) => {
                    e.preventDefault();
                    localStorage.setItem("busquedaGlobal", a.dataset.busqueda);
                    window.location.href = a.href;
                });

                dropdown.appendChild(a);
            });
        }
    }

    dropdown.style.display = "block";
}

function crearUsuarios(){
    const final=obtenerUsuariosFinales()
    const pendiente=obtenerUsuariosPendientes()
    if(final.length===1){
        final.push(UsuarioFinal)
        guardarLocalStorage(final,"usuariosfinales")
    }
    if(pendiente.length===0){
        pendiente.push(UsuarioPendiente)
        guardarLocalStorage(pendiente,"usuariospendientes")
    }
}

export function visualizarMontoMinimo(){
    const span=document.getElementById("envioGratis")
    span.textContent=`${formatPrecio(obtenerConfiguracion().listado.montoMinimo)}`
}