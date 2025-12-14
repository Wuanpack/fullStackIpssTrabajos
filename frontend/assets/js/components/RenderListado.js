import { crearCardEmpresa } from "./CardEmpresa.js";
import { crearEmptyState } from "./EmptyState.js";

export function renderListado(contenedor, empresas) {
    contenedor.innerHTML = "";

    const listaValida = Array.isArray(empresas) && empresas.length > 0;

    if (!listaValida) {
        contenedor.appendChild(
            crearEmptyState("No hay empresas disponibles")
        );
        return;
    }

    const fragment = document.createDocumentFragment();

    empresas.forEach(empresa => {
        fragment.appendChild(crearCardEmpresa(empresa));
    });

    contenedor.appendChild(fragment);
}