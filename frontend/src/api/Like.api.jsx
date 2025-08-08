import axiosClient from './axiosClient';

const likeApi = {
  likePost: (postId) => axiosClient.post(`/likes/${postId}`),

  unlikePost: (postId) => axiosClient.delete(`/likes/${postId}`),

  hasLiked: (postId) => axiosClient.get(`/likes/check/${postId}`),

  getUsersWhoLikedPost: (postId) => axiosClient.get(`/likes/post/${postId}`),
};

export default likeApi;
