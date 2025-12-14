<?php

include_once '../common/database.php';
include_once '../common/response.php';
include_once '../common/validators.php';



class Gestores{
    private $id;
    private $nombre;
    private $empresaTipoId;
    private $iconoId;
    private $colorId;
    private $activo;

    private function buildBaseQuery() {
        return "
            SELECT 
                e.id AS empresa_id,
                e.nombre AS empresa_nombre,
                e.activo AS empresa_activo,
                et.id AS tipo_id,
                et.nombre AS tipo_nombre,
                et.codigo AS tipo_codigo,
                i.fontawesome AS icono_fontawesome,
                c.tailwind AS color_tailwind,
                c.css AS color_css
            FROM empresa e
            INNER JOIN empresa_tipo et ON et.id = e.empresa_tipo_id
            LEFT JOIN icono i ON i.id = et.icono_id
            LEFT JOIN color c ON c.id = et.color_id
        ";
    }

    private function formatResult($row) {
        return [
            "id" => intval($row["empresa_id"]),
            "nombre" => $row["empresa_nombre"],
            "empresa_tipo" => [
                "id" => intval($row["tipo_id"]),
                "nombre" => $row["tipo_nombre"],
                "codigo" => $row["tipo_codigo"],
                "icono" => ["FontAwesome" => $row["icono_fontawesome"]],
                "color" => [
                    "Tailwind" => $row["color_tailwind"],
                    "css" => $row["color_css"]
                ]
            ],
            "activo" => $row["empresa_activo"] == 1
        ];
    }

    public function __construct(){}

    // ACCESADORES
    public function getId(){return $this->id;}
    public function getNombre(){return $this->nombre;}
    public function getEmpresaTipoId(){return $this->empresaTipoId;}
    public function getIconoId(){return $this->iconoId;}
    public function getColorId(){return $this->colorId;}
    public function getActivo(){return $this->activo;}

    // MUTADORES
    public function setId($_n){$this->id = $_n;}
    public function setNombre($_n){$this->nombre = $_n;}
    public function setEmpresaTipoId($_n){$this->empresaTipoId = $_n;}
    public function setIconoId($_n){$this->iconoId = $_n;}
    public function setColorId($_n){$this->colorId = $_n;}
    public function setActivo($_n){$this->activo = $_n;}

