import followsApi from '../api/follows.api';

const followsService = {
  follow: (followerId, followingId) => {
    return followsApi.followUser(followerId, followingId);
  },

  unfollow: (followerId, followingId) => {
    return followsApi.unfollowUser(followerId, followingId);
  },

  getFollowers: (userId) => {
    return followsApi.getFollowers(userId);
  },

  getFollowing: (userId) => {
    return followsApi.getFollowing(userId);
  },

  checkFollowing: (followerId, followingId) => {
    return followsApi.isFollowing(followerId, followingId);
  },
};

export default followsService;
