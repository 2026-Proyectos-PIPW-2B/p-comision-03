function mostrarError(input, divError, mensaje){
    input.classList.add("is-invalid");
    divError.textContent = mensaje;
}

function limpiarError(input, divError){
    input.classList.remove("is-invalid");
    divError.textContent = "";
}

export function validarConfiguracion(campos){

    let valido = true;

    const tiempo = Number(campos.sesion.inputSesion.value);
    const items = Number(campos.listado.inputPag.value);
    const monto = Number(campos.listado.inputMonto.value);
    const bajo = Number(campos.stock.inputBajo.value);
    const medio = Number(campos.stock.inputMedio.value);

    // Tiempo sesión
    if(tiempo < 1){
        mostrarError(
            campos.sesion.inputSesion,
            campos.sesion.divError,
            "Debe ser mayor a 0."
        );
        valido = false;
    }else{
        limpiarError(
            campos.sesion.inputSesion,
            campos.sesion.divError
        );
    }

    // Ítems por página
    if(items < 1){
        mostrarError(
            campos.listado.inputPag,
            campos.listado.divErrorPag,
            "Debe haber al menos 1 ítem por página."
        );
        valido = false;
    }else{
        limpiarError(
            campos.listado.inputPag,
            campos.listado.divErrorPag
        );
    }

    // Monto mínimo
    if(monto < 0){
        mostrarError(
            campos.listado.inputMonto,
            campos.listado.divErrorMonto,
            "No puede ser negativo."
        );
        valido = false;
    }else{
        limpiarError(
            campos.listado.inputMonto,
            campos.listado.divErrorMonto
        );
    }

    // Stock bajo
    if(bajo < 0){
        mostrarError(
            campos.stock.inputBajo,
            campos.stock.divErrorBajo,
            "Debe ser mayor o igual a 0."
        );
        valido = false;
    }else{
        limpiarError(
            campos.stock.inputBajo,
            campos.stock.divErrorBajo
        );
    }

    // Stock medio
    if(medio <= bajo){
        mostrarError(
            campos.stock.inputMedio,
            campos.stock.divErrorMedio,
            "Debe ser mayor que el stock bajo."
        );
        valido = false;
    }else{
        limpiarError(
            campos.stock.inputMedio,
            campos.stock.divErrorMedio
        );
    }

    return valido;
}