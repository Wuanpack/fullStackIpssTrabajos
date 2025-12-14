// Importa las funciones para consumir la API y renderizar componentes
import { obtenerEmpresas } from "./api.js";
import { renderListado } from "./components/RenderListado.js";
import { abrirModalEmpresa } from "./components/ModalEmpresa.js";

// Espera a que todo el DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Obtiene el contenedor donde se listarán las empresas
        const contenedor = document.getElementById("listado-empresas");

        // Llama a la API para obtener todas las empresas
        const empresas = await obtenerEmpresas();

        // Renderiza dinámicamente las tarjetas de empresas dentro del contenedor
        renderListado(contenedor, empresas);
    } catch (e) {
        // Captura cualquier error durante la carga inicial y lo muestra en consola
        console.error("Error fatal en app:", e);
    }

    // Configura el botón "Agregar empresa" para abrir el modal correspondiente
    document.getElementById("btn-nueva")
        ?.addEventListener("click", () => abrirModalEmpresa());
        // El "?." asegura que no falle si el botón no existe en el DOM
});