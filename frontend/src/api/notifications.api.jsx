import axiosClient from './axiosClient';

const notificationsApi = {
  create: (data) => axiosClient.post('/notifications', data),

  getAll: () => axiosClient.get('/notifications'),

  getByUserId: (userId) => axiosClient.get(`/notifications/user/${userId}`),

  markAsSeen: (id) => axiosClient.patch(`/notifications/${id}/seen`),

  delete: (id) => axiosClient.delete(`/notifications/${id}`),
};

export default notificationsApi;
