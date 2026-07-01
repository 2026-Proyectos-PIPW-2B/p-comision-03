export function quitarImagen(imgPreview, previewDiv, zonaImagen, campos) {
    imgPreview.src = ""
    previewDiv.classList.add("d-none")
    zonaImagen.classList.remove("d-none")

    document.querySelectorAll(".miniatura").forEach(img => img.classList.remove("seleccionada"))

    campos.imagen.valor = ""
}

const imagenesDisponibles = [
    "alimento-gato.png",
    "arena.png",
    "balanceado.jpg",
    "barra-frutas.png",
    "cama-perro.png",
    "castillo.png",
    "collar.jpg",
    "columpio.png",
    "correa.png",
    "escamas.png",
    "filtro.png",
    "jaula.png",
    "pecera.png",
    "pelota.png",
    "pez.jpg",
    "rascador.png",
    "raton.jpg",
    "semillas.png",
    
];

export function cargarMiniaturas(listaImagenes,campos,imgPreview,previewDiv,zonaImagen) {
    listaImagenes.innerHTML = "";

    imagenesDisponibles.forEach(nombre => {
        const img = document.createElement("img");
        img.src = `img/${nombre}`;
        img.dataset.nombre = nombre;
        img.classList.add("miniatura");
        img.addEventListener("click", () => {
            document.querySelectorAll(".miniatura").forEach(i => i.classList.remove("seleccionada"));
            img.classList.add("seleccionada");
            campos.imagen.valor = nombre;

            imgPreview.src = `img/${nombre}`;

            listaImagenes.classList.add("d-none");  
            previewDiv.classList.remove("d-none");   
            zonaImagen.classList.add("d-none");    
        });

        listaImagenes.appendChild(img);
    });
}