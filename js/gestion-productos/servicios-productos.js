import { obtenerConfiguracion } from "../configuracion/servicios-configuracion-admin.js"
import { obtenerLocalStorage,guardarLocalStorage } from "../core/localStorage.js"
import { actualizarStockCategorias } from "../gestion-categorias/servicios-categorias.js"

export function obtenerProductos(){
    return obtenerLocalStorage("bd-productos")
}

export function obtenerProductoEditar(){
    return obtenerLocalStorage("productoEditar")
}

export function obtenerProductoPorId(id){
    return obtenerProductos().find(
        categoria => categoria.id === id
    )
}

export function crearProductoExtendido(inputNombre,inputDescripcion,selectCategorias,inputPrecio,inputStock,inputStockMinimo, checkPublicado, checkDestacado, imagen){
    const nuevoProducto = {
        id:           crypto.randomUUID(),
        nombre:       inputNombre.trim(),
        descripcion:  inputDescripcion.trim(),
        categoria:    selectCategorias,
        precio:       Number(inputPrecio),
        stock:        Number(inputStock),
        stockMinimo:  Number(inputStockMinimo),
        publicado:    checkPublicado,
        destacado:    checkDestacado,
        imagen:      imagen
    }
    agregarProducto(nuevoProducto)
}

export function crearProducto(inputNombre,inputDescripcion,selectCategorias,inputPrecio,inputStock,imagen){
    const nuevoProducto = {
        id:           crypto.randomUUID(),
        nombre:       inputNombre.trim(),
        descripcion:  inputDescripcion.trim(),
        categoria:    selectCategorias,
        precio:       Number(inputPrecio),
        stock:        Number(inputStock),
        stockMinimo:  obtenerConfiguracion().stock.bajo,
        publicado:    true,
        destacado:    false,
        imagen:      imagen
    }
    agregarProducto(nuevoProducto)
}

function agregarProducto(producto){
    if(obtenerProductoPorId(producto.id))
        eliminarProducto(producto.id)
    const productos = obtenerProductos()
    productos.push(producto)
    guardarLocalStorage(productos,"bd-productos")
    actualizarStockCategorias()
}

export function eliminarProducto(index){
    const productos = obtenerProductos()
    const posicion = productos.findIndex(producto => producto.id === index)
    productos.splice(posicion, 1)
    guardarLocalStorage(productos,"bd-productos")
    actualizarStockCategorias()
}

export function editarProducto(index){
    const producto = obtenerProductoPorId(index)
    
    const edicion= obtenerProductoEditar()
    edicion.push(producto)
    guardarLocalStorage(edicion,"productoEditar")
    
    window.location.href = "new-product-admin.html"
}

export function actualizarProducto(id,nombre,descripcion,categoria,precio,stock, stockMinimo, publicado,destacado, imagen){
    const actualizacionProducto = {
        id:           id,
        nombre:       nombre.trim(),
        descripcion:  descripcion.trim(),
        categoria:    categoria,
        precio:       Number(precio),
        stock:        Number(stock),
        stockMinimo:  stockMinimo,
        publicado:    publicado,
        destacado:    destacado,
        imagen:      imagen
    }
    agregarProducto(actualizacionProducto)
}
