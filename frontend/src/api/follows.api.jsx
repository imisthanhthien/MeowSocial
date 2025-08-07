import axiosClient from './axiosClient';

const followsApi = {
  followUser: (followerId, followingId) =>
    axiosClient.post(`/follows/${followerId}/follow/${followingId}`),

  unfollowUser: (followerId, followingId) =>
    axiosClient.delete(`/follows/${followerId}/unfollow/${followingId}`),

  getFollowers: (userId) =>
    axiosClient.get(`/follows/${userId}/followers`),

  getFollowing: (userId) =>
    axiosClient.get(`/follows/${userId}/following`),

  isFollowing: (followerId, followingId) =>
    axiosClient.get(`/follows/${followerId}/is-following/${followingId}`),
};

export default followsApi;
