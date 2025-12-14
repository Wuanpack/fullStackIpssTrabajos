const API_URL = "http://localhost/api/api/v1/gestores.php";
const TOKEN = "ipss.2025.T3";

/**
 * Obtener todas las empresas
 * @returns {Promise<Array>} Arreglo de empresas o vacío en caso de error
 */
export async function obtenerEmpresas() {
    try {
        const response = await fetch(API_URL, {
            headers: { "Authorization": `Bearer ${TOKEN}` }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const json = await response.json();
        return json.data ?? [];
    } catch (error) {
        console.error("Error al consumir la API:", error);
        return [];
    }
}

/**
 * Activar una empresa
 * @param {number} id - ID de la empresa
 * @returns {Promise<{ok: boolean, status: number|null, error?: any}>}
 */
export async function activarGestor(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: "PATCH",
            headers: { "Authorization": `Bearer ${TOKEN}` }
        });
        return { ok: response.ok, status: response.status };
    } catch (error) {
        console.error("Error al activar gestor:", error);
        return { ok: false, status: null, error };
    }
}

/**
 * Desactivar una empresa
 * @param {number} id - ID de la empresa
 * @returns {Promise<{ok: boolean, status: number|null, error?: any}>}
 */
export async function desactivarGestor(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${TOKEN}` }
        });
        return { ok: response.ok, status: response.status };
    } catch (error) {
        console.error("Error al desactivar gestor:", error);
        return { ok: false, status: null, error };
    }
}

/**
 * Crear una nueva empresa
 * @param {Object} data - Datos de la empresa
 * @returns {Promise<{ok: boolean, status: number|null, error?: any}>}
 */
export async function crearGestor(data) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return { ok: response.ok, status: response.status };
    } catch (error) {
        console.error("Error al crear gestor:", error);
        return { ok: false, status: null, error };
    }
}

/**
 * Actualizar una empresa existente
 * @param {number} id - ID de la empresa
 * @param {Object} data - Datos actualizados
 * @returns {Promise<{ok: boolean, status: number|null, error?: any}>}
 */
export async function actualizarGestor(id, data) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        return { ok: response.ok, status: response.status };
    } catch (error) {
        console.error("Error al actualizar gestor:", error);
        return { ok: false, status: null, error };
    }
}

/**
 * Obtener todos los tipos de empresa
 * @returns {Promise<Array>} Arreglo de tipos o vacío en caso de error
 */
export async function obtenerTiposEmpresa() {
    try {
        const response = await fetch("http://localhost/api/api/v1/empresaTipo.php", {
            headers: { "Authorization": `Bearer ${TOKEN}` }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const json = await response.json();
        return json.data ?? [];
    } catch (error) {
        console.error("Error al obtener tipos de empresa:", error);
        return [];
    }
}