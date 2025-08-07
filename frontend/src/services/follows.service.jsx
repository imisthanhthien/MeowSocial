// follows.service.js
import followsApi from '../api/follows.api';

const followsService = {
  // Gửi yêu cầu follow người dùng
  follow: (followerId, followingId) => {
    return followsApi.followUser(followerId, followingId);
  },

  // Gửi yêu cầu unfollow người dùng
  unfollow: (followerId, followingId) => {
    return followsApi.unfollowUser(followerId, followingId);
  },

  // Lấy danh sách follower của 1 user
  getFollowers: (userId) => {
    return followsApi.getFollowers(userId);
  },

  // Lấy danh sách user mà 1 user đang theo dõi
  getFollowing: (userId) => {
    return followsApi.getFollowing(userId);
  },

  // Kiểm tra user A có đang theo dõi user B không
  checkFollowing: (followerId, followingId) => {
    return followsApi.isFollowing(followerId, followingId);
  },
};

export default followsService;
