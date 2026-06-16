import api from './api.js';

export async function login(email, password) {
  return api.post('/auth/login', { email, password });
}

export async function register(name, email, password) {
  return api.post('/auth/register', { name, email, password });
}
