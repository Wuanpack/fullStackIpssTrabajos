import { activarGestor, desactivarGestor } from "../api.js";

export function crearToggleEstado(empresa, onUpdate) {
    const button = document.createElement("button");
    button.classList.add("btn-toggle");

    const config = empresa.activo
        ? {
            text: "Desactivar",
            icon: "fa-ban",
            action: desactivarGestor,
            nextState: false,
            aria: "Desactivar gestor"
        }
        : {
            text: "Activar",
            icon: "fa-check",
            action: activarGestor,
            nextState: true,
            aria: "Activar gestor"
        };

    button.innerHTML = `
        <i class="fa-solid ${config.icon}" aria-hidden="true"></i>
        <span>${config.text}</span>
    `;

    button.setAttribute("aria-label", config.aria);

    button.addEventListener("click", async () => {
        button.disabled = true;

        const ok = await config.action(empresa.id);

        if (ok) {
            onUpdate(config.nextState);
        }

        button.disabled = false;
    });

    return button;
}