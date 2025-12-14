## Evaluación N°3 Desarrollo Frontend
## Docente: Sebastián Cabezas Ríos
## Estudiante: Alonso Garcia Espinoza

## Estructura del Proyecto

frontend/
├── index.php # Landing principal (punto de entrada)
├── assets/
│ ├── css/
│ │ └── styles.css # Estilos globales y componentes
│ └── js/
│     ├── api.js # Consumo de la API REST (fetch + token)
│     ├── app.js # Punto de arranque de la aplicación
│     └── components/
│          ├── CardEmpresa.js # Componente tarjeta de empresa
│          ├── BadgeTipo.js # Componente badge de tipo de empresa
│          ├── RenderListado.js # Renderizado dinámico del listado
│          ├── EmptyState.js
│          ├── FormularioEmpresa.js
│          ├── FormularioEditarTipo.js
│          ├── ModalEmpresa.js
│          ├── ModalEditarEmpresa.js
│          ├── ToggleEstado.js
│          └── utils.js 
├── docs/
│ └── buenas_practicas.md # Documentación de buenas prácticas
└── README.md

## Generalidades

Este proyecto corresponde al **Frontend de la Evaluación N°3 de Desarrollo**, cuyo objetivo es consumir una **API REST desarrollada en PHP**, renderizando dinámicamente la información de empresas mediante **JavaScript puro (Vanilla JS)** y manipulación directa del DOM.

La aplicación implementa un enfoque **modular**, separando responsabilidades entre consumo de datos, renderizado de componentes y estilos, cumpliendo criterios de **usabilidad, accesibilidad y buenas prácticas de desarrollo frontend**.



## Tecnologías Utilizadas

- PHP (para servir la landing)
- JavaScript ES Modules (Vanilla JS)
- HTML5 Semántico
- CSS3 (Variables CSS y Grid)
- Bootstrap 5 (solo para normalización y soporte visual)
- Font Awesome (iconografía)
- API REST desarrollada en Backend (Evaluación U3 Backend)



## Requisitos

- Navegador moderno compatible con ES Modules
- Servidor local (XAMPP, Apache, similar)
- API Backend funcionando localmente
- Token de autenticación válido



## Instalación y Ejecución

1. **Ubicación del proyecto**
   - Copiar la carpeta `frontend` dentro de:
     ```
     C:\xampp\htdocs\
     ```

2. **Verificar Backend**
   - Asegurarse de que la API Backend esté levantada y accesible en:
     ```
     http://localhost/api/api/v1/gestores.php
     ```

3. **Configuración de API**
   - En `assets/js/api.js`, verificar:
     ```js
     const API_URL = "http://localhost/api/api/v1/gestores.php";
     const TOKEN = "ipss.2025.T3";
     ```

4. **Ejecutar aplicación**
   - Ingresar desde el navegador a:
     ```
     http://localhost/frontend/index.php
     ```



## Arquitectura de Componentes

### `CardEmpresa()`
Componente encargado de construir la tarjeta completa de una empresa:
- Usa `<article>` semántico
- Aplica estilos dinámicos mediante variables CSS
- Integra el componente `BadgeTipo`
- Muestra nombre y estado de la empresa

### `BadgeTipo()`
Componente visual del tipo de empresa:
- Renderiza ícono FontAwesome dinámico
- Aplica color dinámico recibido desde la API
- Garantiza contraste y accesibilidad
- Usa atributos ARIA cuando corresponde

### `RenderListado()`
- Recibe el arreglo de empresas
- Renderiza dinámicamente las tarjetas
- Maneja estados vacíos y errores de carga
- Evita plantillas HTML estáticas

### `Otros Componentes`

EmptyState.js: Muestra mensaje cuando no hay empresas.

FormularioEmpresa.js y FormularioEditarTipo.js: Formularios para crear/editar empresas.

ModalEmpresa.js y ModalEditarEmpresa.js: Ventanas modales para formularios.

ToggleEstado.js: Botón dinámico para activar/desactivar empresas con actualización en tiempo real.

## Manejo de Errores

La aplicación contempla:
- Endpoint caído o inaccesible
- Respuesta JSON malformada
- Respuesta sin datos
- Renderizado seguro ante valores nulos

Todos los errores se gestionan de forma centralizada en `api.js` y se reflejan correctamente en la interfaz.



## Accesibilidad y Usabilidad

- Uso de HTML semántico (`main`, `section`, `article`, `header`)
- Contraste de colores adecuado
- Navegación clara y legible
- Uso de `aria-label` y `aria-hidden` cuando corresponde
- Estados visuales coherentes y consistentes



## Control de Versiones

Este proyecto fue versionado utilizando **Git**, cumpliendo con los requisitos de la evaluación:

- Repositorio local/remoto
- Mínimo 6 commits significativos
- Mensajes descriptivos
- Estructura organizada del proyecto

Ejemplos de commits:
- Estructura inicial del frontend y landing principal
- Implementación consumo API
- Creación componentes JS
- Mejora de estilos y accesibilidad
- Documentación y buenas prácticas



## Observaciones Finales

Este frontend fue desarrollado para integrarse directamente con la API creada en la Evaluación de Backend, cumpliendo con todos los criterios técnicos y formales establecidos en la rúbrica de la Unidad 3.

Se priorizó:
- Claridad de código
- Separación de responsabilidades
- Escalabilidad
- Buenas prácticas profesionales


## git log

commit 3ae16981048ddafc21e672220d038b0897c217cd (HEAD -> main, origin/main)
Author: Wuanpack <alonso.garcia.x@gmail.com>
Date:   Sat Dec 13 23:25:21 2025 -0300

    Creacion de cards de empresas

commit 191c0978748ed83c7b37f5346b4b7585858ed0fe
Author: Wuanpack <alonso.garcia.x@gmail.com>
Date:   Sat Dec 13 23:24:59 2025 -0300

    Creacion de formularios

commit 8158dbc872b4fbec9a3a66477f0abb514bb93f69
Author: Wuanpack <alonso.garcia.x@gmail.com>
Date:   Sat Dec 13 23:24:36 2025 -0300

    Creacion de modales

commit 5bf03faca6b8d13f2649d852222a06937ff8a3b4
Author: Wuanpack <alonso.garcia.x@gmail.com>
Date:   Sat Dec 13 23:23:43 2025 -0300

    Aplicacion de estilos

commit 7f79c1675342fa6474c73b96c7a258c4350b5be9
Author: Wuanpack <alonso.garcia.x@gmail.com>
Date:   Sat Dec 13 23:23:24 2025 -0300

    Conexion con la API

commit f06af57ab63e557a5a1f82b9c4e3fd4fcfc29212
Author: Wuanpack <alonso.garcia.x@gmail.com>
Date:   Sat Dec 13 23:22:10 2025 -0300

    Estructura del proyecto

commit 748ba0ac724aa2dcf2fa27a923981352a486f1ad
Author: Wuanpack <alonso.garcia.x@gmail.com>
Date:   Sat Dec 13 23:12:47 2025 -0300

    Estructura del Proyecto