const db = require('../config/db');

// Crear un nuevo pedido
const createPedido = (pedido, callback) => {
    const { nombre_cliente, lugar_consumo } = pedido;
    db.query(
        'INSERT INTO pedidos (nombre_cliente, lugar_consumo, estado_pedido) VALUES (?, ?, 0)',
        [nombre_cliente, lugar_consumo],
        callback
    );
};
// Agregar insumos a un pedido
const addInsumosToPedido = (id_pedido, insumos, callback) => {
  const queries = [];

  insumos.forEach((insumo) => {
    const { id_insumo, cantidad_insumo, comentarios } = insumo;

    // Determinar el estado del insumo según la categoría
    db.query('SELECT id_categoria FROM subcategorias WHERE id_sub_categoria = (SELECT id_sub_categoria FROM insumos WHERE id_insumo = ?)', [id_insumo], (err, results) => {
      if (err) {
        return callback(err);
      }

      const id_categoria = results[0].id_categoria;

      let estado_insumo_pedido;
      if (id_categoria === 3) { // Comidas
        estado_insumo_pedido = 0; // Pendiente
      } else {
        estado_insumo_pedido = 1; // Hecho
      }

      queries.push({
        sql: 'INSERT INTO pedidosinsumos (id_pedido, id_insumo, estado_insumo_pedido, cantidad_insumo, comentarios) VALUES (?, ?, ?, ?, ?)',
        values: [id_pedido, id_insumo, estado_insumo_pedido, cantidad_insumo, comentarios],
      });
    });
  });

  // Ejecutar todas las consultas
  db.query('START TRANSACTION;', (err) => {
    if (err) {
      return callback(err);
    }

    let queryCount = 0;
    queries.forEach((query) => {
      db.query(query.sql, query.values, (err) => {
        if (err) {
          db.query('ROLLBACK;', () => {
            callback(err);
          });
        } else {
          queryCount++;
          if (queryCount === queries.length) {
            db.query('COMMIT;', callback);
          }
        }
      });
    });
  });
};

  // Modificar el controlador para aceptar una lista de insumos
  exports.addInsumosToPedido = (req, res) => {
    const { id_pedido } = req.params;
    const insumos = req.body;
  
    pedidoModel.addInsumosToPedido(id_pedido, insumos, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'Insumos agregados correctamente' });
    });
  };
  
// Obtener todos los pedidos
const getAllPedidos = (callback) => {
    db.query('SELECT * FROM pedidos', callback);
};

module.exports = {
    createPedido,
    addInsumosToPedido,
    getAllPedidos,
};
