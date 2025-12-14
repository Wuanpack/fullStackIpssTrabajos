const API_URL = "http://localhost/api/api/v1/gestores.php";
const TOKEN = "ipss.2025.T3";

export async function obtenerEmpresas() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
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

export async function activarGestor(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });

        return response.ok;
    } catch (error) {
        console.error("Error al activar gestor:", error);
        return false;
    }
}

export async function desactivarGestor(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: "DELETE",
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

export async function crearGestor(data) {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(r => r.ok);
}

export async function actualizarGestor(id, data) {
    return fetch(`${API_URL}?id=${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(r => r.ok);
}

export async function obtenerTiposEmpresa() {
    try {
        const response = await fetch(
            "http://localhost/api/api/v1/empresaTipo.php",
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

