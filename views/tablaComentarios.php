<?php
// Configuración de la conexión a la base de datos
$host = "localhost";
$usuario = "root";
$clave = ""; // Cambia esto por tu contraseña si la tienes
$baseDatos = "galeria";

// Crear conexión
$conexion = new mysqli($host, $usuario, $clave, $baseDatos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Consulta para obtener comentarios con información relacionada
$sql = "SELECT 
            c.id_comentario,
            c.comentario,
            c.fecha_comentario,
            u.nombre AS nombre_usuario,
            u.rol AS rol_usuario,
            f.nombre AS nombre_foto,
            f.ruta_archivo,
            e.nombre AS nombre_evento
        FROM 
            comentarios c
        LEFT JOIN 
            usuarios u ON c.id_usuario = u.id_usuario
        LEFT JOIN 
            fotos f ON c.id_foto = f.id_foto
        LEFT JOIN 
            eventos e ON f.id_evento = e.id_evento
        ORDER BY 
            c.fecha_comentario DESC";

$resultado = $conexion->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comentarios - Galería de Fotos</title>
    <style>
        :root {
            --color-white: #ffffff;
            --color-light: #f8f8f8;
            --color-dark: #212121;
            --color-orange: #ff7043;
            --color-orange-light: #ffa270;
            --color-gray: #757575;
            --color-border: #e0e0e0;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', 'Roboto', sans-serif;
        }

        body {
            background-color: var(--color-light);
            color: var(--color-dark);
            line-height: 1.6;
        }

        header {
            background-color: var(--color-dark);
            color: var(--color-white);
            padding: 1.5rem;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: var(--color-orange);
            border-bottom: 2px solid var(--color-orange);
            padding-bottom: 0.5rem;
        }

        .subtitle {
            color: var(--color-orange-light);
            font-size: 1rem;
            margin-bottom: 1rem;
        }

        .comments-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .comment-card {
            background-color: var(--color-white);
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .comment-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .comment-header {
            background-color: var(--color-dark);
            color: var(--color-white);
            padding: 1rem;
            position: relative;
        }

        .comment-photo {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-bottom: 3px solid var(--color-orange);
        }

        .comment-content {
            padding: 1rem;
        }

        .comment-text {
            margin-bottom: 1rem;
            font-size: 1rem;
            color: var(--color-dark);
        }

        .comment-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            color: var(--color-gray);
            border-top: 1px solid var(--color-border);
            padding-top: 0.8rem;
        }

        .user-info {
            display: flex;
            align-items: center;
        }

        .user-role {
            background-color: var(--color-orange);
            color: var(--color-white);
            font-size: 0.7rem;
            padding: 0.2rem 0.5rem;
            border-radius: 12px;
            margin-left: 0.5rem;
        }

        .comment-date {
            color: var(--color-gray);
        }

        .event-tag {
            position: absolute;
            top: 0;
            right: 0;
            background-color: var(--color-orange);
            color: var(--color-white);
            font-size: 0.7rem;
            padding: 0.3rem 0.7rem;
            border-radius: 0 0 0 8px;
        }

        .no-comments {
            text-align: center;
            padding: 2rem;
            color: var(--color-gray);
            grid-column: 1 / -1;
        }

        footer {
            background-color: var(--color-dark);
            color: var(--color-white);
            text-align: center;
            padding: 1rem;
            margin-top: 2rem;
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .comments-container {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
        }

        @media (max-width: 480px) {
            .comments-container {
                grid-template-columns: 1fr;
            }
            
            .container {
                padding: 1rem;
            }
            
            h1 {
                font-size: 1.5rem;
            }
            
            h2 {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>Galería de Fotos</h1>
        <div class="subtitle">Explora los comentarios de nuestra comunidad</div>
    </header>

    <div class="container">
        <h2>Comentarios Recientes</h2>

        <div class="comments-container">
            <?php
            if ($resultado->num_rows > 0) {
                while ($fila = $resultado->fetch_assoc()) {
                    $fechaFormateada = date('d/m/Y H:i', strtotime($fila['fecha_comentario']));
                    $rutaImagen = $fila['ruta_archivo'] ?? '/imagenes/placeholder.jpg';
                    // Asegurarse de que la ruta de la imagen comience con / 
                    if (substr($rutaImagen, 0, 1) !== '/') {
                        $rutaImagen = '/' . $rutaImagen;
                    }
            ?>
                <div class="comment-card">
                    <div class="comment-header">
                        <img src="<?php echo htmlspecialchars($rutaImagen); ?>" alt="<?php echo htmlspecialchars($fila['nombre_foto']); ?>" class="comment-photo">
                        <?php if (!empty($fila['nombre_evento'])): ?>
                            <div class="event-tag"><?php echo htmlspecialchars($fila['nombre_evento']); ?></div>
                        <?php endif; ?>
                    </div>
                    <div class="comment-content">
                        <p class="comment-text"><?php echo htmlspecialchars($fila['comentario']); ?></p>
                        <div class="comment-meta">
                            <div class="user-info">
                                <?php echo htmlspecialchars($fila['nombre_usuario']); ?>
                                <?php if (!empty($fila['rol_usuario'])): ?>
                                    <span class="user-role"><?php echo htmlspecialchars($fila['rol_usuario']); ?></span>
                                <?php endif; ?>
                            </div>
                            <div class="comment-date"><?php echo $fechaFormateada; ?></div>
                        </div>
                    </div>
                </div>
            <?php
                }
            } else {
                echo '<div class="no-comments">No hay comentarios disponibles actualmente.</div>';
            }
            ?>
        </div>
    </div>

    <footer>
        <p>&copy; <?php echo date('Y'); ?> Galería de Fotos - Todos los derechos reservados</p>
    </footer>

    <?php
    // Cerrar conexión
    $conexion->close();
    ?>
</body>
</html>