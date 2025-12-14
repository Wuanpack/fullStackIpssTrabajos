<?php

include_once '../common/database.php';
include_once '../common/response.php';
include_once '../common/validators.php';


class EmpresaTipo{
    private $id;
    private $nombre;
    private $codigo;
    private $iconoId;
    private $colorId;
    private $activo;

    private function buildBaseQuery() {
        return "
            SELECT 
                et.id AS tipo_id,
                et.nombre AS tipo_nombre,
                et.codigo AS tipo_codigo,
                et.activo AS tipo_activo,
                i.fontawesome AS icono_fontawesome,
                c.tailwind AS color_tailwind,
                c.css AS color_css
            FROM empresa_tipo et
            LEFT JOIN icono i ON i.id = et.icono_id
            LEFT JOIN color c ON c.id = et.color_id
        ";
    }

    private function formatResult($row) {
        return [
            "id" => intval($row["tipo_id"]),
            "nombre" => $row["tipo_nombre"],
            "codigo" => $row["tipo_codigo"],
            "icono" => ["FontAwesome" => $row["icono_fontawesome"]],
            "color" => [
                "Tailwind" => $row["color_tailwind"],
                "css" => $row["color_css"]
            ],
            "activo" => $row["tipo_activo"] == 1
        ];
    }

    public function __construct(){}

    // ACCESADORES
    public function getId(){return $this->id;}
    public function getNombre(){return $this->nombre;}
    public function getCodigo(){return $this->codigo;}
    public function getIconoId(){return $this->iconoId;}
    public function getColorId(){return $this->colorId;}
    public function getActivo(){return $this->activo;}

    // MUTADORES
    public function setId($_n){$this->id = $_n;}
    public function setNombre($_n){$this->nombre = $_n;}
    public function setCodigo($_n){$this->codigo = $_n;}
    public function setIconoId($_n){$this->iconoId = $_n;}
    public function setColorId($_n){$this->colorId = $_n;}
    public function setActivo($_n){$this->activo = $_n;}

    public function getAll() {
        $lista = [];
        $con = new Conexion();
        $conn = $con->getConnection();

        $query = $this->buildBaseQuery() . " ORDER BY et.id ASC";
        
        try {
            $rs = mysqli_query($conn, $query);
            
            if ($rs) {
                while ($row = mysqli_fetch_assoc($rs)) {
                    $lista[] = $this->formatResult($row);
                }
                mysqli_free_result($rs);
            }
        } catch (Throwable $th) {
            error_log('Error en getAll: ' . $th->getMessage());
        } finally {
            $con->closeConnection();
        }
        return $lista;
    }

    public function getById(EmpresaTipo $_actual) {
        $con = new Conexion();
        $conn = $con->getConnection();

        $query = $this->buildBaseQuery() . " WHERE et.id = ? LIMIT 1";
        
        try {
            $stmt = $conn->prepare($query);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            
            $id = $_actual->getId();
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $rs = $stmt->get_result();

            if ($row = $rs->fetch_assoc()) {
                $stmt->close();
                return $this->formatResult($row);
            }
            
            $stmt->close();
        } catch (Throwable $th) {
            error_log('Error en getById: ' . $th->getMessage());
        } finally {
            $con->closeConnection();
        }
        
        return null;
    }

    public function add(EmpresaTipo $nuevo): bool {
        $db = new Conexion();
        $conn = $db->getConnection();

        $stmt = $conn->prepare(
            "INSERT INTO empresa_tipo (nombre, codigo, icono_id, color_id)
            VALUES (?, ?, ?, ?)"
        );

        $nombre  = $nuevo->getNombre();
        $codigo  = $nuevo->getCodigo();
        $iconoId = $nuevo->getIconoId();
        $colorId = $nuevo->getColorId();

        $stmt->bind_param("ssii", $nombre, $codigo, $iconoId, $colorId);

        $ok = $stmt->execute();
        $stmt->close();
        $db->closeConnection();

        return $ok;
    }

