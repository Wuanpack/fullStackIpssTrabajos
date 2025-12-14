import { crearCardEmpresa } from "./CardEmpresa.js";
import { crearEmptyState } from "./EmptyState.js";

/**
 * Renderiza dinámicamente un listado de empresas en el contenedor.
 * @param {HTMLElement} contenedor - Elemento donde se insertarán las tarjetas.
 * @param {Array} empresas - Arreglo de empresas.
 */
export function renderListado(contenedor, empresas) {
    // Limpiar contenido previo
    contenedor.innerHTML = "";

    // Validación defensiva
    if (!Array.isArray(empresas) || empresas.length === 0) {
        contenedor.appendChild(crearEmptyState("No hay empresas disponibles"));
        return;
    }

    // Fragmento para actualizar DOM de forma óptima
    const fragment = document.createDocumentFragment();

    empresas.forEach(empresa => {
        if (empresa && typeof empresa === "object") {
            fragment.appendChild(crearCardEmpresa(empresa));
        } else {
            console.warn("Empresa inválida en listado:", empresa);
        }
    });

    contenedor.appendChild(fragment);
}