    public function getAll() {
        $lista = [];
        $con = new Conexion();
        $conn = $con->getConnection();

        $query = $this->buildBaseQuery() . " ORDER BY e.id ASC";
        
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

    public function getById(Gestores $_actual) {
        $con = new Conexion();
        $conn = $con->getConnection();

        $query = $this->buildBaseQuery() . " WHERE e.id = ? LIMIT 1";
        
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

    public function add(Gestores $_nuevo) {
        $con = new Conexion();
        $conn = $con->getConnection();
        
        $query = "INSERT INTO empresa (nombre, empresa_tipo_id) VALUES (?, ?)";
        
        try {
            $stmt = $conn->prepare($query);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            
            $nombre = $_nuevo->getNombre();
            $empresaTipoId = $_nuevo->getEmpresaTipoId();
            
            $stmt->bind_param("si", $nombre, $empresaTipoId);
            $result = $stmt->execute();
            $stmt->close();
            
            return $result;
        } catch (Throwable $th) {
            error_log('Error al agregar: ' . $th->getMessage());
            return false;
        } finally {
            $con->closeConnection();
        }
    }

    public function update(Gestores $_nuevo) {
        $con = new Conexion();
        $conn = $con->getConnection();
        
        $query = "UPDATE empresa SET empresa_tipo_id = ? WHERE id = ?";
        
        try {
            $stmt = $conn->prepare($query);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            
            $empresaTipoId = $_nuevo->getEmpresaTipoId();
            $id = $_nuevo->getId();
            
            $stmt->bind_param("ii", $empresaTipoId, $id);
            $result = $stmt->execute();
            $stmt->close();
            
            return $result;
        } catch (Throwable $th) {
            error_log('Error al actualizar: ' . $th->getMessage());
            return false;
        } finally {
            $con->closeConnection();
        }
    }

    private function setStatus($status) {
        $con = new Conexion();
        $conn = $con->getConnection();
        
        $query = "UPDATE empresa SET activo = ? WHERE id = ?";
        
        try {
            $stmt = $conn->prepare($query);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            
            $id = $this->getId();
            $stmt->bind_param("ii", $status, $id);
            $result = $stmt->execute();
            $stmt->close();
            
            return $result;
        } catch (Throwable $th) {
            error_log('Error al cambiar estado: ' . $th->getMessage());
            return false;
        } finally {
            $con->closeConnection();
        }
    }

    public function disable() { return $this->setStatus(0); }
    public function enable()  { return $this->setStatus(1); }
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
    include_once '../common/database.php';
    $body = json_decode(file_get_contents("php://input", true));

    //Validaciones

    if (!isset($body->nombre) || trim($body->nombre) === "") {
        sendJsonResponse(400, $data = null, $method = null, $custom = "El nombre es obligatorio");
        die();
    }
    
    if (!isset($body->empresa_tipo->id)) {
        sendJsonResponse(400, $data = null, $method = null, $custom = "Debe especificar empresa_tipo_id");
        die();
    }

    if (empresaByNombreExiste($body->nombre)) {
        sendJsonResponse(409, $data = null, $method = null, $custom = "El nombre de la empresa ya existe");
        die();
    }


    $modelo = new Gestores();
    $modelo->setNombre($body->nombre);
    $modelo->setEmpresaTipoId($body->empresa_tipo->id);

    $respuesta = $modelo->add($modelo);

    if($respuesta){
        sendJsonResponse(201);
        die();
    } 

    sendJsonResponse(501);
    die();

}

/**
 * Maneja las peticiones PUT
 */
function handlePutRequest(): void {
    include_once '../common/database.php';

    
    $body = json_decode(file_get_contents("php://input", true));
    
    // Validaciones
    
    if (!isset($body->nombre)) {
        sendJsonResponse(400, $data = null, $method = null, $custom = "El nombre de la empresa es obligatorio");
        die();
    }
    
    if (!isset($body->empresa_tipo->id)) {
        sendJsonResponse(400, $data = null, $method = null, $custom = "Debe especificar empresa_tipo_id");
        die();
    }

    // Busca ID asociado al nombre
    $idEncontrado = getIdEmpresaByNombre($body->nombre);

    if($idEncontrado === null) {
        sendJsonResponse(404, $data = null, $method = null, $custom = "No se encontró la empresa");
        die();
    }


    $modelo = new Gestores();
    $modelo->setId($idEncontrado);
    $modelo->setEmpresaTipoId($body->empresa_tipo->id);

    $anterior = $modelo->getById($modelo);
    
    if (!$anterior) {
        sendJsonResponse(404);
        die();
    }

    $cantidadCambios = 0;

    if ($anterior['empresa_tipo']['id'] != $modelo->getEmpresaTipoId()) $cantidadCambios++;

    if ($cantidadCambios > 0){
        $respuesta = $modelo->update($modelo);
        if($respuesta){
            sendJsonResponse(200);
            die();
        }
        sendJsonResponse(409);
        die();
    } else {
        sendJsonResponse(409, $data = null, $method = null, $custom = "El ID del tipo de la empresa es el mismo al anterior");
        die();
    }
}

/**
 * Maneja las peticiones DELETE
 */
function handleDeleteRequest(?string $id): void {
    if ($id === null) {
        sendJsonResponse(400, null, null, "Debe especificar un ID en la URL");
        die();
    }

    $modelo = new Gestores();
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

    $modelo = new Gestores();
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

    $modeloGestores = new Gestores();  
    $dataGestores = $modeloGestores->getAll();

procesarPeticion($method, $id, $dataGestores);
exit();
?>