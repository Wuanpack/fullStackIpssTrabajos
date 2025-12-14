## Evaluación N°3 Desarrollo BackEnd
## Docente: Sebastián Cabezas Ríos
## Estudiante: Alonso Garcia Espinoza



## Estructura del Proyecto

\`\`\`
api/
├── common/                  # Configuraciones y autenticación
│   └── database.php         # Maneja la conexión a la base de datos
│   └── response.php         # Funciones para enviar respuestas JSON y manejar códigos de estado HTTP
│   └── validators.php     # Contiene funciones de validación, como la validación del token de autenticación y las comprobaciones de existencia de datos
├── v1/
│   └── empresaTipo.php      # Contiene la lógica para gestionar los tipos de empresa (crear, leer, actualizar, eliminar)
│   └── gestores.php         # Contiene la lógica para gestionar los gestores asociados a las empresas
│
└── database.sql             # Modelo de la Base de Datos Utilizada
\`\`\`

## Generalidades ##

Este proyecto es una API RESTful desarrollada en PHP para gestionar recursos relacionados con `EmpresaTipo` y `Gestores`. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los tipos de empresa y sus gestores, con un enfoque en la validación de datos y la autenticación mediante token.

## Requisitos

- PHP 7.4 o superior
- MySQL 5.7 o superior
- XAMPP o cualquier servidor compatible con PHP y MySQL

## Instalación

1. **Clona o descarga el repositorio**:
    - XAMPP: con XAMPP instalado, pegar la carpeta 'api' dentro de 'htdocs'
    - C:\xampp\htdocs\api
    - Partir servidor Apache y base de datos MySQL e ingresar al localhost
    - Navegar hasta los endpoints y realizar peticiones como se indica a continuación
    - Las peticiones disponibles son GET, POST, PATCH, DELETE y PUT
    - Las peticiones GET, DELETE y PATCH usan el id proporcionado en la url (?id={id})
    - Las peticiones POST y PUT reciben un body json

2. **Configuración de la base de datos**:
   - Asegúrate de tener una base de datos MySQL disponible.
   - Importa el esquema SQL proporcionado.

3. **Configuración de la conexión a la base de datos**:
   - Ve a `database.php` y modifica las siguientes líneas con tus credenciales de base de datos:
     ```php
     $this->host = '127.0.0.1';
     $this->port = 3306;
     $this->db = 'ipsstests'; // Cambia el nombre de la base de datos
     $this->username = 'ipssTests'; // Cambia el nombre de usuario
     $this->password = 'ipss_12345'; // Cambia la contraseña
     ```

4. **Configuración de autenticación**:
   - En `validators.php`, ajusta el token de autenticación según sea necesario:
     ```php
     define('AUTH_TOKEN', 'ipss.2025.T3');  // Cambia por tu token deseado
     ```

## Endpoints de la API

### `GET /empresaTipo.php`

Obtiene todos los tipos de empresa

#### Respuesta:
- **200 OK**: Devuelve un array con todos los tipos de empresa.
- **404 Not Found**: Si no se encuentran tipos de empresa.

### `GET /empresaTipo.php?id={id}`

Obtiene un tipo de empresa por su ID

#### Parámetros:
- `id` (requerido): ID del tipo de empresa.

#### Respuesta:
- **200 OK**: Devuelve los detalles del tipo de empresa.
- **404 Not Found**: Si no se encuentra el tipo de empresa.

### `POST /empresaTipo.php`

Agrega un nuevo Tipo de Empresa

body raw:
{
  "nombre": "Nombre del Tipo de Empresa",
  "codigo": "Código de Empresa",
  "icono": {
    "FontAwesome": "fa-icon"
  },
  "color": {
    "Tailwind": "bg-gray-100",
    "css": "#f3f4f6"
  }
}

#### Respuesta:

 - **201 Created**: Si la creación fue exitosa.
 - **400 Bad Request**: Si falta algún campo obligatorio.
 - **409 Conflict**: Si el nombre o código de la empresa ya existe.

### `PUT /empresaTipo.php` 

Actualiza un Tipo de Empresa Existente

{
  "id": "Id del Tipo de Empresa a Actualizar",
  "nombre": "Nombre actualizado",
  "codigo": "Código actualizado",
  "icono": {
    "FontAwesome": "fa-new-icon"
  },
  "color": {
    "Tailwind": "bg-new-color",
    "css": "#new-color"
  }
}

#### Respuesta:

 - **200 OK**: Si la actualización fue exitosa.
 - **404 Not Found**: Si no se encuentra el tipo de empresa.
 - **409 Conflict**: Si no hay cambios para actualizar.

### `DELETE /empresaTipo.php?id={id}`

Desactiva (elimina) un tipo de empresa

#### Parámetros

 - **id (requerido)**: ID del tipo de empresa

#### Respuesta

 - **200 OK**: Si la eliminación fue exitosa.
 - **400 Bad Request**: Si no se proporciona un ID.
 - **501 Not Implemented**: Si ocurre un error.

### `PATCH /empresaTipo.php?id={id}`

Activa un tipo de empresa previamente desactivado

#### Parámetros

 - **id (requerido)**: ID del tipo de empresa

#### Respuesta

 - **200 OK**: Si la activación fue exitosa.
 - **400 Bad Request**: Si no se proporciona un ID.
 - **501 Not Implemented**: Si ocurre un error.


### Autenticación

Para interactuar con la API, necesitas proporcionar un token de autenticación en el encabezado de la solicitud.

Auth Type: Bearer Token
Token: ipss.2025.T3