const express = require('express');
const router = express.Router();
const WarehouseController = require('../controllers/warehouseController');

router.get('/', WarehouseController.getItems);
router.get('/:id', WarehouseController.getItemById);
router.post('/', WarehouseController.addItem);
router.put('/:id', WarehouseController.updateItem);
router.delete('/:id', WarehouseController.deleteItem);

module.exports = router;
