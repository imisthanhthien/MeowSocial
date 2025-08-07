import axiosClient from './axiosClient';

const postApi = {
  getAll: () => axiosClient.get('/posts'),
  getById: (id) => axiosClient.get(`/posts/${id}`),
  create: (data) => axiosClient.post('/posts', data),
  update: (id, data) => axiosClient.put(`/posts/${id}`, data),
  delete: (id) => axiosClient.delete(`/posts/${id}`),
  getByUserId: (userId) => axiosClient.get(`/posts/user/${userId}`),
};

export default postApi;