    public function update(EmpresaTipo $nuevo): bool {
        $db = new Conexion();
        $conn = $db->getConnection();

        $stmt = $conn->prepare(
            "UPDATE empresa_tipo
            SET nombre = ?, codigo = ?, icono_id = ?, color_id = ?
            WHERE id = ?"
        );

        $nombre  = $nuevo->getNombre();
        $codigo  = $nuevo->getCodigo();
        $iconoId = $nuevo->getIconoId();
        $colorId = $nuevo->getColorId();
        $id      = $nuevo->getId();

        $stmt->bind_param("ssiii", $nombre, $codigo, $iconoId, $colorId, $id);

        $ok = $stmt->execute();
        $stmt->close();
        $db->closeConnection();

        return $ok;
    }

private function setStatus(int $status) {
    $db = new Conexion();
    $conn = $db->getConnection();

    try {
        $stmt = $conn->prepare(
            "UPDATE empresa_tipo SET activo = ? WHERE id = ?"
        );
        $stmt->bind_param("ii", $status, $this->id);
        $ok = $stmt->execute();
        $stmt->close();
        return $ok;
    } catch (Throwable $th) {
        error_log("Error setStatus empresaTipo: " . $th->getMessage());
        return false;
    } finally {
        $db->closeConnection();
    }
}

public function disable() { return $this->setStatus(0); }
public function enable()  { return $this->setStatus(1); }

}

function getOrCreateIconoId(string $fontawesome): int {
    $db = new Conexion();
    $conn = $db->getConnection();

    // Buscar
    $stmt = $conn->prepare("SELECT id FROM icono WHERE fontawesome = ?");
    $stmt->bind_param("s", $fontawesome);
    $stmt->execute();
    $rs = $stmt->get_result();

    if ($row = $rs->fetch_assoc()) {
        $stmt->close();
        return (int)$row['id'];
    }
    $stmt->close();

    // Crear
    $stmt = $conn->prepare("INSERT INTO icono (fontawesome) VALUES (?)");
    $stmt->bind_param("s", $fontawesome);
    $stmt->execute();
    $id = $stmt->insert_id;
    $stmt->close();

    $db->closeConnection();
    return $id;
}

function getOrCreateColorId(string $tailwind, string $css): int {
    $db = new Conexion();
    $conn = $db->getConnection();

    // Buscar
    $stmt = $conn->prepare(
        "SELECT id FROM color WHERE tailwind = ? AND css = ?"
    );
    $stmt->bind_param("ss", $tailwind, $css);
    $stmt->execute();
    $rs = $stmt->get_result();

    if ($row = $rs->fetch_assoc()) {
        $stmt->close();
        return (int)$row['id'];
    }
    $stmt->close();

    // Crear
    $stmt = $conn->prepare(
        "INSERT INTO color (tailwind, css) VALUES (?, ?)"
    );
    $stmt->bind_param("ss", $tailwind, $css);
    $stmt->execute();
    $id = $stmt->insert_id;
    $stmt->close();

    $db->closeConnection();
    return $id;
}

