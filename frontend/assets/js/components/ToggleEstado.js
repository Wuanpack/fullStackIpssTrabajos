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

    // Contenedor de mensaje de error dentro del modal
    let mensajeError = null;

    const crearMensajeError = (texto) => {
        if (!mensajeError) {
            mensajeError = document.createElement("div");
            mensajeError.classList.add("modal-error"); // clase CSS para estilo
            // Inserta el mensaje justo después del botón
            button.insertAdjacentElement("afterend", mensajeError);
        }
        mensajeError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${texto}`;
    };

    button.addEventListener("click", async () => {
        button.disabled = true;

        const result = await config.action(empresa.id);

        if (!result.ok) {
            switch (result.status) {
                case 404:
                    crearMensajeError("Empresa no encontrada.");
                    break;
                case 409:
                    crearMensajeError("Conflicto: el estado ya es el mismo.");
                    break;
                case 500:
                    crearMensajeError("Error del servidor, intenta más tarde.");
                    break;
                default:
                    crearMensajeError("Error al actualizar el estado.");
            }
            button.disabled = false;
            return;
        }

        // Éxito: eliminar mensaje
        mensajeError?.remove();
        mensajeError = null;

        empresa.activo = config.nextState;
        onUpdate(config.nextState);
        button.disabled = false;
    });

    return button;
}