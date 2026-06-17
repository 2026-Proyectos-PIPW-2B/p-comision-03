export function mostrarAlertaExito( msj_titulo, msj_subtitulo, ubicacion) {
    if (document.getElementById("overlayExito")) return;

    const overlay = document.createElement("div");
    overlay.id = "overlayExito";
    overlay.classList.add("overlay-exito");

    const toastExito= document.createElement("div")
    toastExito.id="toastExito"
    toastExito.classList.add("toast-exito")

    const circle= document.createElement("div")
    circle.classList.add("check-circle")
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
    barraTiempo.classList.add("barra-progreso")

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