import { obtenerEmpresas } from "./api.js";
import { renderListado } from "./components/RenderListado.js";
import { abrirModalEmpresa } from "./components/ModalEmpresa.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const contenedor = document.getElementById("listado-empresas");
        const empresas = await obtenerEmpresas();
        renderListado(contenedor, empresas);
    } catch (e) {
        console.error("Error fatal en app:", e);
    }

    document.getElementById("btn-nueva")
        ?.addEventListener("click", () => abrirModalEmpresa());
});