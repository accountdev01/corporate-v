import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api', // ชี้ไปที่พอร์ตของ Backend
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default apiClient;