export function crearEmptyState(mensaje = "No hay empresas disponibles") {
    const p = document.createElement("p");
    p.classList.add("empty");
    p.setAttribute("role", "status");
    p.setAttribute("aria-live", "polite");
    p.textContent = mensaje;

    return p;
}