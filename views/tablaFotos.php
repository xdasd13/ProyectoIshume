<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root"; // 
$password = ""; // 
$dbname = "galeria";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Consulta para obtener todas las fotos con información del evento
$sql = "SELECT f.id_foto, f.nombre, f.ruta_archivo, f.descripcion, 
        f.fecha_subida, f.id_evento, e.nombre as nombre_evento 
        FROM fotos f 
        LEFT JOIN eventos e ON f.id_evento = e.id_evento 
        ORDER BY f.fecha_subida DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería - Gestión de Fotos</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* Paleta de colores: Negro, Naranja y Blanco - Versión más sutil y profesional */
        :root {
            --negro-suave: #1E1E1E;
            --negro-claro: #2D2D2D;
            --naranja-suave: #FF9F45;
            --naranja-claro: #FFB37B;
            --blanco: #FFFFFF;
            --gris-claro: #F5F5F5;
            --gris-medio: #E0E0E0;
            --sombra: rgba(0, 0, 0, 0.1);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background-color: var(--blanco);
            color: #333;
            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
        }
        
        .container {
            width: 95%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }
        
        header {
            background-color: var(--negro-suave);
            color: var(--blanco);
            padding: 20px 0;
            box-shadow: 0 2px 15px var(--sombra);
            position: relative;
        }
        
        .logo {
            display: flex;
            align-items: center;
        }
        
        .logo h1 {
            font-size: 22px;
            font-weight: 500;
            letter-spacing: 0.5px;
            margin-left: 10px;
        }
        
        .logo-accent {
            color: var(--naranja-suave);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header-nav a {
            color: #DDD;
            text-decoration: none;
            margin-left: 20px;
            font-size: 14px;
            transition: color 0.3s;
        }
        
        .header-nav a:hover {
            color: var(--naranja-suave);
        }
        
        main {
            padding: 40px 0;
            background-color: #FCFCFC;
            min-height: calc(100vh - 160px);
        }
        
        .page-title {
            margin-bottom: 30px;
            position: relative;
            color: #333;
            font-weight: 400;
            font-size: 24px;
        }
        
        .page-title::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -8px;
            width: 50px;
            height: 3px;
            background-color: var(--naranja-suave);
        }
        
        .card {
            background-color: var(--blanco);
            border-radius: 8px;
            box-shadow: 0 2px 10px var(--sombra);
            overflow: hidden;
            margin-bottom: 40px;
        }
        
        .card-header {
            padding: 15px 20px;
            background-color: var(--negro-suave);
            color: var(--blanco);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .card-title {
            font-size: 16px;
            font-weight: 500;
        }
        
        .card-body {
            padding: 20px;
        }
        
        .search-container {
            padding: 15px 20px;
            background-color: #f9f9f9;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .search-box {
            display: flex;
            max-width: 400px;
        }
        
        .search-input {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
            outline: none;
            font-size: 14px;
        }
        
        .search-btn {
            background-color: var(--naranja-suave);
            color: white;
            border: none;
            padding: 0 15px;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
        }
        
        .view-options {
            display: flex;
            gap: 10px;
        }
        
        .view-btn {
            background-color: #f2f2f2;
            border: 1px solid #ddd;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            color: #555;
            font-size: 14px;
        }
        
        .view-btn.active {
            background-color: var(--naranja-suave);
            color: white;
            border-color: var(--naranja-suave);
        }
        
        /* Grid de fotos */
        .fotos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            padding: 10px;
        }
        
        .foto-card {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            background-color: white;
        }
        
        .foto-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }
        
        .foto-img-container {
            position: relative;
            height: 180px;
            overflow: hidden;
            background-color: #f5f5f5;
        }
        
        .foto-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }
        
        .foto-card:hover .foto-img {
            transform: scale(1.05);
        }
        
        .foto-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%);
            opacity: 0;
            transition: opacity 0.3s;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 15px;
            color: white;
        }
        
        .foto-card:hover .foto-overlay {
            opacity: 1;
        }
        
        .overlay-actions {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .overlay-btn {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 5px 8px;
            cursor: pointer;
            font-size: 14px;
            backdrop-filter: blur(3px);
            transition: background-color 0.2s;
        }
        
        .overlay-btn:hover {
            background-color: rgba(255, 255, 255, 0.3);
        }
        
        .foto-content {
            padding: 15px;
        }
        
        .foto-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .foto-event {
            font-size: 13px;
            color: #666;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }
        
        .foto-event i {
            margin-right: 5px;
            color: var(--naranja-suave);
        }
        
        .foto-date {
            font-size: 12px;
            color: #888;
            display: flex;
            align-items: center;
        }
        
        .foto-date i {
            margin-right: 5px;
            font-size: 11px;
        }
        
        /* Vista de lista */
        .fotos-list {
            display: none; /* Oculto por defecto, se muestra con JavaScript */
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th {
            background-color: #f9f9f9;
            color: #555;
            font-weight: 500;
            text-align: left;
            padding: 12px 15px;
            font-size: 14px;
            border-bottom: 1px solid #eee;
        }
        
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            color: #333;
            vertical-align: middle;
        }
        
        tr:last-child td {
            border-bottom: none;
        }
        
        tr:hover {
            background-color: rgba(255, 159, 69, 0.05);
        }
        
        .thumb-img {
            width: 60px;
            height: 45px;
            object-fit: cover;
            border-radius: 4px;
        }
        
        .actions {
            display: flex;
            gap: 8px;
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            padding: 6px 12px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
        }
        
        .btn i {
            margin-right: 5px;
            font-size: 12px;
        }
        
        .btn-primary {
            background-color: var(--naranja-suave);
            color: #FFF;
        }
        
        .btn-primary:hover {
            background-color: var(--naranja-claro);
        }
        
        .btn-outline {
            background-color: transparent;
            color: #555;
            border: 1px solid #ddd;
        }
        
        .btn-outline:hover {
            background-color: #f5f5f5;
        }
        
        .empty-msg {
            text-align: center;
            padding: 40px 20px;
            color: #888;
            font-style: italic;
        }
        
        footer {
            background-color: var(--negro-suave);
            color: #999;
            text-align: center;
            padding: 15px 0;
            font-size: 13px;
        }
        
        .pagination {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }
        
        .pagination a {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 3px;
            border-radius: 3px;
            text-decoration: none;
            color: #555;
            background-color: #f5f5f5;
            transition: all 0.2s;
        }
        
        .pagination a:hover {
            background-color: #e0e0e0;
        }
        
        .pagination a.active {
            background-color: var(--naranja-suave);
            color: white;
        }
        
        /* Barra de navegación de migas de pan */
        .breadcrumb {
            display: flex;
            list-style: none;
            margin-bottom: 20px;
            padding: 0;
        }
        
        .breadcrumb li {
            font-size: 14px;
            color: #777;
        }
        
        .breadcrumb li:not(:last-child)::after {
            content: '›';
            margin: 0 8px;
            color: #aaa;
        }
        
        .breadcrumb a {
            color: var(--naranja-suave);
            text-decoration: none;
        }
        
        .breadcrumb a:hover {
            text-decoration: underline;
        }
        
        /* Descripción con límite de líneas */
        .description {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 300px;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <h1>Galería<span class="logo-accent">.</span>Admin</h1>
                </div>
                <div class="header-nav">
                    <a href="#"><i class="fas fa-home"></i> Inicio</a>
                    <a href="#" class="active"><i class="fas fa-image"></i> Fotos</a>
                    <a href="#"><i class="fas fa-calendar-alt"></i> Eventos</a>
                    <a href="#"><i class="fas fa-user"></i> Usuarios</a>
                </div>
            </div>
        </div>
    </header>
    
    <main>
        <div class="container">
            <ul class="breadcrumb">
                <li><a href="#">Inicio</a></li>
                <li>Fotos</li>
            </ul>
            
            <h2 class="page-title">Gestión de Fotos</h2>
            
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Biblioteca de fotos</span>
                    <a href="#" class="btn btn-primary">
                        <i class="fas fa-upload"></i> Subir nueva foto
                    </a>
                </div>
                
                <div class="search-container">
                    <form class="search-box">
                        <input type="text" class="search-input" placeholder="Buscar por nombre...">
                        <button type="submit" class="search-btn">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <div class="view-options">
                        <button id="grid-view-btn" class="view-btn active"><i class="fas fa-th"></i> Cuadrícula</button>
                        <button id="list-view-btn" class="view-btn"><i class="fas fa-list"></i> Lista</button>
                    </div>
                </div>
                
                <div class="card-body">
                    <?php if ($result->num_rows > 0): ?>
                        <!-- Vista de cuadrícula -->
                        <div class="fotos-grid" id="grid-view">
                            <?php while($row = $result->fetch_assoc()): ?>
                                <div class="foto-card">
                                    <div class="foto-img-container">
                                        <?php 
                                        // Si la imagen existe, la mostramos, sino mostramos un placeholder
                                        $ruta_imagen = file_exists("." . $row["ruta_archivo"]) ? $row["ruta_archivo"] : "/imagenes/placeholder.jpg";
                                        ?>
                                        <img src="<?php echo $ruta_imagen; ?>" alt="<?php echo htmlspecialchars($row["nombre"]); ?>" class="foto-img">
                                        <div class="foto-overlay">
                                            <div class="overlay-actions">
                                                <button class="overlay-btn"><i class="fas fa-edit"></i></button>
                                                <button class="overlay-btn"><i class="fas fa-trash-alt"></i></button>
                                                <button class="overlay-btn"><i class="fas fa-expand"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="foto-content">
                                        <h3 class="foto-title"><?php echo htmlspecialchars($row["nombre"]); ?></h3>
                                        <?php if($row["nombre_evento"]): ?>
                                            <div class="foto-event">
                                                <i class="fas fa-calendar-day"></i>
                                                <?php echo htmlspecialchars($row["nombre_evento"]); ?>
                                            </div>
                                        <?php endif; ?>
                                        <div class="foto-date">
                                            <i class="far fa-clock"></i>
                                            <?php echo date("d/m/Y H:i", strtotime($row["fecha_subida"])); ?>
                                        </div>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                            
                            <?php 
                            // Resetear el puntero del resultado para la vista de lista
                            $result->data_seek(0);
                            ?>
                        </div>
                        
                        <!-- Vista de lista (oculta inicialmente) -->
                        <div class="fotos-list" id="list-view" style="display: none;">
                            <table>
                                <thead>
                                    <tr>
                                        <th width="8%">Imagen</th>
                                        <th width="22%">Nombre</th>
                                        <th width="30%">Descripción</th>
                                        <th width="15%">Evento</th>
                                        <th width="10%">Fecha</th>
                                        <th width="15%">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php while($row = $result->fetch_assoc()): ?>
                                        <tr>
                                            <td>
                                                <?php 
                                                // Si la imagen existe, la mostramos, sino mostramos un placeholder
                                                $ruta_imagen = file_exists("." . $row["ruta_archivo"]) ? $row["ruta_archivo"] : "/imagenes/placeholder.jpg";
                                                ?>
                                                <img src="<?php echo $ruta_imagen; ?>" alt="<?php echo htmlspecialchars($row["nombre"]); ?>" class="thumb-img">
                                            </td>
                                            <td><?php echo htmlspecialchars($row["nombre"]); ?></td>
                                            <td class="description"><?php echo htmlspecialchars($row["descripcion"]); ?></td>
                                            <td><?php echo htmlspecialchars($row["nombre_evento"] ?: 'Sin evento'); ?></td>
                                            <td><?php echo date("d/m/Y", strtotime($row["fecha_subida"])); ?></td>
                                            <td class="actions">
                                                <a href="#" class="btn btn-outline" title="Ver detalles">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                                <a href="#" class="btn btn-outline" title="Editar">
                                                    <i class="fas fa-edit"></i>
                                                </a>
                                                <a href="#" class="btn btn-outline" title="Eliminar">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php else: ?>
                        <div class="empty-msg">
                            <i class="fas fa-info-circle"></i> No hay fotos disponibles en la galería
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            
            <?php if ($result->num_rows > 0): ?>
                <div class="pagination">
                    <a href="#" class="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">&raquo;</a>
                </div>
            <?php endif; ?>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; <?php echo date("Y"); ?> Galería - Sistema de administración</p>
        </div>
    </footer>
    
    <script>
        // Funcionalidad para cambiar entre vista de cuadrícula y lista
        document.addEventListener('DOMContentLoaded', function() {
            const gridViewBtn = document.getElementById('grid-view-btn');
            const listViewBtn = document.getElementById('list-view-btn');
            const gridView = document.getElementById('grid-view');
            const listView = document.getElementById('list-view');
            
            gridViewBtn.addEventListener('click', function() {
                gridView.style.display = 'grid';
                listView.style.display = 'none';
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
            });
            
            listViewBtn.addEventListener('click', function() {
                gridView.style.display = 'none';
                listView.style.display = 'block';
                gridViewBtn.classList.remove('active');
                listViewBtn.classList.add('active');
            });
        });
    </script>
    
    <?php
    // Cerrar conexión
    $conn->close();
    ?>
</body>
</html>