export function abrirModalPedido(pedido){
    document.getElementById("modal_codigo").textContent = "#"+pedido.codigo;
    document.getElementById("modal_fecha").textContent = pedido.fecha;
    document.getElementById("modal_usuario").textContent = pedido.usuario.nombre+" "+ pedido.usuario.apellido;
    document.getElementById("modal_nombre").textContent = pedido.usuario.nombre;
    document.getElementById("modal_email").textContent = pedido.usuario.email;
    document.getElementById("modal_estado").textContent = pedido.estado;
    document.getElementById("modal_total").textContent = `$${pedido.monto.toLocaleString("es-AR")}`;

    const tbody = document.getElementById("modal_productos");

    tbody.innerHTML = "";

    pedido.compras.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.producto.nombre}</td>
                <td>${item.cantidad}</td>
                <td class="text-end">
                    $${(item.producto.precio * item.cantidad).toLocaleString("es-AR")}
                </td>
            </tr>
        `;
    });

    const modal = new bootstrap.Modal(
        document.getElementById("modalPedido")
    );

    modal.show();

}