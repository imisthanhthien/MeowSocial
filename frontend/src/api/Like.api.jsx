import axiosClient from './axiosClient';

const likeApi = {
  // Gửi yêu cầu like bài viết
  likePost: (postId) => axiosClient.post(`/likes/${postId}`),

  // Gửi yêu cầu bỏ like
  unlikePost: (postId) => axiosClient.delete(`/likes/${postId}`),

  // Kiểm tra người dùng đã like bài viết chưa
  hasLiked: (postId) => axiosClient.get(`/likes/check/${postId}`),

  // Lấy danh sách người đã like bài viết
  getUsersWhoLikedPost: (postId) => axiosClient.get(`/likes/post/${postId}`),
};

export default likeApi;
