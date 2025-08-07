import likeApi from '../api/like.api';

const likesService = {
  likePost: async (postId) => {
    const res = await likeApi.likePost(postId);
    return res.data;
  },

  unlikePost: async (postId) => {
    const res = await likeApi.unlikePost(postId);
    return res.data;
  },

  hasLiked: async (postId) => {
    const res = await likeApi.hasLiked(postId);
    return res.data;
  },

  getUsersWhoLikedPost: async (postId) => {
    const res = await likeApi.getUsersWhoLikedPost(postId);
    return res.data;
  },
};

export default likesService;
