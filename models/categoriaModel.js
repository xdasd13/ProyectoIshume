const pool = require('../config/database.js');

const Categoria = {
  // Obtener todas las categorías
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM categorias ORDER BY nomCategoria');
      return rows;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM categorias WHERE idCategoria = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener categoría con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva categoría
  create: async (nomCategoria) => {
    try {
      const [result] = await pool.query('INSERT INTO categorias (nomCategoria) VALUES (?)', [nomCategoria]);
      return result.insertId;
    } catch (error) {
      console.error('Error al crear categoría:', error);
      throw error;
    }
  },

  // Actualizar una categoría existente
  update: async (id, nomCategoria) => {
    try {
      const [result] = await pool.query('UPDATE categorias SET nomCategoria = ? WHERE idCategoria = ?', 
        [nomCategoria, id]);
      return result.affectedRows;
    } catch (error) {
      console.error(`Error al actualizar categoría con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una categoría
  delete: async (id) => {
    try {
      // Verificar si hay servicios asociados a esta categoría
      const [servicios] = await pool.query('SELECT COUNT(*) as total FROM servicios WHERE idCategoria = ?', [id]);
      
      if (servicios[0].total > 0) {
        throw new Error('No se puede eliminar la categoría porque tiene servicios asociados');
      }
      
      const [result] = await pool.query('DELETE FROM categorias WHERE idCategoria = ?', [id]);
      return result.affectedRows;
    } catch (error) {
      console.error(`Error al eliminar categoría con ID ${id}:`, error);
      throw error;
    }
  },
  
  // Obtener categorías con conteo de servicios
  getCategoriaConConteo: async () => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          c.idCategoria, 
          c.nomCategoria, 
          COUNT(s.idServicio) as totalServicios
        FROM categorias c
        LEFT JOIN servicios s ON c.idCategoria = s.idCategoria
        GROUP BY c.idCategoria
        ORDER BY c.nomCategoria
      `);
      return rows;
    } catch (error) {
      console.error('Error al obtener categorías con conteo:', error);
      throw error;
    }
  }
};

module.exports = Categoria;