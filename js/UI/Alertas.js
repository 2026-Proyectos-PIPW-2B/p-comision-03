export function mostrarAlertaExito( msj_titulo, msj_subtitulo, ubicacion) {
    if (document.getElementById("overlayExito")) return;

    const overlay = document.createElement("div");
    overlay.id = "overlayExito";
    overlay.classList.add("overlay-exito");

    const toastExito= document.createElement("div")
    toastExito.id="toastExito"
   toastExito.classList.add("toast-exito", "toast-exito-success")

    const circle= document.createElement("div")
    circle.classList.add("check-circle", "circle-exito")
    circle.innerHTML= 
        `<svg width="30" height="30" viewBox="0 0 24 24" fill="none"
          stroke="#16a34a" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>`

    const titulo=document.createElement("p")
    titulo.classList.add("toast-titulo")
    titulo.textContent=msj_titulo

    const subtitulo=document.createElement("p")
    subtitulo.classList.add("toast-subtitulo")
    subtitulo.textContent=msj_subtitulo

    const barra=document.createElement("div")
    barra.classList.add("barra-contenedor")

    const barraTiempo=document.createElement("div")
    barraTiempo.id="barraTiempo"
    barraTiempo.classList.add("barra-progreso", "barra-exito")

    barra.appendChild(barraTiempo)

    toastExito.appendChild(circle)
    toastExito.appendChild(titulo)
    toastExito.appendChild(subtitulo)
    toastExito.appendChild(barra)

    overlay.appendChild(toastExito)

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("visible");
      document.getElementById("toastExito").classList.add("visible");

      const barra = document.getElementById("barraTiempo");
      barra.style.transition = "width 3.5s linear";
      barra.style.width = "0%";
    });
  });

  setTimeout(() => {
    overlay.classList.remove("visible");
    setTimeout(() => {
      overlay.remove();
      window.location.href = ubicacion;
    }, 300);
  }, 3000);
}
export function mostrarAlertaWarning(msj_titulo, msj_subtitulo, ubicacion) {
    if (document.getElementById("overlayWarning")) return;

    const overlay = document.createElement("div");
    overlay.id = "overlayWarning";
    overlay.classList.add("overlay-exito");

    const toastWarning = document.createElement("div")
    toastWarning.id = "toastWarning"
    toastWarning.classList.add("toast-exito", "toast-exito-warning")

    const circle = document.createElement("div")
    circle.classList.add("check-circle", "circle-warning")
    circle.innerHTML =
        `<svg width="30" height="30" viewBox="0 0 24 24" fill="none"
          stroke="#d97706" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="8" x2="12" y2="13"/>
          <line x1="12" y1="16.5" x2="12" y2="16.5"/>
        </svg>`

    const titulo = document.createElement("p")
    titulo.classList.add("toast-titulo")
    titulo.textContent = msj_titulo

    const subtitulo = document.createElement("p")
    subtitulo.classList.add("toast-subtitulo")
    subtitulo.textContent = msj_subtitulo

    const barra = document.createElement("div")
    barra.classList.add("barra-contenedor")

    const barraTiempo = document.createElement("div")
    barraTiempo.id = "barraTiempoWarning"
    barraTiempo.classList.add("barra-progreso", "barra-warning")

    barra.appendChild(barraTiempo)

    toastWarning.appendChild(circle)
    toastWarning.appendChild(titulo)
    toastWarning.appendChild(subtitulo)
    toastWarning.appendChild(barra)

    overlay.appendChild(toastWarning)

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("visible");
      document.getElementById("toastWarning").classList.add("visible");

      const barra = document.getElementById("barraTiempoWarning");
      barra.style.transition = "width 3.5s linear";
      barra.style.width = "0%";
    });
  });

  setTimeout(() => {
    overlay.classList.remove("visible");
    setTimeout(() => {
      overlay.remove();
      window.location.href = ubicacion;
    }, 300);
  }, 3000);
}

