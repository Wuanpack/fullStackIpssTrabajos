import { crearFormularioEmpresa } from "./FormularioEmpresa.js"

export function abrirModalEmpresa(empresa = null) {
  console.log("[v0] abrirModalEmpresa called with:", empresa)

  const overlay = document.createElement("div")
  overlay.classList.add("modal-overlay")

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove()
  })

  const modal = document.createElement("div")
  modal.classList.add("custom-modal")

  console.log("[v0] Modal element created:", modal)

  const formulario = crearFormularioEmpresa(empresa, () => {
    overlay.remove()
  })

  console.log("[v0] Formulario returned:", formulario)

  modal.appendChild(formulario)

  console.log("[v0] Formulario appended to modal, modal children:", modal.children)

  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  console.log("[v0] Modal opened, overlay in DOM:", document.body.contains(overlay))
}
