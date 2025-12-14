// Función para mostrar mensaje de error en el modal
export function mostrarErrorModal(contenedor, texto) {
    // Si ya existe un mensaje, eliminarlo primero
    const existente = contenedor.querySelector(".modal-error");
    if (existente) existente.remove();

    const errorDiv = document.createElement("div");
    errorDiv.classList.add("modal-error");
    errorDiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${texto}`;

    contenedor.appendChild(errorDiv);

    // Activar animación
    requestAnimationFrame(() => {
        errorDiv.classList.add("show");
    });

    // Opcional: auto-ocultar después de 5s
    setTimeout(() => {
        errorDiv.classList.remove("show");
        setTimeout(() => errorDiv.remove(), 300); // coincide con duración de animación
    }, 5000);
}