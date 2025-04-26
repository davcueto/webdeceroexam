import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/auth/', // Cambia a tu API base
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Puedes agregar interceptores aquí si quieres manejar tokens, errores, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Ejemplo: agregar token automáticamente
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;