const API_URL = "http://localhost/api/api/v1/gestores.php";
const TOKEN = "ipss.2025.T3";

/**
 * Maneja la respuesta HTTP y valida JSON
 */
async function manejarRespuesta(response) {
    // Manejo de códigos HTTP
    if (!response.ok) {
        switch (response.status) {
            case 404:
                throw new Error("Recurso no encontrado (404)");
            case 500:
                throw new Error("Error interno del servidor (500)");
            default:
                throw new Error(`Error HTTP: ${response.status}`);
        }
    }

    // Parsear JSON
    const json = await response.json();

    // Validar estructura esperada
    if (!json || !Array.isArray(json.data)) {
        console.warn("JSON inválido recibido:", json);
        return [];
    }

    return json.data;
}

/**
 * Obtiene todas las empresas
 */
export async function obtenerEmpresas() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });

        return await manejarRespuesta(response);
    } catch (error) {
        console.error("Error al obtener empresas:", error);
        return [];
    }
}

export async function activarGestor(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: "PATCH",
            headers: { "Authorization": `Bearer ${TOKEN}` }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return true;
    } catch (error) {
        console.error("Error al activar gestor:", error);
        return false;
    }
}

export async function desactivarGestor(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${TOKEN}` }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return true;
    } catch (error) {
        console.error("Error al desactivar gestor:", error);
        return false;
    }
}

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

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return true;
    } catch (error) {
        console.error("Error al crear gestor:", error);
        return false;
    }
}

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

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return true;
    } catch (error) {
        console.error("Error al actualizar gestor:", error);
        return false;
    }
}

export async function obtenerTiposEmpresa() {
    try {
        const response = await fetch(
            "http://localhost/api/api/v1/empresaTipo.php",
            { headers: { "Authorization": `Bearer ${TOKEN}` } }
        );

        return await manejarRespuesta(response);
    } catch (error) {
        console.error("Error al obtener tipos de empresa:", error);
        return [];
    }
}