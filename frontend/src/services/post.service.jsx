import postApi from '../api/post.api';

const postService = {
  getAll: async () => {
    const res = await postApi.getAll();
    return res.data;
  },

  getById: async (id) => {
    const res = await postApi.getById(id);
    return res.data;
  },

  create: async (data) => {
    const res = await postApi.create(data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await postApi.update(id, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await postApi.delete(id);
    return res.data;
  },
  
  getByUserId: async (userId) => {
  const res = await postApi.getByUserId(userId);
  return res.data;
},
};

export default postService;
