import { obtenerEmpresas } from "./api.js";
import { renderListado } from "./components/RenderListado.js";
import { abrirModalEmpresa } from "./components/ModalEmpresa.js";

document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("listado-empresas");

    try {
        const empresas = await obtenerEmpresas();

        // Renderizado seguro del listado
        renderListado(contenedor, empresas);

    } catch (error) {
        console.error("Error fatal al inicializar la aplicación:", error);

        // Mensaje de error visible para el usuario
        const mensajeError = document.createElement("p");
        mensajeError.textContent = "Error al cargar empresas. Intenta nuevamente más tarde.";
        mensajeError.classList.add("empty");
        contenedor.replaceChildren(mensajeError);
    }

    // Configuración del botón de agregar nueva empresa
    const btnNueva = document.getElementById("btn-nueva");
    if (btnNueva) {
        btnNueva.addEventListener("click", () => abrirModalEmpresa());
    }
});