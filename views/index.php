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

// Página actual (por defecto: home)
$pagina = isset($_GET['pagina']) ? $_GET['pagina'] : 'home';

// Función para obtener el total de registros de una tabla
function obtenerTotalRegistros($conexion, $tabla) {
    $sql = "SELECT COUNT(*) as total FROM $tabla";
    $resultado = $conexion->query($sql);
    $fila = $resultado->fetch_assoc();
    return $fila['total'];
}

// Obtener todas las tablas de la base de datos
$sql = "SHOW TABLES FROM $baseDatos";
$resultado = $conexion->query($sql);
$tablas = [];

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_array()) {
        $tablas[] = $fila[0];
    }
}

// Obtener estadísticas para cada tabla
$estadisticas = [];
foreach ($tablas as $tabla) {
    $estadisticas[$tabla] = obtenerTotalRegistros($conexion, $tabla);
}

// Variables para el título de la página
$tituloPagina = "Dashboard de Galería";
$subtituloPagina = "";

// Configurar título según la página
switch ($pagina) {
    case 'home':
        $subtituloPagina = "Estadísticas Generales";
        break;
    case 'eventos':
    case 'usuarios':
    case 'fotos':
    case 'comentarios':
        $subtituloPagina = "Gestión de " . ucfirst($pagina);
        break;
    default:
        $subtituloPagina = "Estadísticas Generales";
}

// Función para obtener ícono según tabla
function obtenerIcono($tabla) {
    switch ($tabla) {
        case 'eventos':
            return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="menu-icon"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
        case 'usuarios':
            return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="menu-icon"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>';
        case 'fotos':
            return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="menu-icon"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
        case 'comentarios':
            return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="menu-icon"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>';
        default:
            return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="menu-icon"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>';
    }
}

