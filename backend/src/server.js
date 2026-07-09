require('dotenv').config(); // โหลดไฟล์ .env เข้าไปในระบบตั้งแต่บรรทัดแรก
const app = require('./app');

const PORT = process.env.PORT || 5000;


const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
};

startServer();