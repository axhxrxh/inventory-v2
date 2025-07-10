const db = require('../db');

const getAllItems = (callback) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = { getAllItems };
