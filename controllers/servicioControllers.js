const Servicio = require('../models/servicioModel');
const Categoria = require('../models/categoriaModel');
const fs = require('fs');
const path = require('path');

const servicioController = {
  // Mostrar todos los servicios
  listar: async (req, res) => {
    try {
      const servicios = await Servicio.getAll();
      res.render('servicios/lista', { 
        servicios,
        titulo: 'Lista de Servicios',
        mensaje: req.flash('mensaje')
      });
    } catch (error) {
      console.error('Error al listar servicios:', error);
      req.flash('mensaje', { tipo: 'danger', texto: 'Error al obtener los servicios' });
      res.redirect('/');
    }
  },

  // Mostrar formulario para crear servicio
  formCrear: async (req, res) => {
    try {
      const categorias = await Categoria.getAll();
      res.render('servicios/crear', { 
        categorias,
        titulo: 'Nuevo Servicio',
        servicio: {}
      });
    } catch (error) {
      console.error('Error al mostrar formulario de creación:', error);
      req.flash('mensaje', { tipo: 'danger', texto: 'Error al cargar el formulario' });
      res.redirect('/servicios');
    }
  },

  // Crear nuevo servicio
  crear: async (req, res) => {
    try {
      const { nomServicio, descripcion, precio, disponible, idCategoria } = req.body;
      
      // Crear objeto servicio con los datos del formulario
      const servicio = {
        nomServicio,
        descripcion,
        precio: parseFloat(precio),
        disponible: disponible === 'on' ? 'activo' : 'inactivo',
        idCategoria: parseInt(idCategoria)
      };

      // Si hay imagen subida, guardar la ruta
      if (req.file) {
        servicio.imgReferencia = `/uploads/${req.file.filename}`;
      } else {
        servicio.imgReferencia = '/img/no-image.png';
      }

      // Guardar servicio en la base de datos
      await Servicio.create(servicio);
      
      req.flash('mensaje', { tipo: 'success', texto: 'Servicio creado correctamente' });
      res.redirect('/servicios');
    } catch (error) {
      console.error('Error al crear servicio:', error);
      req.flash('mensaje', { tipo: 'danger', texto: 'Error al crear el servicio' });
      res.redirect('/servicios/crear');
    }
  },

  // Mostrar formulario para editar servicio
  formEditar: async (req, res) => {
    try {
      const idServicio = req.params.id;
      const servicio = await Servicio.getById(idServicio);
      const categorias = await Categoria.getAll();
      
      if (!servicio) {
        req.flash('mensaje', { tipo: 'warning', texto: 'El servicio no existe' });
        return res.redirect('/servicios');
      }
      
      res.render('servicios/editar', { 
        servicio,
        categorias,
        titulo: 'Editar Servicio'
      });
    } catch (error) {
      console.error(`Error al mostrar formulario de edición:`, error);
      req.flash('mensaje', { tipo: 'danger', texto: 'Error al cargar el formulario de edición' });
      res.redirect('/servicios');
    }
  },

  // Actualizar servicio
  actualizar: async (req, res) => {
    try {
      const idServicio = req.params.id;
      const { nomServicio, descripcion, precio, disponible, idCategoria } = req.body;
      
      // Obtener el servicio actual para verificar si tiene imagen
      const servicioActual = await Servicio.getById(idServicio);
      
      if (!servicioActual) {
        req.flash('mensaje', { tipo: 'warning', texto: 'El servicio no existe' });
        return res.redirect('/servicios');
      }
      
      // Crear objeto servicio con los datos actualizados
      const servicio = {
        nomServicio,
        descripcion,
        precio: parseFloat(precio),
        disponible: disponible === 'on' ? 'activo' : 'inactivo',
        idCategoria: parseInt(idCategoria)
      };

      // Si hay nueva imagen subida, actualizar la ruta y eliminar la anterior
      if (req.file) {
        servicio.imgReferencia = `/uploads/${req.file.filename}`;
        
        // Eliminar la imagen anterior si existe y no es la imagen por defecto
        if (servicioActual.imgReferencia && !servicioActual.imgReferencia.includes('no-image.png')) {
          const rutaImagenAnterior = path.join(__dirname, '../public', servicioActual.imgReferencia);
          if (fs.existsSync(rutaImagenAnterior)) {
            fs.unlinkSync(rutaImagenAnterior);
          }
        }
      }

      // Actualizar servicio en la base de datos
      await Servicio.update(idServicio, servicio);
      
      req.flash('mensaje', { tipo: 'success', texto: 'Servicio actualizado correctamente' });
      res.redirect('/servicios');
    } catch (error) {
      console.error(`Error al actualizar servicio:`, error);
      req.flash('mensaje', { tipo: 'danger', texto: 'Error al actualizar el servicio' });
      res.redirect(`/servicios/editar/${req.params.id}`);
    }
  },

  // Eliminar servicio
  eliminar: async (req, res) => {
    try {
      const idServicio = req.params.id;
      const servicio = await Servicio.getById(idServicio);
      
      if (!servicio) {
        req.flash('mensaje', { tipo: 'warning', texto: 'El servicio no existe' });
        return res.redirect('/servicios');
      }
      
      // Eliminar la imagen si existe y no es la imagen por defecto
      if (servicio.imgReferencia && !servicio.imgReferencia.includes('no-image.png')) {
        const rutaImagen = path.join(__dirname, '../public', servicio.imgReferencia);
        if (fs.existsSync(rutaImagen)) {
          fs.unlinkSync(rutaImagen);
        }
      }
      
      // Eliminar servicio de la base de datos
      await Servicio.delete(idServicio);
      
      req.flash('mensaje', { tipo: 'success', texto: 'Servicio eliminado correctamente' });
      res.redirect('/servicios');
    } catch (error) {
      console.error(`Error al eliminar servicio:`, error);
      req.flash('mensaje', { tipo: 'danger', texto: 'Error al eliminar el servicio' });
      res.redirect('/servicios');
    }
  },

  // Mostrar detalles de un servicio
  detalles: async (req, res) => {
    try {
      const idServicio = req.params.id;
      const servicio = await Servicio.getById(idServicio);
      
      if (!servicio) {
        req.flash('mensaje', { tipo: 'warning', texto: 'El servicio no existe' });
        return res.redirect('/servicios');
      }
      
      res.render('servicios/detalle', { 
        servicio,
        titulo: 'Detalles del Servicio'
      });
    } catch (error) {
      console.error(`Error al mostrar detalles del servicio:`, error);
      req.flash('mensaje', { tipo: 'danger', texto: 'Error al cargar los detalles del servicio' });
      res.redirect('/servicios');
    }
  }
};

module.exports = servicioController;