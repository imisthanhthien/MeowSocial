import { useState, useEffect } from 'react';
import followsService from '../services/follows.service';

const useFollow = (currentUserId, targetUserId = null) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkFollowStatus = async () => {
    try {
      const res = await followsService.checkFollowing(currentUserId, targetUserId);
      setIsFollowing(!!res.data);
    } catch (error) {
      console.error('❌ Lỗi kiểm tra trạng thái follow:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowingList = async () => {
    try {
      const res = await followsService.getFollowing(currentUserId);
      setFollowingList(res.data || []);
    } catch (error) {
      console.error('❌ Lỗi lấy danh sách following:', error);
    } finally {
      setLoading(false);
    }
  };

  const follow = async () => {
    try {
      await followsService.follow(currentUserId, targetUserId);
      setIsFollowing(true);
      await fetchFollowingList(); // cập nhật danh sách
    } catch (error) {
      console.error('❌ Lỗi khi follow:', error);
    }
  };

  const unfollow = async () => {
    try {
      await followsService.unfollow(currentUserId, targetUserId);
      setIsFollowing(false);
      await fetchFollowingList(); // cập nhật danh sách
    } catch (error) {
      console.error('❌ Lỗi khi unfollow:', error);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      if (targetUserId && currentUserId !== targetUserId) {
        checkFollowStatus();
      } else {
        fetchFollowingList();
      }
    }
  }, [currentUserId, targetUserId]);

  return {
    isFollowing,
    followingList,     // ✅ thêm mới
    follow,
    unfollow,
    checkFollowStatus,
    loading,
  };
};

export default useFollow;
