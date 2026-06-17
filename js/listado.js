const contenedor = document.getElementById("tabla-transacciones")

const filtros = {
    tipo: "",
    categoria: "",
    texto: ""
}

const filtro_tipo=document.getElementById("filtro-tipo")
const filtro_categoria=document.getElementById("filtro-categoria")
const filtro_texto=document.getElementById("filtro-texto")
const boton_limpiar=document.getElementById("btn-limpiar")

window.onload = function(){
    renderizarTabla()
    inicializarFiltros()
    actualizarBotonLimpiar()
}

function obtenerTransacciones(){
    const transacciones = localStorage.getItem("transacciones")
    let resultado

    if (transacciones) {
        resultado = JSON.parse(transacciones)
    } else {
        resultado = []
    }

    return resultado
}

function guardarTransacciones(transacciones){
    localStorage.setItem("transacciones", JSON.stringify(transacciones))
}


function crearCelda(texto){
    const td = document.createElement("td")
    td.textContent = texto
    return td
}

function crearCeldaConcepto(concepto, obs){
    const td = document.createElement("td")

    const spanConcepto = document.createElement("span")
    spanConcepto.classList.add("concepto")
    spanConcepto.textContent = concepto

    const spanObs = document.createElement("span")
    spanObs.classList.add("descripcion")
    spanObs.textContent = obs

    td.appendChild(spanConcepto)
    td.appendChild(spanObs)

    return td
}

function crearFila(t, index){
    const fila = document.createElement("tr")

    const tdFecha = crearCelda(t.fecha)
    const tdTipo = crearCelda(t.tipo)
    const tdConcepto = crearCeldaConcepto(t.concepto, t.observaciones)
    const tdCategoria = crearCelda(t.categoria)
    const tdMonto = crearCelda(t.monto)

    const tdAcciones = document.createElement("td")
    tdAcciones.appendChild(crearBotonEliminar(index))

    if(t.tipo === "ingreso"){
        tdTipo.classList.add("ingreso")
        tdMonto.classList.add("ingreso")
    } else {
        tdTipo.classList.add("egreso")
        tdMonto.classList.add("egreso")
    }

    fila.appendChild(tdFecha)
    fila.appendChild(tdTipo)
    fila.appendChild(tdConcepto)
    fila.appendChild(tdCategoria)
    fila.appendChild(tdMonto)
    fila.appendChild(tdAcciones)

    return fila
}

function renderizarTabla(){
    contenedor.innerHTML = ""

    const transacciones = obtenerTransacciones()

    if(transacciones.length === 0){
        contenedor.innerHTML = "<tr><td colspan='6'>No hay transacciones</td></tr>"
    }

    for(let i = 0; i < transacciones.length; i++){
        const fila = crearFila(transacciones[i], i)
        contenedor.appendChild(fila)
    }
}

function crearBotonEliminar(index){
    const boton = document.createElement("input")
    boton.setAttribute("type","button")
    boton.setAttribute("value","Eliminar")
    boton.classList.add("btn-eliminar")

    boton.addEventListener("click", function(){
        eliminarTransaccion(index)
        renderizarTabla()
    })

    return boton
}

function eliminarTransaccion(index){
    const transacciones = obtenerTransacciones()
    transacciones.splice(index, 1)
    guardarTransacciones(transacciones)
}

function inicializarFiltros(){
    filtro_tipo.addEventListener("change", aplicarFiltros)
    filtro_categoria.addEventListener("change", aplicarFiltros)
    filtro_texto.addEventListener("input", aplicarFiltros)

    boton_limpiar.addEventListener("click", limpiarFiltros)
}

function aplicarFiltros(){
    leerFiltros()

    let transacciones = obtenerTransacciones()
    transacciones = filtrarTransacciones(transacciones)
    
    renderizarTablaFiltrada(transacciones)
    actualizarBotonLimpiar()
}

function leerFiltros(){
    filtros.tipo = filtro_tipo.value
    filtros.categoria = filtro_categoria.value
    filtros.texto = filtro_texto.value.toLowerCase()
}

function filtrarTransacciones(transacciones){
    return transacciones.filter(cumpleFiltros)
}

function cumpleFiltros(t){
    if(filtros.tipo && t.tipo !== filtros.tipo){
        return false
    }

    if(filtros.categoria && t.categoria !== filtros.categoria){
        return false
    }

    if(filtros.texto &&
       !t.concepto.toLowerCase().includes(filtros.texto)){
        return false
    }

    return true
}

function renderizarTablaFiltrada(lista){
    contenedor.innerHTML = ""

    if(lista.length === 0){
        contenedor.innerHTML = "<tr><td colspan='6'>Sin resultados</td></tr>"
        return
    }

    for(let i = 0; i < lista.length; i++){
        contenedor.appendChild(crearFila(lista[i], i))
    }
}

function limpiarFiltros(){
    filtro_tipo.value = ""
    filtro_categoria.value = ""
    filtro_texto.value = ""

    filtros.tipo = ""
    filtros.categoria = ""
    filtros.texto = ""

    renderizarTabla()
    actualizarBotonLimpiar()
}

function actualizarBotonLimpiar(){
    if(filtros.tipo || filtros.categoria || filtros.texto){
        boton_limpiar.style.display = "block"
    } else {
        boton_limpiar.style.display = "none"
    }
}