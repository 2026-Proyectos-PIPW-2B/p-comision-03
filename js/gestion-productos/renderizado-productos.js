import { obtenerProductos,eliminarProducto,editarProducto } from "./servicios-productos.js"
import { obtenerTabla } from "./gestion-productos.js"

const contenedor=obtenerTabla()

function crearFila(producto){
    const fila = document.createElement("tr")

    const tdNombre = crearCeldaNombre(producto.nombre)
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


export function renderizarTabla(){
    contenedor.innerHTML = ""

    let productos = obtenerProductos()

    if(productos.length === 0){
        contenedor.innerHTML = "<tr><td colspan='4'>No hay productos</td></tr>"
    }

    for(let i = 0; i < productos.length; i++){
        console.log(productos[i])
        const fila = crearFila(productos[i])
        
        contenedor.appendChild(fila)
    }
}

function crearCeldaNombre(nombre_prod){
    const td = document.createElement("td")

    const div=document.createElement("div")
    div.classList.add("d-flex", "align-items-center", "gap-2")
    
    const divIcon= document.createElement("div")
    divIcon.classList.add("img-placeholder")

    const iconImag= document.createElement("i")
    iconImag.classList.add("bi", "bi-image")

    divIcon.appendChild(iconImag)

    const nombre= document.createElement("strong")
    nombre.textContent=nombre_prod

    div.appendChild(divIcon)
    div.appendChild(nombre)

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