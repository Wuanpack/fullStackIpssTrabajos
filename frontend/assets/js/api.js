// URL base de la API de gestores
const API_URL = "http://localhost/api/api/v1/gestores.php";

// Token de autenticación para la API (Bearer token)
const TOKEN = "ipss.2025.T3";

/**
 * Obtiene todas las empresas desde la API.
 * @returns {Array} Lista de empresas o arreglo vacío en caso de error.
 */
export async function obtenerEmpresas() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                "Authorization": `Bearer ${TOKEN}` // Se envía token para autenticación
            }
        });

        // Si la respuesta no es OK, lanza un error
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Parsear la respuesta JSON
        const json = await response.json();

        // Devuelve la propiedad 'data' o un array vacío si no existe
        return json.data ?? [];
    } catch (error) {
        console.error("Error al consumir la API:", error);
        return []; // Retorna array vacío en caso de fallo
    }
}

/**
 * Activa un gestor específico mediante PATCH.
 * @param {number} id - ID del gestor a activar.
 * @returns {boolean} true si la operación fue exitosa, false en caso contrario.
 */
export async function activarGestor(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: "PATCH", // Método PATCH para modificar parcialmente
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });

        return response.ok; // Devuelve true si la respuesta fue exitosa
    } catch (error) {
        console.error("Error al activar gestor:", error);
        return false;
    }
}

/**
 * Desactiva un gestor específico mediante DELETE.
 * @param {number} id - ID del gestor a desactivar.
 * @returns {boolean} true si la operación fue exitosa, false en caso contrario.
 */
export async function desactivarGestor(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: "DELETE", // Método DELETE para eliminar o desactivar
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });

        return response.ok;
    } catch (error) {
        console.error("Error al desactivar gestor:", error);
        return false;
    }
}

/**
 * Crea un nuevo gestor mediante POST.
 * @param {Object} data - Objeto con los datos del gestor.
 * @returns {boolean} true si la operación fue exitosa.
 */
export async function crearGestor(data) {
    return fetch(API_URL, {
        method: "POST", // Método POST para crear un recurso
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json" // Se envía JSON
        },
        body: JSON.stringify(data) // Convertir objeto JS a JSON
    }).then(r => r.ok); // Devuelve true si la respuesta fue exitosa
}

/**
 * Actualiza un gestor existente mediante PUT.
 * @param {number} id - ID del gestor a actualizar.
 * @param {Object} data - Objeto con los datos a actualizar.
 * @returns {boolean} true si la operación fue exitosa.
 */
export async function actualizarGestor(id, data) {
    return fetch(`${API_URL}?id=${id}`, {
        method: "PUT", // Método PUT para reemplazar o actualizar datos
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(r => r.ok);
}

/**
 * Obtiene los tipos de empresa desde la API.
 * @returns {Array} Lista de tipos de empresa o arreglo vacío en caso de error.
 */
export async function obtenerTiposEmpresa() {
    try {
        const response = await fetch(
            "http://localhost/api/api/v1/empresaTipo.php", // Endpoint específico para tipos
            {
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Error al obtener tipos");
        }

        const json = await response.json();

        return json.data ?? [];
    } catch (error) {
        console.error("Error tipos empresa:", error);
        return [];
    }
}