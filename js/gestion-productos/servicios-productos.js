import { obtenerLocalStorage,guardarLocalStorage } from "../core/localStorage.js"

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
        nombre:       inputNombre.value.trim(),
        descripcion:  inputDescripcion.value.trim(),
        categoria:    selectCategorias.value,
        precio:       Number(inputPrecio.value),
        stock:        Number(inputStock.value),
        stockMinimo:  Number(inputStockMinimo.value),
        publicado:    checkPublicado.checked,
        destacado:    checkDestacado.checked,
        imagen:      imagen
    }
    agregarProducto(nuevoProducto)
}

export function crearProducto(inputNombre,inputDescripcion,selectCategorias,inputPrecio,inputStock,imagen){
    const nuevoProducto = {
        id:           crypto.randomUUID(),
        nombre:       inputNombre.value.trim(),
        descripcion:  inputDescripcion.value.trim(),
        categoria:    selectCategorias.value,
        precio:       Number(inputPrecio.value),
        stock:        Number(inputStock.value),
        stockMinimo:  5,
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
}

export function eliminarProducto(index){
    const productos = obtenerProductos()
    const productoEliminar= obtenerProductoPorId(index)
    productos.splice(productoEliminar, 1)
    guardarLocalStorage(productos,"bd-productos")
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