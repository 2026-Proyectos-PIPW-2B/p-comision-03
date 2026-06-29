export function reenderizarNotificaciones(dropdown, notificaciones){
    const titulo=tituloDropdown()
    dropdown.appendChild(titulo)

    if(notificaciones.length===0)
        dropdown.appendChild(listaVacia())
    else{
        notificaciones.forEach(n => {
            dropdown.appendChild(crearLi(n))
        });
    }
}

function tituloDropdown(){
    const li=document.createElement("li")
    li.classList.add("px-2", "pb-2", "border-bottom")

    const span=document.createElement("span")
    span.classList.add("titulo-campanita")
    span.textContent="Notificaciones"

    li.appendChild(span)

    return li
}

function listaVacia(){
    const li=document.createElement("li")
    li.classList.add("px-2", "pb-2")

    const span=document.createElement("span")
    span.classList.add("text-muted fs-sm")
    span.textContent="No hay notificaciones pendientes"

    li.appendChild(span)

    return li
}

function crearLi(notificacion){
    const li=document.createElement("li")
    const link=crearLink(notificacion)

    li.appendChild(link)
    return li
}

function crearLink(notificacion){
    const link=document.createElement("a")
    link.href=notificacion.ref
    link.classList.add("dropdown-item", "rounded-3", "py-2")

    const tituloNot= crearTituloNot(notificacion.titulo)
    const subNot= crearSubTitulo(notificacion.subtitulo)
    link.append(tituloNot,subNot)

    return link
}

function crearTituloNot(msj){
    const div=document.createElement("div")
    div.classList.add("fw-semibold", "noti-campanita")
    div.textContent=msj

    return div
}

function crearSubTitulo(msj){
    const div=document.createElement("div")
    const small=document.createElement("small")
    small.classList.add("text-muted")
    small.textContent=msj

    div.appendChild(small)
    return div
}