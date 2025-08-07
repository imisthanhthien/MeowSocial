// src/services/commentApi.js

import axiosClient from './axiosClient';

const commentApi = {
  create: (data) => axiosClient.post('/comments', data),
  getAll: () => axiosClient.get('/comments'),
  getByPostId: (postId) => axiosClient.get(`/comments/post/${postId}`),
  getById: (id) => axiosClient.get(`/comments/${id}`),
  update: (id, content) => axiosClient.put(`/comments/${id}`, { content }),
  remove: (id) => axiosClient.delete(`/comments/${id}`),
};

export default commentApi;
