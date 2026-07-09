const express = require('express');
const cors = require('cors');
require('dotenv').config();

const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/vehicles', vehicleRoutes);

// Fallback Route
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = app;