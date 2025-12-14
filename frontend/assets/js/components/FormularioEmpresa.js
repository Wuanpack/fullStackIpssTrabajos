import { crearGestor, actualizarGestor, obtenerTiposEmpresa } from "../api.js"
import { mostrarErrorModal } from "./utils.js"

export function crearFormularioEmpresa(empresa, onClose, onSuccess) {
  const form = document.createElement("form")
  const esEdicion = Boolean(empresa)

  form.innerHTML = `
        <h2>${esEdicion ? "Editar" : "Crear"} Empresa</h2>

        <label>
            Nombre
            <input name="nombre" required value="${empresa?.nombre ?? ""}">
        </label>
        
        <label>
            Tipo de empresa
            <select name="empresa_tipo_id" required>
                <option value="">Cargando...</option>
            </select>
        </label>
        
        <button type="submit">
            ${esEdicion ? "Guardar cambios" : "Crear"}
        </button>
    `

  const select = form.querySelector("select")

  // Cargar tipos de empresa
  obtenerTiposEmpresa().then((tipos) => {
    select.innerHTML = ""
    tipos.forEach((tipo) => {
      const option = document.createElement("option")
      option.value = tipo.id
      option.textContent = tipo.nombre
      if (esEdicion && tipo.id === empresa.empresa_tipo.id) option.selected = true
      select.appendChild(option)
    })
  })

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const data = {
      nombre: formData.get("nombre"),
      empresa_tipo: { id: Number(formData.get("empresa_tipo_id")) },
    }

    try {
      const result = esEdicion
        ? await actualizarGestor(empresa.id, data)
        : await crearGestor(data)

      if (!result.ok) {
        // Mostrar mensaje según el status
        switch (result.status) {
          case 409:
            mostrarErrorModal(form, "Conflicto: ya existe una empresa con este nombre y tipo.")
            break
          case 500:
            mostrarErrorModal(form, "Error del servidor, intenta más tarde.")
            break
          default:
            mostrarErrorModal(form, "Error al guardar la empresa, intenta nuevamente.")
        }
        return // No cerrar el modal
      }

      // Éxito: llamar callback y cerrar modal
      onSuccess?.()
      onClose()

    } catch (error) {
      mostrarErrorModal(form, "Error inesperado, intenta más tarde.")
    }
  })

  return form
}