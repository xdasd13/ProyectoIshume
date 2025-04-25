<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "galeria";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Consulta para obtener todos los eventos
$sql = "SELECT id_evento, nombre, descripcion, tipo FROM eventos ORDER BY id_evento DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería - Gestión de Eventos</title>
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
            padding: 0;
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
        }
        
        tr:last-child td {
            border-bottom: none;
        }
        
        tr:hover {
            background-color: rgba(255, 159, 69, 0.05);
        }
        
        .tipo-badge {
            background-color: var(--naranja-claro);
            color: #333;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            display: inline-block;
            font-weight: 500;
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
        
        .empty-table {
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
            margin-bottom: 40px;
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
        
        /* Descripción con límite de líneas */
        .description {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 300px;
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
                    <a href="#"><i class="fas fa-image"></i> Fotos</a>
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
                <li>Eventos</li>
            </ul>
            
            <h2 class="page-title">Gestión de Eventos</h2>
            
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Todos los eventos</span>
                    <a href="#" class="btn btn-primary">
                        <i class="fas fa-plus"></i> Nuevo evento
                    </a>
                </div>
                <div class="card-body">
                    <?php if ($result->num_rows > 0): ?>
                        <table>
                            <thead>
                                <tr>
                                    <th width="5%">ID</th>
                                    <th width="20%">Nombre</th>
                                    <th width="45%">Descripción</th>
                                    <th width="15%">Tipo</th>
                                    <th width="15%">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php while($row = $result->fetch_assoc()): ?>
                                    <tr>
                                        <td><?php echo $row["id_evento"]; ?></td>
                                        <td><?php echo htmlspecialchars($row["nombre"]); ?></td>
                                        <td class="description"><?php echo htmlspecialchars($row["descripcion"]); ?></td>
                                        <td><span class="tipo-badge"><?php echo htmlspecialchars($row["tipo"]); ?></span></td>
                                        <td class="actions">
                                            <a href="#" class="btn btn-outline" title="Ver detalles">
                                                <i class="fas fa-eye"></i>
                                            </a>
                                            <a href="#" class="btn btn-outline" title="Editar">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <a href="#" class="btn btn-outline" title="Ver fotos">
                                                <i class="fas fa-images"></i>
                                            </a>
                                        </td>
                                    </tr>
                                <?php endwhile; ?>
                            </tbody>
                        </table>
                    <?php else: ?>
                        <div class="empty-table">
                            <i class="fas fa-info-circle"></i> No hay eventos registrados en la base de datos
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
    
    <?php
    // Cerrar conexión
    $conn->close();
    ?>
</body>
</html>