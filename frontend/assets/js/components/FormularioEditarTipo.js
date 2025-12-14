import { obtenerTiposEmpresa, actualizarGestor } from "../api.js";

export function crearFormularioEditarTipo(empresa, onClose, onSuccess) {
    const form = document.createElement("form");

    form.innerHTML = `
        <h2>Modificar tipo de empresa</h2>

        <label>
            Empresa
            <input type="text" value="${empresa.nombre}" disabled>
        </label>

        <label>
            Tipo de empresa
            <select name="empresa_tipo_id" required></select>
        </label>

        <button type="submit">Guardar cambios</button>
    `;

    const select = form.querySelector("select");

    obtenerTiposEmpresa().then(tipos => {
        tipos.forEach(tipo => {
            const option = document.createElement("option");
            option.value = tipo.id;
            option.textContent = tipo.nombre;

            if (tipo.id === empresa.empresa_tipo.id) {
                option.selected = true;
            }

            select.appendChild(option);
        });
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const ok = await actualizarGestor(empresa.id, {
            nombre: empresa.nombre,
            empresa_tipo: {
                id: Number(select.value)
            }
        });

        if (ok) {
            onSuccess?.();
            onClose();
        }
    });

    return form;
}