// Función para determinar si un elemento del menú está activo
function estaActivo($paginaActual, $menuItem) {
    return $paginaActual === $menuItem ? 'active' : '';
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $tituloPagina; ?> - <?php echo $subtituloPagina; ?></title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
            --color-white: #ffffff;
            --color-light: #f8f8f8;
            --color-dark: #121212;
            --color-dark-alt: #1e1e1e;
            --color-orange: #ff5722;
            --color-orange-light: #ff7043;
            --color-orange-dark: #e64a19;
            --color-gray: #757575;
            --color-border: #e0e0e0;
            --sidebar-width: 260px;
            --header-height: 70px;
            --border-radius: 12px;
            --transition-speed: 0.3s;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            background-color: var(--color-dark);
            color: var(--color-light);
            overflow-x: hidden;
            position: relative;
            min-height: 100vh;
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(255, 87, 34, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 80% 60%, rgba(255, 87, 34, 0.05) 0%, transparent 40%);
        }

        /* Sidebar */
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: var(--sidebar-width);
            height: 100%;
            background: var(--color-dark-alt);
            border-right: 1px solid rgba(255, 87, 34, 0.2);
            z-index: 100;
            transition: transform var(--transition-speed);
            overflow-y: auto;
            padding-top: 20px;
            box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
        }

        .sidebar-header {
            padding: 0 20px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo-icon {
            width: 40px;
            height: 40px;
            background: var(--color-orange);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 24px;
            color: var(--color-white);
            position: relative;
            overflow: hidden;
        }

        .logo-icon::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            top: -10px;
            right: -10px;
        }

        .logo-text {
            font-weight: 600;
            font-size: 20px;
            color: var(--color-white);
        }

        .close-sidebar {
            display: none;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            color: var(--color-white);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }

        .divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
            margin: 10px 0;
        }

        .menu-title {
            padding: 0 20px;
            margin-bottom: 10px;
            font-size: 12px;
            text-transform: uppercase;
            color: var(--color-gray);
            letter-spacing: 1px;
        }

        .menu {
            list-style: none;
            padding: 0;
        }

        .menu-item {
            margin-bottom: 5px;
        }

        .menu-link {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            color: var(--color-light);
            text-decoration: none;
            border-radius: 8px;
            margin: 0 10px;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }

        .menu-link:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .menu-link.active {
            background: var(--color-orange);
            color: var(--color-white);
            font-weight: 500;
            box-shadow: 0 5px 15px rgba(255, 87, 34, 0.4);
        }

        .menu-link.active::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--color-white);
        }

        .menu-icon {
            width: 22px;
            height: 22px;
            margin-right: 12px;
            flex-shrink: 0;
        }

        /* Main Content */
        .main-content {
            margin-left: var(--sidebar-width);
            padding: 20px;
            padding-top: calc(var(--header-height) + 20px);
            min-height: 100vh;
            transition: margin-left var(--transition-speed);
        }

        /* Header */
        .header {
            position: fixed;
            top: 0;
            left: var(--sidebar-width);
            right: 0;
            height: var(--header-height);
            background: var(--color-dark-alt);
            border-bottom: 1px solid rgba(255, 87, 34, 0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            z-index: 99;
            transition: left var(--transition-speed);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .toggle-sidebar {
            display: none;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
        }

        .header-title {
            flex: 1;
        }

        .header-title h1 {
            font-size: 24px;
            font-weight: 600;
            color: var(--color-white);
        }

        .header-title p {
            font-size: 14px;
            color: var(--color-gray);
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            padding: 8px 15px;
            border-radius: var(--border-radius);
            transition: all 0.3s;
        }

        .user-profile:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--color-orange-light);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 600;
            color: var(--color-white);
        }

        .user-info {
            display: flex;
            flex-direction: column;
        }

        .user-name {
            font-size: 14px;
            font-weight: 500;
        }

        .user-role {
            font-size: 12px;
            color: var(--color-gray);
        }

        /* Dashboard */
        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .card {
            background: var(--color-dark-alt);
            border-radius: var(--border-radius);
            padding: 25px;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
            z-index: 1;
            border-top: 4px solid var(--color-orange);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 87, 34, 0.1) 0%, transparent 70%);
            z-index: -1;
        }

        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .card-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background: rgba(255, 87, 34, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card-icon svg {
            width: 26px;
            height: 26px;
            color: var(--color-orange);
        }

        .card-title {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 5px;
        }

        .card-value {
            font-size: 36px;
            font-weight: 600;
            margin-bottom: 5px;
            background: linear-gradient(to right, var(--color-orange), var(--color-orange-light));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .card-label {
            font-size: 14px;
            color: var(--color-gray);
        }

        /* Widgets */
        .widgets {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
        }

        .widget {
            background: var(--color-dark-alt);
            border-radius: var(--border-radius);
            padding: 25px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .widget-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .widget-title {
            font-size: 18px;
            font-weight: 500;
        }

        .widget-action {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .widget-action:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        /* Table */
        .table-container {
            overflow-x: auto;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        .table th, .table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .table th {
            background: rgba(255, 255, 255, 0.05);
            font-weight: 500;
            color: var(--color-gray);
        }

        .table tr:hover {
            background: rgba(255, 255, 255, 0.02);
        }

        .table .highlight {
            color: var(--color-orange-light);
            font-weight: 500;
        }

        /* Chart */
        .chart-container {
            position: relative;
            height: 300px;
            width: 100%;
        }

        /* Status */
        .status {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }

        .status-active {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
        }

        .status-inactive {
            background: rgba(244, 67, 54, 0.2);
            color: #F44336;
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .pulse {
            animation: pulse 2s infinite;
        }

        /* Responsiveness */
        @media (max-width: 992px) {
            .widgets {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }
            
            .sidebar.active {
                transform: translateX(0);
            }
            
            .main-content {
                margin-left: 0;
            }
            
            .header {
                left: 0;
            }
            
            .toggle-sidebar {
                display: flex;
            }
            
            .dashboard {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
        }

        /* Tabla específica para cada sección */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .data-table th, .data-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .data-table th {
            background: rgba(255, 87, 34, 0.1);
            color: var(--color-orange-light);
            font-weight: 500;
        }

        .data-table tbody tr:hover {
            background: rgba(255, 255, 255, 0.02);
        }

        /* Botones de acción */
        .action-buttons {
            display: flex;
            gap: 8px;
        }

        .btn {
            padding: 6px 12px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s;
        }

        .btn-view {
            background: rgba(3, 169, 244, 0.2);
            color: #03A9F4;
        }

        .btn-edit {
            background: rgba(255, 193, 7, 0.2);
            color: #FFC107;
        }

        .btn-delete {
            background: rgba(244, 67, 54, 0.2);
            color: #F44336;
        }

        .btn:hover {
            filter: brightness(1.2);
        }

        /* Stats card */
        .stat-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 20px;
            text-align: center;
            border-radius: var(--border-radius);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 87, 34, 0.2);
            transition: all 0.3s;
        }

        .stat-card:hover {
            background: rgba(255, 255, 255, 0.05);
            transform: translateY(-5px);
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(255, 87, 34, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .stat-icon svg {
            width: 32px;
            height: 32px;
            color: var(--color-orange);
        }

        .stat-value {
            font-size: 28px;
            font-weight: 600;
            color: var(--color-white);
        }

        .stat-label {
            font-size: 14px;
            color: var(--color-gray);
        }

        /* Animaciones para las tarjetas */
        .dashboard .card:nth-child(1) {
            animation: fadeIn 0.3s ease-in-out;
        }
        .dashboard .card:nth-child(2) {
            animation: fadeIn 0.4s ease-in-out;
        }
        .dashboard .card:nth-child(3) {
            animation: fadeIn 0.5s ease-in-out;
        }
        .dashboard .card:nth-child(4) {
            animation: fadeIn 0.6s ease-in-out;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <div class="logo-icon">G</div>
                <div class="logo-text">Galería</div>
            </div>
            <div class="close-sidebar" id="closeSidebar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="menu-title">Principal</div>
        <ul class="menu">
            <li class="menu-item">
                <a href="?pagina=home" class="menu-link <?php echo estaActivo($pagina, 'home'); ?>">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="menu-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                </a>
            </li>
        </ul>
        
        <div class="menu-title">Administración</div>
        <ul class="menu">
            <?php foreach ($tablas as $tabla): ?>
            <li class="menu-item">
                <a href="?pagina=<?php echo $tabla; ?>" class="menu-link <?php echo estaActivo($pagina, $tabla); ?>">
                    <?php echo obtenerIcono($tabla); ?>
                    <?php echo ucfirst($tabla); ?>
                </a>
            </li>
            <?php endforeach; ?>
        </ul>
        
        <div class="divider"></div>
        
        <div class="menu-title">Configuración</div>
        <ul class="menu">
            <li class="menu-item">
                <a href="#" class="menu-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="menu-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ajustes
                </a>
            </li>
            <li class="menu-item">
                <a href="#" class="menu-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="menu-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar sesión
                </a>
            </li>
        </ul>
    </aside>

    <!-- Header -->
    <header class="header">
        <div class="toggle-sidebar" id="toggleSidebar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </div>
        
        <div class="header-title">
            <h1><?php echo $tituloPagina; ?></h1>
            <p><?php echo $subtituloPagina; ?></p>
        </div>
        
        <div class="user-profile">
            <div class="user-avatar">A</div>
            <div class="user-info">
                <div class="user-name">Admin</div>
                <div class="user-role">Administrador</div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <?php if ($pagina === 'home'): ?>
        <!-- Dashboard Home -->
        <div class="dashboard">
            <div class="card">
                <div class="card-header">
                    <div class="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                    </div>
                </div>
                <div class="card-title">Tablas</div>
                <div class="card-value"><?php echo count($tablas); ?></div>
                <div class="card-label">Tablas en la base de datos</div>
            </div>
            
            <?php foreach ($tablas as $tabla): ?>
            <div class="card">
                <div class="card-header">
                    <div class="card-icon">
                        <?php echo obtenerIcono($tabla); ?>
                    </div>
                </div>
                <div class="card-title"><?php echo ucfirst($tabla); ?></div>
                <div class="card-value"><?php echo $estadisticas[$tabla]; ?></div>
                <div class="card-label">Registros en total</div>
            </div>
            <?php endforeach; ?>
        </div>

        <div class="widgets">
            <div class="widget">
                <div class="widget-header">
                    <div class="widget-title">Distribución de Datos</div>
                    <div class="widget-action">Ver todo</div>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Tabla</th>
                                <th>Total Registros</th>
                                <th>% del Total</th>
                                <th>Distribución</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php 
                            $totalRegistros = array_sum($estadisticas);
                            foreach ($estadisticas as $tabla => $cantidad): 
                                $porcentaje = $totalRegistros > 0 ? round(($cantidad / $totalRegistros) * 100, 1) : 0;
                            ?>
                            <tr>
                                <td><?php echo ucfirst($tabla); ?></td>
                                <td class="highlight"><?php echo $cantidad; ?></td>
                                <td><?php echo $porcentaje; ?>%</td>
                                <td>
                                    <div style="width: 100%; background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                                        <div style="width: <?php echo $porcentaje; ?>%; background: var(--color-orange); height: 8px;"></div>
                                    </div>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="widget">
                <div class="widget-header">
                    <div class="widget-title">Estado del Sistema</div>
                </div>
                <div style="padding: 20px 0;">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div class="stat-value">En línea</div>
                        <div class="stat-label">Estado del Sistema</div>
                    </div>
                    
                    <div class="stat-card" style="margin-top: 20px;">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="stat-value">
                            <?php echo date('d/m/Y'); ?>
                        </div>
                        <div class="stat-label">Fecha Actual</div>
                    </div>
                </div>
            </div>
        </div>
        
        <?php elseif ($pagina === 'eventos'): ?>
        <!-- Página de Eventos -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon">
                    <?php echo obtenerIcono('eventos'); ?>
                </div>
            </div>
            <div class="card-title">Gestión de Eventos</div>
            <div class="card-label">Total de eventos: <?php echo $estadisticas['eventos']; ?></div>
            
            <?php
            $sqlEventos = "SELECT * FROM eventos ORDER BY id_evento DESC";
            $resultadoEventos = $conexion->query($sqlEventos);
            ?>
            
            <div class="table-container" style="margin-top: 20px;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Tipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($evento = $resultadoEventos->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $evento['id_evento']; ?></td>
                            <td><?php echo $evento['nombre']; ?></td>
                            <td><?php echo $evento['descripcion']; ?></td>
                            <td><?php echo $evento['tipo']; ?></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-view">Ver</button>
                                    <button class="btn btn-edit">Editar</button>
                                    <button class="btn btn-delete">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>
        
        <?php elseif ($pagina === 'usuarios'): ?>
        <!-- Página de Usuarios -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon">
                    <?php echo obtenerIcono('usuarios'); ?>
                </div>
            </div>
            <div class="card-title">Gestión de Usuarios</div>
            <div class="card-label">Total de usuarios: <?php echo $estadisticas['usuarios']; ?></div>
            
            <?php
            $sqlUsuarios = "SELECT * FROM usuarios ORDER BY id_usuario DESC";
            $resultadoUsuarios = $conexion->query($sqlUsuarios);
            ?>
            
            <div class="table-container" style="margin-top: 20px;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($usuario = $resultadoUsuarios->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $usuario['id_usuario']; ?></td>
                            <td><?php echo $usuario['nombre']; ?></td>
                            <td><?php echo $usuario['email']; ?></td>
                            <td><?php echo $usuario['rol']; ?></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-view">Ver</button>
                                    <button class="btn btn-edit">Editar</button>
                                    <button class="btn btn-delete">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>
        
        <?php elseif ($pagina === 'fotos'): ?>
        <!-- Página de Fotos -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon">
                    <?php echo obtenerIcono('fotos'); ?>
                </div>
            </div>
            <div class="card-title">Gestión de Fotos</div>
            <div class="card-label">Total de fotos: <?php echo $estadisticas['fotos']; ?></div>
            
            <?php
            $sqlFotos = "SELECT f.*, e.nombre as nombre_evento 
                        FROM fotos f 
                        LEFT JOIN eventos e ON f.id_evento = e.id_evento 
                        ORDER BY f.id_foto DESC";
            $resultadoFotos = $conexion->query($sqlFotos);
            ?>
            
            <div class="table-container" style="margin-top: 20px;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Ruta</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Evento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($foto = $resultadoFotos->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $foto['id_foto']; ?></td>
                            <td><?php echo $foto['nombre']; ?></td>
                            <td><?php echo $foto['ruta_archivo']; ?></td>
                            <td><?php echo $foto['descripcion']; ?></td>
                            <td><?php echo $foto['fecha_subida']; ?></td>
                            <td><?php echo $foto['nombre_evento']; ?></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-view">Ver</button>
                                    <button class="btn btn-edit">Editar</button>
                                    <button class="btn btn-delete">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>
        
        <?php elseif ($pagina === 'comentarios'): ?>
        <!-- Página de Comentarios -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon">
                    <?php echo obtenerIcono('comentarios'); ?>
                </div>
            </div>
            <div class="card-title">Gestión de Comentarios</div>
            <div class="card-label">Total de comentarios: <?php echo $estadisticas['comentarios']; ?></div>
            
            <?php
            $sqlComentarios = "SELECT c.*, u.nombre as nombre_usuario, f.nombre as nombre_foto 
                              FROM comentarios c 
                              LEFT JOIN usuarios u ON c.id_usuario = u.id_usuario 
                              LEFT JOIN fotos f ON c.id_foto = f.id_foto 
                              ORDER BY c.fecha_comentario DESC";
            $resultadoComentarios = $conexion->query($sqlComentarios);
            ?>
            
            <div class="table-container" style="margin-top: 20px;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Comentario</th>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Foto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($comentario = $resultadoComentarios->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $comentario['id_comentario']; ?></td>
                            <td><?php echo $comentario['comentario']; ?></td>
                            <td><?php echo $comentario['fecha_comentario']; ?></td>
                            <td><?php echo $comentario['nombre_usuario']; ?></td>
                            <td><?php echo $comentario['nombre_foto']; ?></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-view">Ver</button>
                                    <button class="btn btn-edit">Editar</button>
                                    <button class="btn btn-delete">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php endif; ?>
    </main>

    <script>
        // Toggle sidebar en dispositivos móviles
        const toggleSidebar = document.getElementById('toggleSidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebar = document.getElementById('sidebar');
        
        if (toggleSidebar) {
            toggleSidebar.addEventListener('click', () => {
                sidebar.classList.add('active');
            });
        }
        
        if (closeSidebar) {
            closeSidebar.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        }
        
        // Cerrar el sidebar cuando se hace clic fuera de él (en dispositivos móviles)
        document.addEventListener('click', (e) => {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickOnToggleButton = toggleSidebar && toggleSidebar.contains(e.target);
            
            if (window.innerWidth <= 768 && !isClickInsideSidebar && !isClickOnToggleButton && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    </script>
</body>
</html>
<?php
// Cerrar la conexión a la base de datos
$conexion->close();
?>