export function mostrarAlertaDanger(msj_titulo, msj_subtitulo, ubicacion) {
    if (document.getElementById("overlayDanger")) return;

    const overlay = document.createElement("div");
    overlay.id = "overlayDanger";
    overlay.classList.add("overlay-exito");

    const toastDanger = document.createElement("div")
    toastDanger.id = "toastDanger"
    toastDanger.classList.add("toast-exito", "toast-exito-danger")

    const circle = document.createElement("div")
    circle.classList.add("check-circle", "circle-danger")
    circle.innerHTML =
        `<svg width="30" height="30" viewBox="0 0 24 24" fill="none"
          stroke="#dc2626" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>`

    const titulo = document.createElement("p")
    titulo.classList.add("toast-titulo")
    titulo.textContent = msj_titulo

    const subtitulo = document.createElement("p")
    subtitulo.classList.add("toast-subtitulo")
    subtitulo.textContent = msj_subtitulo

    const barra = document.createElement("div")
    barra.classList.add("barra-contenedor")

    const barraTiempo = document.createElement("div")
    barraTiempo.id = "barraTiempoDanger"
    barraTiempo.classList.add("barra-progreso", "barra-danger")

    barra.appendChild(barraTiempo)

    toastDanger.appendChild(circle)
    toastDanger.appendChild(titulo)
    toastDanger.appendChild(subtitulo)
    toastDanger.appendChild(barra)

    overlay.appendChild(toastDanger)

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("visible");
      document.getElementById("toastDanger").classList.add("visible");

      const barra = document.getElementById("barraTiempoDanger");
      barra.style.transition = "width 3.5s linear";
      barra.style.width = "0%";
    });
  });

  setTimeout(() => {
    overlay.classList.remove("visible");
    setTimeout(() => {
      overlay.remove();
      window.location.href = ubicacion;
    }, 300);
  }, 3000);
}


export function mostrarAlertaConfirm(msj_titulo, msj_subtitulo, onConfirmar) {
    if (document.getElementById("overlayConfirm")) return
 
    const overlay = document.createElement("div")
    overlay.id = "overlayConfirm"
    overlay.classList.add("overlay-exito")
 
    const toast = document.createElement("div")
    toast.id = "toastConfirm"
    toast.classList.add("toast-exito", "toast-exito-warning")
 
    const circle = document.createElement("div")
    circle.classList.add("check-circle", "circle-warning")
    circle.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
          stroke="#d97706" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12" y2="16"/>
        </svg>`
 
    const titulo = document.createElement("p")
    titulo.classList.add("toast-titulo")
    titulo.textContent = msj_titulo
 
    const subtitulo = document.createElement("p")
    subtitulo.classList.add("toast-subtitulo")
    subtitulo.textContent = msj_subtitulo
 
    // Contenedor de botones
    const botones = document.createElement("div")
    botones.classList.add("d-flex", "gap-2", "mt-3", "justify-content-center")
 
    const btnCancelar = document.createElement("button")
    btnCancelar.textContent = "Cancelar"
    btnCancelar.classList.add("btn", "btn-outline-secondary", "rounded-pill", "px-4")
 
    const btnConfirmar = document.createElement("button")
    btnConfirmar.textContent = "Confirmar"
    btnConfirmar.classList.add("btn", "rounded-pill", "px-4", "buttoncarrito")
 
    botones.appendChild(btnCancelar)
    botones.appendChild(btnConfirmar)
 
    toast.appendChild(circle)
    toast.appendChild(titulo)
    toast.appendChild(subtitulo)
    toast.appendChild(botones)
    overlay.appendChild(toast)
    document.body.appendChild(overlay)
 
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.classList.add("visible")
            toast.classList.add("visible")
        })
    })
 
    btnCancelar.addEventListener("click", () => cerrar(overlay))
 
    btnConfirmar.addEventListener("click", () => {
        cerrar(overlay)
        onConfirmar()  
    })
}
function cerrar(overlay) {
        overlay.classList.remove("visible")
        setTimeout(() => overlay.remove(), 300)
    }
 