import userApi from '../api/user.api';

const userService = {
  getUserById: async (id) => {
    const res = await userApi.getById(id);
    return res.data;
  },

  getPublicProfile: async (id) => {
    const res = await userApi.getPublicProfile(id);
    return res.data;
  },

  updateProfile: async (id, data) => {
    const res = await userApi.updateProfile(id, data);
    return res.data;
  },

  changePassword: async (id, data) => {
    const res = await userApi.changePassword(id, data);
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await userApi.deleteById(id);
    return res.data;
  },
};

export default userService;
