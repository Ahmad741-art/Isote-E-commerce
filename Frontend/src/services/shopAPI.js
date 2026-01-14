// Lightweight dedicated shop API used by the new UI components.
// Uses same base URL pattern as the project and attaches JWT if present.

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const productsAPI = {
  getAll: (params) => client.get('/products', { params }),
  getById: (id) => client.get(`/products/${id}`),
  getBySlug: (slug) => client.get(`/products/slug/${slug}`),
};

// Cart (attempt server cart first; fallback to client when offline/not logged)
export const cartAPI = {
  add: (payload) => client.post('/cart/add', payload),
  get: () => client.get('/cart'),
  updateItem: (id, data) => client.put(`/cart/item/${id}`, data),
  removeItem: (id) => client.delete(`/cart/item/${id}`),
  clear: () => client.delete('/cart/clear'),
};

// Checkout
export const checkoutAPI = {
  createPaymentIntent: (payload) => client.post('/checkout/create-payment-intent', payload),
};