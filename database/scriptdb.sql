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

