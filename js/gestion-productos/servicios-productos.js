import { obtenerLocalStorage,guardarLocalStorage } from "../core/localStorage.js"

export function obtenerProductos(){
    return obtenerLocalStorage("bd-productos")
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
    const productos = obtenerProductos()
    productos.push(producto)
    guardarLocalStorage(productos,"bd-productos")
}


/*---------------------------------falta implementar--------------------------------------------- */
function eliminarProducto(){}

function editarProducto(){}