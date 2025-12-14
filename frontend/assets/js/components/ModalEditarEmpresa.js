import { crearFormularioEditarTipo } from "./FormularioEditarTipo.js";

export function abrirModalEditarEmpresa(empresa, onSuccess) {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });

    const modal = document.createElement("div");
    modal.classList.add("custom-modal");

    modal.appendChild(
        crearFormularioEditarTipo(
            empresa,
            () => overlay.remove(),
            onSuccess
        )
    );

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}