const WarehouseModel = require('../models/warehouseModel');

const getItems = (req, res) => {
  WarehouseModel.getAllItems((err, items) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(items);
  });
};

module.exports = { getItems };
