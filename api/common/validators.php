<?php

include_once 'database.php';

/**
 * Obtiene el ID del parámetro de la URL
 */
function getIdFromQuery(string $paramName = 'id'): ?string {
    return $_GET[$paramName] ?? null;
}

/**
 * Valida la autenticación Bearer token
 */
function validateAuth(): bool {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? null;
    
    if (!$auth) {
        sendJsonResponse(401);
        return false;
    }
    
    if ($auth !== 'Bearer ' . AUTH_TOKEN) {
        sendJsonResponse(403);
        return false;
    }
    
    return true;
}


/**
 * Valida la existencia del nombre de una empresa
 */

function empresaByNombreExiste($nombre) {
    $con = new Conexion();
    $conn = $con->getConnection();

    $query = "SELECT id FROM empresa WHERE nombre = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $rs = $stmt->get_result();

    $existe = $rs->num_rows > 0;

    $stmt->close();
    $con->closeConnection();

    return $existe;
}

function getIdEmpresaByNombre(string $nombre): ?int {
    $db = new Conexion();
    $conn = $db->getConnection();

    $stmt = $conn->prepare("SELECT id FROM empresa WHERE nombre = ?");
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $rs = $stmt->get_result();

    if ($row = $rs->fetch_assoc()) {
        return (int)$row['id'];
    }

    return null;
}

/**
 * Verifica que un nombre de empresa tenga un ID asociado y lo retorna
 */


function getIdEmpresaTipoByNombre(string $nombre): ?int {
    $db = new Conexion();
    $conn = $db->getConnection();

    $stmt = $conn->prepare("SELECT id FROM empresa_tipo WHERE nombre = ?");
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $rs = $stmt->get_result();

    if ($row = $rs->fetch_assoc()) {
        return (int)$row['id'];
    }

    return null;
}

function empresaTipoNombreExiste(string $nombre, ?int $excludeId = null): bool {
    $db = new Conexion();
    $conn = $db->getConnection();

    if ($excludeId) {
        $stmt = $conn->prepare(
            "SELECT id FROM empresa_tipo WHERE nombre = ? AND id != ?"
        );
        $stmt->bind_param("si", $nombre, $excludeId);
    } else {
        $stmt = $conn->prepare(
            "SELECT id FROM empresa_tipo WHERE nombre = ?"
        );
        $stmt->bind_param("s", $nombre);
    }

    $stmt->execute();
    $rs = $stmt->get_result();
    $exists = $rs->num_rows > 0;

    $stmt->close();
    $db->closeConnection();

    return $exists;
}

function empresaTipoCodigoExiste(string $codigo, ?int $excludeId = null): bool {
    $db = new Conexion();
    $conn = $db->getConnection();

    if ($excludeId) {
        $stmt = $conn->prepare(
            "SELECT id FROM empresa_tipo WHERE codigo = ? AND id != ?"
        );
        $stmt->bind_param("si", $codigo, $excludeId);
    } else {
        $stmt = $conn->prepare(
            "SELECT id FROM empresa_tipo WHERE codigo = ?"
        );
        $stmt->bind_param("s", $codigo);
    }

    $stmt->execute();
    $rs = $stmt->get_result();
    $exists = $rs->num_rows > 0;

    $stmt->close();
    $db->closeConnection();

    return $exists;
}

function getIconoIdByFontawesome(string $fa): ?int {
    $db = new Conexion();
    $conn = $db->getConnection();

    $stmt = $conn->prepare("SELECT id FROM icono WHERE fontawesome = ?");
    $stmt->bind_param("s", $fa);
    $stmt->execute();
    $rs = $stmt->get_result();

    $id = null;
    if ($row = $rs->fetch_assoc()) {
        $id = (int)$row['id'];
    }

    $stmt->close();
    $db->closeConnection();
    return $id;
}

function getColorIdByValues(string $tailwind, string $css): ?int {
    $db = new Conexion();
    $conn = $db->getConnection();

    $stmt = $conn->prepare(
        "SELECT id FROM color WHERE tailwind = ? AND css = ?"
    );
    $stmt->bind_param("ss", $tailwind, $css);
    $stmt->execute();
    $rs = $stmt->get_result();

    $id = null;
    if ($row = $rs->fetch_assoc()) {
        $id = (int)$row['id'];
    }

    $stmt->close();
    $db->closeConnection();
    return $id;
}