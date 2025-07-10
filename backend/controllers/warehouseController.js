const WarehouseModel = require('../models/warehouseModel');

const getItems = (req, res) => {
  WarehouseModel.getAllItems((err, items) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(items);
  });
};

const getItemById = (req, res) => {
  const id = req.params.id;
  WarehouseModel.getItemById(id, (err, item) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.json(item);
  });
};

// Add new items
const addItem = (req, res) => {
  const newProduct = req.body;
  WarehouseModel.addNewItem(newProduct, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product added', id: result.insertId });
  });
};

// Update existing item
const updateItem = (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;

  WarehouseModel.updateItem(id, updatedProduct, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated' });
  });
};

// Delete an item
const deleteItem = (req, res) => {
  const id = req.params.id;

  WarehouseModel.deleteItem(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  });
};

module.exports = { getItems, getItemById, addItem, updateItem, deleteItem };
