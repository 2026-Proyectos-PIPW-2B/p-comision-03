export function mostrarPreview(archivo, previewDiv,zonaImagen) {
    imgPreview.src = URL.createObjectURL(archivo)
    previewDiv.classList.remove("d-none")
    zonaImagen.classList.add("d-none")
}

export function quitarImagen(previewDiv,zonaImagen) {
    inputImagen.value = ""
    imgPreview.src = ""
    previewDiv.classList.add("d-none")
    zonaImagen.classList.remove("d-none")
}