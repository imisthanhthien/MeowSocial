// src/api/user.api.js
import axiosClient from './axiosClient';

const userApi = {
  getById: (id) => axiosClient.get(`/users/${id}`),
  updateProfile: (data) => axiosClient.put(`/users/update-profile`, data),
  changePassword: (data) => axiosClient.put(`/users/change-password`, data),
  deleteById: () => axiosClient.delete(`/users/delete`),
  getProfile: () => axiosClient.get('/users/profile'),
};

export default userApi;
