const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

async function registerUser(data) {
  const response = await api.post('/auth/register', data);
  setAuthToken(response.data.token);
  return response.data;
}

async function loginUser(data) {
  const response = await api.post('/auth/login', data);
  setAuthToken(response.data.token);
  return response.data;
}

async function logoutUser() {
  const response = await api.post('/auth/logout');
  setAuthToken(null);
  return response.data;
}

async function getPosts() {
  const response = await api.get('/posts');
  return response.data;
}

async function createPost(data) {
  const response = await api.post('/posts', data);
  return response.data;
}

async function updatePost(id, data) {
  const response = await api.put(`/posts/${id}`, data);
  return response.data;
}

async function deletePost(id) {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  setAuthToken,
};
