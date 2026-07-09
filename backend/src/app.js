const express = require('express');
const cors = require('cors');

const app = express();

// 1. Global Middlewares
app.use(cors());
app.use(express.json());

// 2. Health Check Route (มีไว้ให้ Server/Load Balancer ตรวจสอบสถานะ)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// 3. Routes
// app.use('/api/v1/users', require('./routes/user.route'));

// 4. Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;