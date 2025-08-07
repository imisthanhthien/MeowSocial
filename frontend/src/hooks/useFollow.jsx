import { useState, useEffect } from 'react';
import followsService from '../services/follows.service';

const useFollow = (currentUserId, targetUserId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkFollowStatus = async () => {
    try {
      const res = await followsService.checkFollowing(currentUserId, targetUserId);
      console.log('🔍 Kết quả res:', !!res.data); 
      
      setIsFollowing(!!res.data); // ✅ Sửa chỗ này
    } catch (error) {
      console.error('❌ Lỗi kiểm tra trạng thái follow:', error);
    } finally {
      setLoading(false);
    }
  };

  const follow = async () => {
    try {
      await followsService.follow(currentUserId, targetUserId);
      setIsFollowing(true);
    } catch (error) {
      console.error('❌ Lỗi khi follow:', error);
    }
  };

  const unfollow = async () => {
    try {
      await followsService.unfollow(currentUserId, targetUserId);
      setIsFollowing(false);
    } catch (error) {
      console.error('❌ Lỗi khi unfollow:', error);
    }
  };

  useEffect(() => {
    if (currentUserId && targetUserId && currentUserId !== targetUserId) {
      checkFollowStatus();
    }
  }, [currentUserId, targetUserId]);

  return {
    isFollowing,
    follow,
    checkFollowStatus,
    unfollow,
    loading,
  };
};

export default useFollow;
