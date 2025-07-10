const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const warehouseRoutes = require('./routes/warehouse');
app.use('/api/warehouse', warehouseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});