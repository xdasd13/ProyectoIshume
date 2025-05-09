const pool = require('../config/database.js'); // Asegúrate de que la ruta sea correcta

const Servicio = {
  // Obtener todos los servicios con su categoría
  getAll: async () => {
    try {
      const [rows] = await pool.query(`
        SELECT s.*, c.nomCategoria as nombreCategoria 
        FROM servicios s 
        LEFT JOIN categorias c ON s.idCategoria = c.idCategoria
        ORDER BY s.idServicio DESC
      `);
      return rows;
    } catch (error) {
      console.error('Error al obtener servicios:', error);
      throw error;
    }
  },

  // Obtener un servicio por ID
  getById: async (id) => {
    try {
      const [rows] = await pool.query(`
        SELECT s.*, c.nomCategoria as nombreCategoria 
        FROM servicios s 
        LEFT JOIN categorias c ON s.idCategoria = c.idCategoria
        WHERE s.idServicio = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener servicio con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo servicio
  create: async (servicio) => {
    try {
      const [result] = await pool.query(`
        INSERT INTO servicios (nomServicio, descripcion, precio, imgReferencia, disponible, idCategoria)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        servicio.nomServicio,
        servicio.descripcion,
        servicio.precio,
        servicio.imgReferencia,
        servicio.disponible || 'activo',
        servicio.idCategoria
      ]);
      return result.insertId;
    } catch (error) {
      console.error('Error al crear servicio:', error);
      throw error;
    }
  },

  // Actualizar un servicio existente
  update: async (id, servicio) => {
    try {
      const [result] = await pool.query(`
        UPDATE servicios 
        SET nomServicio = ?, 
            descripcion = ?, 
            precio = ?, 
            disponible = ?,
            idCategoria = ?
            ${servicio.imgReferencia ? ', imgReferencia = ?' : ''}
        WHERE idServicio = ?
      `, [
        servicio.nomServicio,
        servicio.descripcion,
        servicio.precio,
        servicio.disponible,
        servicio.idCategoria,
        ...(servicio.imgReferencia ? [servicio.imgReferencia] : []),
        id
      ]);
      return result.affectedRows;
    } catch (error) {
      console.error(`Error al actualizar servicio con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un servicio
  delete: async (id) => {
    try {
      // Primero eliminamos las referencias en comentarios
      await pool.query('DELETE FROM comentarios WHERE idServicio = ?', [id]);
      
      // Luego eliminamos las referencias en citas
      await pool.query('DELETE FROM citas WHERE idServicio = ?', [id]);
      
      // Finalmente eliminamos el servicio
      const [result] = await pool.query('DELETE FROM servicios WHERE idServicio = ?', [id]);
      return result.affectedRows;
    } catch (error) {
      console.error(`Error al eliminar servicio con ID ${id}:`, error);
      throw error;
    }
  },

  // Obtener servicios por categoría
  getByCategoria: async (idCategoria) => {
    try {
      const [rows] = await pool.query(`
        SELECT s.*, c.nomCategoria as nombreCategoria 
        FROM servicios s 
        LEFT JOIN categorias c ON s.idCategoria = c.idCategoria
        WHERE s.idCategoria = ?
        ORDER BY s.nomServicio
      `, [idCategoria]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener servicios de categoría ${idCategoria}:`, error);
      throw error;
    }
  },

  // Obtener servicios con sus comentarios
  getServiciosConComentarios: async () => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          s.idServicio,
          s.nomServicio,
          s.descripcion,
          s.precio,
          s.imgReferencia,
          s.disponible,
          cat.nomCategoria,
          COALESCE(AVG(com.valoracion), 0) as valoracionPromedio,
          COUNT(com.idComentario) as totalComentarios
        FROM servicios s
        JOIN categorias cat ON s.idCategoria = cat.idCategoria
        LEFT JOIN comentarios com ON s.idServicio = com.idServicio
        GROUP BY s.idServicio
        ORDER BY s.nomServicio
      `);
      return rows;
    } catch (error) {
      console.error('Error al obtener servicios con comentarios:', error);
      throw error;
    }
  }
};

module.exports = Servicio;