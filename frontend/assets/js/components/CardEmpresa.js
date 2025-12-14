import { crearBadgeTipo } from "./BadgeTipo.js";
import { crearToggleEstado } from "./ToggleEstado.js";
import { abrirModalEditarEmpresa } from "./ModalEditarEmpresa.js";

export function crearCardEmpresa(empresa) {
    const card = document.createElement("article");
    card.classList.add("card");

    card.style.setProperty(
        "--color-tipo",
        empresa.empresa_tipo?.color?.css ?? "#666"
    );

    /* ===== Header ===== */
    const header = document.createElement("header");
    const badge = crearBadgeTipo(empresa.empresa_tipo);

    const titulo = document.createElement("h2");
    titulo.textContent = empresa.nombre;

    header.append(badge, titulo);

    /* ===== Estado ===== */
    const estado = document.createElement("p");
    estado.classList.add("estado");

    const dot = document.createElement("span");
    dot.classList.add("estado-dot");

    const textoEstado = document.createElement("span");
    textoEstado.textContent = empresa.activo ? "Activo" : "Inactivo";

    estado.append(dot, textoEstado);

    /* ===== Footer ===== */
    const acciones = document.createElement("footer");

    const btnEditar = document.createElement("button");
    btnEditar.classList.add("btn-toggle");
    btnEditar.innerHTML = `
        <i class="fa-solid fa-pen"></i>
        <span>Modificar</span>
    `;

    btnEditar.addEventListener("click", () => {
        abrirModalEditarEmpresa(empresa, () => {
            location.reload();
        });
    });

    const actualizarUI = (nuevoEstado) => {
        empresa.activo = nuevoEstado;
        textoEstado.textContent = nuevoEstado ? "Activo" : "Inactivo";

        acciones.replaceChildren(
            btnEditar,
            crearToggleEstado(empresa, actualizarUI)
        );
    };

    acciones.append(
        btnEditar,
        crearToggleEstado(empresa, actualizarUI)
    );

    card.append(header, estado, acciones);
    return card;
}