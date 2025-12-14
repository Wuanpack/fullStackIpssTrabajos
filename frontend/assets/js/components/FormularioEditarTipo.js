import { obtenerTiposEmpresa, actualizarGestor } from "../api.js";
import { mostrarErrorModal } from "./utils.js"; // Función para mostrar errores animados

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
            <select name="empresa_tipo_id" required>
                <option value="">Cargando...</option>
            </select>
        </label>

        <button type="submit">Guardar cambios</button>
    `;

    const select = form.querySelector("select");

    // Cargar tipos de empresa desde la API
    obtenerTiposEmpresa().then(tipos => {
        select.innerHTML = "";
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

        try {
            const { ok, status } = await actualizarGestor(empresa.id, {
                nombre: empresa.nombre,
                empresa_tipo: { id: Number(select.value) }
            });

            if (!ok) {
                // Mostrar mensaje según el status HTTP
                switch (status) {
                    case 409:
                        mostrarErrorModal(form, "Conflicto: la empresa ya tiene este tipo.");
                        break;
                    case 404:
                        mostrarErrorModal(form, "Empresa no encontrada.");
                        break;
                    case 500:
                        mostrarErrorModal(form, "Error del servidor, intenta más tarde.");
                        break;
                    default:
                        mostrarErrorModal(form, "Error al actualizar, intenta más tarde.");
                }
                return; // Importante: no cerrar el modal
            }

            // Éxito: cerrar modal y ejecutar callback
            onSuccess?.();
            onClose();

        } catch (error) {
            mostrarErrorModal(form, "Error inesperado, intenta más tarde.");
        }
    });

    return form;
}