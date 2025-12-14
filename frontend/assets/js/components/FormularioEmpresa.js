import { crearGestor, actualizarGestor, obtenerTiposEmpresa } from "../api.js"

export function crearFormularioEmpresa(empresa, onClose) {
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

  obtenerTiposEmpresa().then((tipos) => {
    select.innerHTML = ""
    tipos.forEach((tipo) => {
      const option = document.createElement("option")
      option.value = tipo.id
      option.textContent = tipo.nombre

      if (esEdicion && tipo.id === empresa.empresa_tipo.id) {
        option.selected = true
      }

      select.appendChild(option)
    })
  })

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    const data = {
      nombre: formData.get("nombre"),
      empresa_tipo: {
        id: Number(formData.get("empresa_tipo_id")),
      },
    }

    const ok = esEdicion ? await actualizarGestor(empresa.id, data) : await crearGestor(data)

    if (ok) {
      location.reload() // Recargar para mostrar cambios
      onClose()
    }
  })

  return form
}
