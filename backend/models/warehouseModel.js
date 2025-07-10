const db = require('../db');

const getAllItems = (callback) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const getItemById = (id, callback) => {
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

const addNewItem = (product, callback) => {
  const sql = 'INSERT INTO products (product_name, sku, stock_level, price, currency) VALUES (?, ?, ?, ?, ?)';
  const values = [
    product.product_name,
    product.sku,
    product.stock_level || 0,
    product.price,
    product.currency || 'SGD'
  ];
  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const updateItem = (id, product, callback) => {
  const sql = 'UPDATE products SET product_name = ?, sku = ?, stock_level = ?, price = ?, currency = ? WHERE id = ?';
  const values = [
    product.product_name,
    product.sku,
    product.stock_level || 0,
    product.price,
    product.currency || 'SGD',
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const deleteItem = (id, callback) => {
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = { getAllItems, getItemById, addNewItem, updateItem, deleteItem };
