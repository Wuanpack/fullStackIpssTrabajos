DROP TABLE IF EXISTS empresa;
DROP TABLE IF EXISTS empresa_tipo;
DROP TABLE IF EXISTS icono;
DROP TABLE IF EXISTS color;

CREATE TABLE icono(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fontawesome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE color(
    id INT PRIMARY KEY AUTO_INCREMENT,
    tailwind VARCHAR(50) NOT NULL UNIQUE,
    css VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE empresa_tipo(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    codigo CHAR(2) NOT NULL UNIQUE,
    icono_id INT,
    color_id INT,
    FOREIGN KEY (icono_id) REFERENCES icono(id),
    FOREIGN KEY (color_id) REFERENCES color(id)
);

CREATE TABLE empresa(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL UNIQUE,
    empresa_tipo_id INT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (empresa_tipo_id) REFERENCES empresa_tipo(id)
);

INSERT INTO icono (fontawesome)
VALUES ('fa-recycle'),
       ('fa-industry'),
       ('fa-user-tie'),
       ('fa-truck'),
       ('fa-globe-americas');

INSERT INTO color (tailwind, css)
VALUES ('bg-green-100', 'rgb(220,252,231)'),
       ('bg-blue-100', '#eff6ff'),
       ('bg-gray-100', '#f3f4f6'),
       ('bg-yellow-100', 'rgb(254,249,195)'),
       ('bg-purple-100', 'rgb(243,232,255)');

INSERT INTO empresa_tipo (nombre, codigo, icono_id, color_id)
VALUES ('Reciclador de Base', 'R', 1, 1),
       ('Valorizador', 'V', 2, 2),
       ('Consultor', 'C', 3, 3),
       ('Transportista', 'T', 4, 4),
       ('Gestor Integral', 'G', 5, 5);

INSERT INTO empresa (nombre, empresa_tipo_id, activo)
VALUES ('Reciclajes Santiago Ltda.', 1, TRUE),
       ('Valorizaciones Globales S.A.', 2, TRUE),
       ('Consultores Ambientales XYZ', 3, TRUE),
       ('Transportes Ecológicos', 4, TRUE),
       ('Gestión Integral Verde', 5, TRUE);



-- CONSULTA GESTORES
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


-- CONSULTA TIPO EMPRESAS

SELECT 
    et.id AS tipo_id,
    et.nombre AS tipo_nombre,
    et.codigo AS tipo_codigo,
    i.fontawesome AS icono_fontawesome,
    c.tailwind AS color_tailwind,
    c.css AS color_css
FROM empresa_tipo et
LEFT JOIN icono i ON i.id = et.icono_id
LEFT JOIN color c ON c.id = et.color_id;