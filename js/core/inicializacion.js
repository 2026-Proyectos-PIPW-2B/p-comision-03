import { obtenerCategorias,crearCategoria } from "../gestion-categorias/servicios-categorias.js"
import { obtenerProductos,crearProductoExtendido,crearProducto } from "../gestion-productos/servicios-productos.js"
import { obtenerUsuariosFinales } from "../gestion-usuarios/servicios-usuarios.js"
import { guardarLocalStorage } from "./localStorage.js";

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
        crearProducto("Correa Extensible 5m","Correa resistente con sistema retráctil que brinda mayor libertad durante los paseos.","Perros",12500,18,"correa.jpg");
        crearProducto("Pelota Interactiva", "Juguete diseñado para estimular la actividad física y mental de tu mascota.","Perros", 4200, 15,"pelota.jpg");
        crearProducto("Cama Confort Mediana","Cama acolchada y suave que proporciona comodidad y descanso durante todo el día.","Perros",28000,10,"cama-perro.jpg");

        // GATOS
        crearProductoExtendido("Alimento Premium Gato Adulto 7kg","Fórmula balanceada que ayuda a mantener una buena salud y un pelaje brillante.","Gatos",24900,18, 8, true, true,"alimento-gato.jpg" );
        crearProducto("Arena Sanitaria 10kg", "Arena absorbente que controla olores y facilita la limpieza diaria.","Gatos",8500,25,"arena.jpg");
        crearProducto("Rascador Compacto","Ideal para el desgaste natural de las uñas y el entretenimiento de tu gato.", "Gatos", 15000, 4,"rascador.jpg");
        crearProducto("Ratón con Catnip","Juguete relleno con catnip que estimula el instinto de juego y caza.","Gatos",3500,40,"raton-catnip.jpg");

        // AVES
        crearProductoExtendido("Mezcla de Semillas Premium 1kg","Combinación de semillas seleccionadas para una alimentación nutritiva y equilibrada.","Aves",4500,25,6,true,false,"semillas.jpg");
        crearProducto("Jaula Mediana para Aves","Jaula espaciosa con perchas y bandeja removible para facilitar la limpieza.","Aves",45000,5,"jaula.jpg");
        crearProducto("Columpio de Madera","Accesorio recreativo que promueve la actividad y el bienestar de las aves.", "Aves",2800, 3,"columpio.jpg");
        crearProducto("Barra Nutritiva de Frutas","Snack elaborado con frutas y semillas que complementa la alimentación diaria.","Aves",1900,35,"barra-frutas.jpg");

        // PECES
        crearProductoExtendido("Pecera de Vidrio 20L","Acuario compacto ideal para principiantes y pequeños peces ornamentales.","Peces",35000,6,2,true,true,"pecera.jpg");
        crearProducto("Alimento en Escamas 100g","Alimento flotante de fácil digestión para peces tropicales de agua dulce.","Peces",3200,2,"escamas.jpg");
        crearProducto("Filtro Interno para Acuario","Sistema de filtrado que ayuda a mantener el agua limpia y oxigenada.", "Peces",12500,12,"filtro.jpg");
        crearProducto("Decoración Castillo Marino","Adorno decorativo que aporta refugio y atractivo visual al acuario.","Peces",7800,15,"castillo.jpg");
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