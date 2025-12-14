export function crearBadgeTipo(tipo = {}) {
    const badge = document.createElement("span");
    badge.classList.add("badge");
    badge.setAttribute(
        "aria-label",
        `Tipo de empresa: ${tipo.nombre ?? "No especificado"}`
    );
    tipo.color?.Tailwind && badge.classList.add(tipo.color.Tailwind);
    tipo.color?.css && badge.style.setProperty("--badge-color", tipo.color.css);

    const icono = document.createElement("i");
    icono.classList.add(
        "fa-solid",
        tipo.icono?.FontAwesome ?? "fa-building"
    );
    icono.setAttribute("aria-hidden", "true");

    const texto = document.createElement("span");
    texto.textContent = tipo.nombre ?? "Sin tipo";

    badge.append(icono, texto);
    return badge;
}