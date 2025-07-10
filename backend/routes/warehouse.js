const express = require('express');
const router = express.Router();
const WarehouseController = require('../controllers/warehouseController');

router.get('/', WarehouseController.getItems);

module.exports = router;
