import { obtenerProductos,eliminarProducto,editarProducto } from "./servicios-productos.js"
import { obtenerTabla } from "./gestion-productos.js"
import { agregarCarrito } from '../carrito/servicios-carrito.js'

const contenedor=obtenerTabla()

/*-------------------Creación celdas admin ------------------- */

function crearFila(producto){
    const fila = document.createElement("tr")

    const tdNombre = crearCeldaNombre(producto.nombre, producto.imagen)
    const tdStock = crearCeldaStock(producto.stock, producto.stockMinimo)
    const tdPrecio = crearCeldaPrecio(producto.precio)
    const tdCategoria = crearCeldaCategoria(producto.categoria)
    const tdAcciones = crearCeldaAcciones(producto.id)
    
    fila.appendChild(tdNombre)
    fila.appendChild(tdCategoria)
    fila.appendChild(tdPrecio)
    fila.appendChild(tdStock)
    fila.appendChild(tdAcciones)

    return fila
}

function crearCeldaNombre(nombre,imagen){
    const td = document.createElement("td")

    const div=document.createElement("div")
    div.classList.add("d-flex", "align-items-center", "gap-2")
    
    const imagenDiv = document.createElement("img")
    imagenDiv.src = `img/${imagen}`
    imagenDiv.alt = nombre
    imagenDiv.classList.add("img-producto-tabla")

    const nombreDiv= document.createElement("strong")
    nombreDiv.textContent=nombre

    div.appendChild(imagenDiv)
    div.appendChild(nombreDiv)

    td.appendChild(div)
    return td
}

function crearCeldaCategoria(categoria){
    const td = document.createElement("td")
    td.classList.add("text-muted")
    td.textContent=categoria
    return td
}

function crearCeldaPrecio(precio){
    const td = document.createElement("td")
    td.textContent=`$ ${Number(precio)}`
    return td
}

function crearCeldaStock(stock, stockMin){
    const td = document.createElement("td")
    const span = document.createElement("span")
    estilizadoStock(stock, span, stockMin)

    td.appendChild(span)
    return td
}

function crearCeldaAcciones(id){
    const td = document.createElement("td")

    const div=document.createElement("div")
    div.classList.add("d-flex", "gap-2")

    const btn_editar=crearBotonEditar(id,div)
    const btn_eliminar=crearBotonEliminar(id,div)
    
    td.appendChild(div)
    return td
}

function estilizadoStock(stock, span, stockMin){
    span.classList.add("stock-badge")
    if(Number(stock)<=Number(stockMin)){
        span.classList.add("bajo")
        span.textContent=`${stock} u. - bajo`
    }
    else 
        if(Number(stock)>=100){
            span.classList.add("alto")
            span.textContent=`${stock} u. - alto`
        }
        else{
            span.classList.add("medio")
            span.textContent=`${stock} u. - medio`
        }
}

function crearBotonEliminar(index,div){
    const btn_eliminar=document.createElement("button")
    btn_eliminar.classList.add("btn", "btn-sm", "btn-action-del")
    const iconDel= document.createElement("i")
    iconDel.classList.add("bi", "bi-trash")
    btn_eliminar.appendChild(iconDel)
    
    div.appendChild(btn_eliminar)

    
    btn_eliminar.addEventListener("click", function(){
        eliminarProducto(index)
        renderizarTabla()
    })

    return btn_eliminar
}

function crearBotonEditar(index,div){
    const btn_editar=document.createElement("button")
    btn_editar.classList.add("btn", "btn-sm", "btn-action-edit")
    const iconEdit= document.createElement("i")
    iconEdit.classList.add("bi", "bi-pencil")
    btn_editar.appendChild(iconEdit)
    div.appendChild(btn_editar)

    btn_editar.addEventListener("click",function(){
        editarProducto(index)
    })
}

/*-------------------Creación celdas usser ------------------- */
export function crearColumna(producto){
    const div=document.createElement("div")
    div.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "d-flex")
    const card=crearCard(producto)

    div.appendChild(card)
    return div
}

