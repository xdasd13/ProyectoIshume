CREATE DATABASE dbgaleria;
USE dbgaleria;

-- Tabla de categorías
CREATE TABLE categorias(
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nomCategoria VARCHAR(50) NOT NULL,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaModificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla de servicios
CREATE TABLE servicios(
    idServicio INT AUTO_INCREMENT PRIMARY KEY,
    nomServicio VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imgReferencia VARCHAR(255) NOT NULL,
    disponible ENUM('activo', 'inactivo') DEFAULT 'activo',
    idCategoria INT NOT NULL,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaModificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria)
) ENGINE=InnoDB;

-- Tabla de usuarios
CREATE TABLE usuarios(
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'usuario') DEFAULT 'usuario',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaUltimoAcceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla de citas
CREATE TABLE citas(
    idCita INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idServicio INT NOT NULL,
    fechaCita DATETIME NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaModificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario),
    FOREIGN KEY (idServicio) REFERENCES servicios(idServicio)
) ENGINE=InnoDB;

-- Tabla de comentarios
CREATE TABLE comentarios(
    idComentario INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idServicio INT NOT NULL,
    comentario TEXT NOT NULL,
    valoracion INT CHECK (valoracion >= 1 AND valoracion <= 5),
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaModificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario),
    FOREIGN KEY (idServicio) REFERENCES servicios(idServicio)
) ENGINE=InnoDB;

-- Insertar categorías
INSERT INTO categorias (nomCategoria) VALUES 
('Retratos'),
('Productos'),
('Edición Digital');


-- Insertar servicios (asociados a las categorías)
INSERT INTO servicios (nomServicio, descripcion, precio, imgReferencia, disponible, idCategoria)
VALUES 
('Retrato Artístico', 'Sesión fotográfica personalizada en estudio con fondo artístico.', 120.00, 'img/retrato_artistico.jpg', 'activo', 1),
('Fotografía de Producto', 'Captura profesional de productos para e-commerce o catálogos.', 90.00, 'img/fotografia_producto.jpg', 'activo', 2),
('Edición Digital', 'Retoque y edición profesional de fotografías digitales.', 60.00, 'img/edicion_digital.jpg', 'activo', 3);

-- Insertar usuarios
INSERT INTO usuarios (nombre, apellido, email, contrasena, rol, estado)
VALUES 
('Lucía', 'Gómez', 'lucia.gomez@example.com', SHA2('lucia123', 256), 'usuario', 'activo'),
('Carlos', 'Ramírez', 'carlos.ramirez@example.com', SHA2('carlos123', 256), 'usuario', 'activo'),
('Admin', 'Galeria', 'admin@galeria.com', SHA2('admin123', 256), 'admin', 'activo');

-- Insertar citas
INSERT INTO citas (idUsuario, idServicio, fechaCita, estado)
VALUES 
(1, 1, '2025-05-10 14:00:00', 'confirmada'),
(2, 2, '2025-05-12 16:00:00', 'pendiente');

-- Insertar comentarios
INSERT INTO comentarios (idUsuario, idServicio, comentario, valoracion)
VALUES 
(1, 1, 'El retrato quedó increíble, muy profesional.', 5),
(2, 2, 'Buen trabajo en general, aunque esperaba más iluminación.', 4);

-- Consulta de servicios con comentarios y categorías
SELECT 
    s.idServicio,
    s.nomServicio,
    cat.nomCategoria,
    u.nombre AS nombreUsuario,
    u.apellido AS apellidoUsuario,
    c.fechaCita,
    com.comentario,
    com.valoracion
FROM servicios s
JOIN categorias cat ON s.idCategoria = cat.idCategoria
JOIN citas c ON s.idServicio = c.idServicio
JOIN usuarios u ON c.idUsuario = u.idUsuario
LEFT JOIN comentarios com 
    ON com.idUsuario = u.idUsuario 
   AND com.idServicio = s.idServicio
ORDER BY s.nomServicio, c.fechaCita;