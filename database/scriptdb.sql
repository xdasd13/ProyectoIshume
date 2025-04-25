CREATE DATABASE galeria;
USE galeria;

-- Tabla de eventos
CREATE TABLE eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250),
    tipo VARCHAR(50)
) ENGINE = InnoDB;

-- Tabla de usuarios (necesaria para comentarios)
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    email VARCHAR(100) UNIQUE,
    rol VARCHAR(50) DEFAULT 'visitante'
) ENGINE = InnoDB;

-- Tabla de fotos
CREATE TABLE fotos (
    id_foto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(70) NOT NULL,
    ruta_archivo VARCHAR(250) NOT NULL,
    descripcion VARCHAR(250),
    fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_evento INT,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE SET NULL
) ENGINE = InnoDB;

-- Tabla de comentarios
CREATE TABLE comentarios (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    comentario VARCHAR(500) NOT NULL,
    fecha_comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    id_foto INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    FOREIGN KEY (id_foto) REFERENCES fotos(id_foto) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Inserción de eventos
INSERT INTO eventos (nombre, descripcion, tipo) VALUES
('Exposición Primavera', 'Muestra fotográfica de paisajes primaverales', 'Exposición'),
('Festival de Retratos', 'Colección de retratos artísticos', 'Festival'),
('Naturaleza Salvaje', 'Fotografías de vida silvestre', 'Exhibición'),
('Urban Stories', 'Escenas urbanas de diferentes ciudades', 'Exposición'),
('Momentos Históricos', 'Capturas de eventos importantes', 'Retrospectiva');

-- Inserción de usuarios
INSERT INTO usuarios (nombre, email, rol) VALUES
('María González', 'maria@ejemplo.com', 'administrador'),
('Carlos López', 'carlos@ejemplo.com', 'fotógrafo'),
('Laura Martínez', 'laura@ejemplo.com', 'editor'),
('Juan Rodríguez', 'juan@ejemplo.com', 'visitante'),
('Ana Sánchez', 'ana@ejemplo.com', 'fotógrafo'),
('Miguel Torres', 'miguel@ejemplo.com', 'visitante'),
('Elena Vázquez', 'elena@ejemplo.com', 'editor');

-- Inserción de fotos
INSERT INTO fotos (nombre, ruta_archivo, descripcion, id_evento) VALUES
('Amanecer en la montaña', '/imagenes/amanecer.jpg', 'Captura del amanecer en la cordillera', 1),
('Retrato en blanco y negro', '/imagenes/retrato_bn.jpg', 'Retrato artístico en escala de grises', 2),
('León en la sabana', '/imagenes/leon.jpg', 'León descansando en la sabana africana', 3),
('Rascacielos de Nueva York', '/imagenes/nyc.jpg', 'Perspectiva de rascacielos en Manhattan', 4),
('Caída del muro de Berlín', '/imagenes/muro.jpg', 'Momento histórico de la caída del muro', 5),
('Atardecer en la playa', '/imagenes/atardecer.jpg', 'Puesta de sol frente al mar', 1),
('Niña sonriendo', '/imagenes/nina.jpg', 'Retrato de una niña con sonrisa natural', 2),
('Flor silvestre', '/imagenes/flor.jpg', 'Macro fotografía de flora local', 3),
('Callejón antiguo', '/imagenes/callejon.jpg', 'Callejón de un pueblo medieval', 4),
('Manifestación pacífica', '/imagenes/manifestacion.jpg', 'Grupo de personas en manifestación', 5);

-- Inserción de comentarios
INSERT INTO comentarios (comentario, id_usuario, id_foto) VALUES
('Increíble captura del amanecer, me encanta la luz natural', 4, 1),
('Los tonos de este retrato son perfectos', 3, 2),
('¡Qué majestuoso se ve este león!', 6, 3),
('La perspectiva hace que los edificios parezcan infinitos', 2, 4),
('Una fotografía que retrata perfectamente ese momento histórico', 1, 5),
('Los colores del cielo son espectaculares', 5, 6),
('Transmite mucha ternura esta imagen', 7, 7),
('El detalle de los pétalos es impresionante', 4, 8),
('Me transporta a otra época', 3, 9),
('Captura muy bien el espíritu del momento', 2, 10),
('La composición es excelente', 1, 1),
('Me gustaría conocer qué técnica usaste para este retrato', 5, 2),
('¿Qué distancia focal usaste para esta foto?', 7, 3),
('La arquitectura moderna siempre es un gran tema', 6, 4),
('Una imagen que vale más que mil palabras', 4, 5);

SELECT 
    f.id_foto,
    f.nombre AS nombre_foto,
    f.descripcion AS descripcion_foto,
    f.fecha_subida,
    e.nombre AS nombre_evento,
    e.tipo AS tipo_evento,
    c.comentario,
    c.fecha_comentario,
    u.nombre AS nombre_usuario,
    u.rol AS rol_usuario
FROM 
    fotos f
LEFT JOIN 
    eventos e ON f.id_evento = e.id_evento
LEFT JOIN 
    comentarios c ON f.id_foto = c.id_foto
LEFT JOIN 
    usuarios u ON c.id_usuario = u.id_usuario
ORDER BY 
    f.fecha_subida DESC, c.fecha_comentario DESC;