function crearCard(producto){
    const div = document.createElement("div")
    div.classList.add("card", "h-100", "shadow", "border-0")

    const img = crearImagen(producto.imagen,producto.nombre)
    const overlay= crearOverlayStock(producto.stock, producto.stockMinimo)
    const body= crearBodyCard(producto)

    div.append(img,overlay,body)

    return div
}   

function crearImagen(imagen,nombre){
    const img=document.createElement("img")
    img.src = `img/${imagen}`
    img.alt = nombre
    img.classList.add("card-img-top")
    return img
}

function crearOverlayStock(stock,stockMin){
    const overlay=document.createElement("div")
    overlay.classList.add("card-img-overlay")
    const span=crearSpanStock(stock,stockMin)
    overlay.appendChild(crearSpanStock(stock,stockMin))

    return overlay
}

function crearSpanStock(stock, stockMin){
    const span = document.createElement("span")
    span.classList.add("card-text", "rounded-4")

    if(stock <= stockMin){
        span.textContent = "Pocas unidades"
        span.classList.add("sinStock")
    }
    else
        if(stock>=100){
            span.textContent = "Disponible"
            span.classList.add("disponible")
        }
        else{
            span.textContent = "En stock"
            span.classList.add("stock")
        }

    return span
}

function crearBodyCard(producto){
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body", "d-flex", "flex-column")

    const categoria = document.createElement("p")
    categoria.classList.add("card-text")
    categoria.textContent = producto.categoria

    const nombre = document.createElement("h5")
    nombre.classList.add("card-title")
    nombre.textContent = producto.nombre

    const footer = crearFooterCard(producto)

    cardBody.append(
        categoria,
        nombre,
        footer
    )

    return cardBody
}

function crearFooterCard(producto){
    
    const footer=document.createElement("div")
    footer.classList.add("d-flex", "justify-content-between", "align-items-center", "mt-3")

    const precio=document.createElement("h6")
    precio.classList.add("fw-bold")
    precio.textContent=`$ ${producto.precio}`

    const carrito=document.createElement("button")
    carrito.classList.add("botonini")
    carrito.type="button"

    const i=document.createElement("i")
    i.classList.add("fa-solid", "fa-cart-shopping","fa-fw")

    carrito.appendChild(i)

    const texto = document.createTextNode(" Agregar")
    carrito.appendChild(texto)

    carrito.addEventListener("click", () => agregarCarrito(producto))

    
    footer.append(precio,carrito)
    return footer
}

/*-------------------Exports ------------------- */

export function renderizarTabla(productosFiltrados){
    if (!contenedor) return 
    contenedor.innerHTML = ""

    const productos = productosFiltrados ?? obtenerProductos()

    if(productos.length === 0){
        const tr=document.createElement("tr")
        const td=document.createElement("td")
        td.colSpan=5
        td.classList.add("text-muted","text-center","py-3")
        td.textContent="No hay productos"
        tr.appendChild(td)
        contenedor.appendChild(tr)
        return
    }

    for(let i = 0; i < productos.length; i++){
        const fila = crearFila(productos[i])
        contenedor.appendChild(fila)
    }
}

export function mostrarDetacados(contenedor){
    if (!contenedor) return  
    contenedor.innerHTML = ""

    const productos = obtenerProductos()

    const destacados = productos.filter(
        producto => producto.destacado
    )

    for(const producto of destacados){
        contenedor.appendChild(
            crearColumna(producto)
        )
    }
}

export function mostrarPublicados(contenedor){
    const productos = obtenerProductos().filter(
        producto => producto.publicado
    )

    mostrarProductos(contenedor, productos)
}

export function mostrarProductos(contenedor, productos){
    contenedor.innerHTML = ""

    if(productos.length === 0){
        contenedor.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">
                    No se encontraron productos.
                </p>
            </div>
        `
        return
    }

    productos.forEach(producto => {
        contenedor.appendChild(
            crearColumna(producto)
        )
    })
}