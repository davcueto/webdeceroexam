import axiosInstance from './axiosInstance';

// Función para obtener usuario
export const getUser = (id) => {
  return axiosInstance.get('/me');
};

// Función para login
export const login = (credentials) => {
  return axiosInstance.post('/login', credentials);
};