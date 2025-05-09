# Galería Fotográfica

Aplicación web de una galería de fotografía profesional desarrollada con Node.js y Express. Esta plataforma permite mostrar servicios fotográficos, categorías de trabajos y gestionar citas con clientes.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [API REST](#api-rest)
- [Manejo de Errores](#manejo-de-errores)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## 📝 Descripción General

Galería Fotográfica es una aplicación web diseñada para fotógrafos profesionales que desean mostrar su trabajo, ofrecer servicios y permitir la gestión de citas con clientes. La plataforma está estructurada de forma modular, con un enfoque en la separación de responsabilidades y el manejo eficiente de errores.

## 🗂️ Estructura del Proyecto

```
PROYECTOISHUME/
├── .vscode/              # Configuración de VS Code
├── config/               # Archivos de configuración 
├── controllers/          # Controladores de la aplicación
├── Cotizar/              # Módulo de cotizaciones
├── img/                  # Imágenes estáticas
├── Inicio/               # Módulo de página principal
├── middlewares/          # Middlewares personalizados
├── models/               # Modelos de datos
├── node_modules/         # Dependencias
├── public/               # Archivos estáticos accesibles públicamente
├── routes/               # Definición de rutas
├── servicios/            # Lógica de negocio/servicios
├── views/                # Plantillas EJS
│   ├── categorias/       # Vistas para categorías
│   ├── citas/            # Vistas para gestión de citas
│   ├── partials/         # Componentes reutilizables 
│   └── servicios/        # Vistas para servicios
├── .env                  # Variables de entorno
├── .gitignore            # Archivos ignorados por Git
├── app.js                # Punto de entrada de la aplicación
├── package-lock.json     # Versiones exactas de dependencias
└── package.json          # Configuración del proyecto y dependencias
```

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **Express**: Framework web rápido y minimalista para Node.js
- **EJS**: Motor de plantillas para generar HTML dinámico
- **Middlewares personalizados**: Para manejo de errores, autenticación y validación
- **MongoDB** (inferido): Sistema de base de datos NoSQL
- **Arquitectura MVC**: Modelo-Vista-Controlador para organización del código
- **Sistema de rutas modular**: Estructura escalable de endpoints
- **Manejo centralizado de errores**: Middleware especializado para capturar y procesar errores

## ⚙️ Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/tuusuario/galeria-fotografica.git
cd galeria-fotografica
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/galeria_fotografica
# Otras variables de entorno necesarias
```

4. Inicia la aplicación:
```bash
npm start
```

Para entorno de desarrollo:
```bash
npm run dev
```

## 🔧 Configuración

La configuración del proyecto se gestiona a través del directorio `config/`, que contiene archivos para diferentes entornos de ejecución (desarrollo, producción, pruebas). Las variables sensibles se gestionan mediante el archivo `.env`.

## 🚀 Uso

Una vez que la aplicación esté en ejecución, puedes acceder a ella en tu navegador:

```
http://localhost:3000
```

## ✨ Funcionalidades

- **Galería de fotografías**: Exhibición de trabajos organizados por categorías
- **Servicios**: Listado y descripción de servicios fotográficos ofrecidos
- **Sistema de citas**: Gestión de citas con clientes
- **Cotizaciones**: Sistema para generar presupuestos personalizados
- **Panel administrativo**: Gestión del contenido (inferido)
- **Manejo de errores**: Sistema robusto para capturar y procesar errores

## 🔄 API REST

La aplicación ofrece una API REST para interactuar con ella programáticamente. Los endpoints están organizados en el directorio `routes/` y siguen una estructura coherente:

- **GET /api/categorias**: Obtiene todas las categorías de fotografía
- **GET /api/servicios**: Obtiene todos los servicios ofrecidos
- **POST /api/citas**: Crea una nueva cita
- **POST /api/cotizar**: Solicita una cotización personalizada

## 🛡️ Manejo de Errores

La aplicación implementa un sistema robusto de manejo de errores a través de middlewares especializados. El archivo `error.js` proporciona una clase personalizada para errores, mientras que los middlewares en el directorio `middlewares/` se encargan de capturar y procesar diferentes tipos de errores:

- Errores de validación
- Errores de autenticación
- Errores de base de datos
- Errores 404 (recurso no encontrado)
- Errores 500 (error interno del servidor)

El archivo `404.ejs` proporciona una página de error personalizada para recursos no encontrados.

## 👥 Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu característica: `git checkout -b feature/nueva-caracteristica`
3. Realiza tus cambios y haz commit: `git commit -m 'Añade nueva característica'`
4. Envía tus cambios: `git push origin feature/nueva-caracteristica`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

---
