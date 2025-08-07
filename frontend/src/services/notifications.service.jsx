import notificationsApi from '../api/notifications.api';

const notificationsService = {
  create: async (data) => {
    const res = await notificationsApi.create(data);
    return res.data;
  },

  getAll: async () => {
    const res = await notificationsApi.getAll();
    return res.data;
  },

  getByUserId: async (userId) => {
    const res = await notificationsApi.getByUserId(userId);
    return res.data;
  },

  markAsSeen: async (id) => {
    const res = await notificationsApi.markAsSeen(id);
    return res.data;
  },

  delete: async (id) => {
    const res = await notificationsApi.delete(id);
    return res.data;
  },
};

export default notificationsService;