function saveEmpresaTipo(object $body, bool $isUpdate): void {

    if ($isUpdate && !isset($body->id)) {
        sendJsonResponse(400, null, null, "Debe indicar el ID");
        die();
    }

    if (!isset($body->nombre) || trim($body->nombre) === "") {
        sendJsonResponse(400, null, null, "El nombre es obligatorio");
        die();
    }

    if (!isset($body->codigo) || trim($body->codigo) === "") {
        sendJsonResponse(400, null, null, "El código es obligatorio");
        die();
    }

    $nombre = trim($body->nombre);
    $codigo = trim($body->codigo);

    if (empresaTipoNombreExiste($nombre, $body->id ?? null)) {
        sendJsonResponse(409, null, null, "El nombre ya existe");
        die();
    }

    if (empresaTipoCodigoExiste($codigo, $body->id ?? null)) {
        sendJsonResponse(409, null, null, "El código ya existe");
        die();
    }

    $iconoId = null;
    if (isset($body->icono->FontAwesome)) {
        $fa = trim($body->icono->FontAwesome);
        $iconoId = getOrCreateIconoId($fa);
    }

    $colorId = null;
    if (isset($body->color->Tailwind, $body->color->css)) {
        $tailwind = trim($body->color->Tailwind);
        $css      = trim($body->color->css);
        $colorId = getOrCreateColorId($tailwind, $css);
    }

    if ($isUpdate) {

        $actual = new EmpresaTipo();
        $actual->setId($body->id);
        $dataActual = $actual->getById($actual);

        if (!$dataActual) {
            sendJsonResponse(404, null, null, "Recurso no encontrado");
            die();
        }

        $sinCambios =
            $dataActual['nombre'] === $nombre &&
            $dataActual['codigo'] === $codigo &&
            ($dataActual['icono']['FontAwesome'] ?? null) === ($body->icono->FontAwesome ?? null) &&
            ($dataActual['color']['Tailwind'] ?? null) === ($body->color->Tailwind ?? null) &&
            ($dataActual['color']['css'] ?? null) === ($body->color->css ?? null);

        if ($sinCambios) {
            sendJsonResponse(409, null, null, "No hay cambios para actualizar");
            die();
        }
    }
    // Modelo
    $modelo = new EmpresaTipo();

    if ($isUpdate) {
        $modelo->setId($body->id);
    }

    $modelo->setNombre($nombre);
    $modelo->setCodigo($codigo);
    $modelo->setIconoId($iconoId);
    $modelo->setColorId($colorId);

    $ok = $isUpdate
        ? $modelo->update($modelo)
        : $modelo->add($modelo);

    if ($ok) {
        sendJsonResponse($isUpdate ? 200 : 201);
        die();
    }

    sendJsonResponse(500, null, null, "No se pudo guardar el recurso");
}


/**
 * Busca un registro por ID
 */
function findById(array $data, string $id): ?array {
    foreach ($data as $registro) {
        if ($registro['id'] == $id) {
            return $registro;
        }
    }
    return null;
}

/**
 * Maneja las peticiones GET
 */
function handleGetRequest(array $data, ?string $id): void {
    if ($id !== null) {
        $registro = findById($data, $id);
        if ($registro === null) {
            sendJsonResponse(404);
            return;
        }
        sendJsonResponse(200, $registro);
        return;
    }
    sendJsonResponse(200, $data);
    die();
}

/**
 * Maneja las peticiones POST
 */
function handlePostRequest(): void {
    $body = json_decode(file_get_contents("php://input"));
    saveEmpresaTipo($body, false);
}

/**
 * Maneja las peticiones PUT
 */
function handlePutRequest(): void {
    $body = json_decode(file_get_contents("php://input"));
    saveEmpresaTipo($body, true);
}

/**
 * Maneja las peticiones DELETE
 */
function handleDeleteRequest(?string $id): void {
    if ($id === null) {
        sendJsonResponse(400, null, null, "Debe especificar un ID en la URL");
        die();
    }

    $modelo = new EmpresaTipo();
    $modelo->setId($id);

    $respuesta = $modelo->disable();

    if ($respuesta) {
        sendJsonResponse(200);
        die();
    }

    sendJsonResponse(501);
    die();
}

/**
 * Maneja las peticiones PATCH
 */
function handlePatchRequest(?string $id): void {
    if ($id === null) {
        sendJsonResponse(400, null, null, "Debe especificar un ID en la URL");
        die();
    }

    $modelo = new EmpresaTipo();
    $modelo->setId($id);

    $respuesta = $modelo->enable();

    if ($respuesta) {
        sendJsonResponse(200);
        die();
    }

    sendJsonResponse(501);
    die();
}



/**
 * Procesa la petición principal
 */
function procesarPeticion(string $method, ?string $id, array $data): void {
    // Validar autenticación
    if (!validateAuth()) {
        return;
    }

    
    // Procesar según el método HTTP
    switch ($method) {
        case 'GET':
            handleGetRequest($data, $id);
            break;
            
        case 'POST':
            handlePostRequest();
            break;

        case 'DELETE':
            handleDeleteRequest($id);
            break;

        case 'PATCH':
            handlePatchRequest($id);
            break;

        case 'PUT':
            handlePutRequest();
            break;

        default:
            sendJsonResponse(501, null, $method);
            break;
    }
}

$modelo = new EmpresaTipo();
$dataEmpresaTipo = $modelo->getAll();

procesarPeticion($method, $id, $dataEmpresaTipo);
exit();
?>