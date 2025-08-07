// src/hooks/useUser.js
import { useState, useEffect } from 'react';
import userApi from '../api/user.api';

export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [publicProfile, setPublicProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async () => {
  setLoading(true);
  try {
    const res = await userApi.getById(userId);
    setUser(res.data.user);
  } catch (err) {
    console.error("Lỗi khi fetch user:", err); // 👉 log lỗi
    setError('Không thể tải thông tin người dùng');
  } finally {
    setLoading(false);
  }
};
  const fetchPublicProfile = async () => {
    setLoading(true);
    try {
      const res = await userApi.getById(userId);

      setPublicProfile(res.data);
    } catch (err) {
      console.error('Lỗi chi tiết:', err.response?.data || err.message);
      setError('Không thể tải hồ sơ công khai');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
  try {
    console.log("📤 Dữ liệu gửi đi:", data);
    const res = await userApi.updateProfile(data);
    console.log("✅ Kết quả từ server:", res);
    fetchUser();
  } catch (err) {
    console.log("❌ Lỗi cập nhật:", err);
    setError('Cập nhật thất bại');
  }
};
  const changePassword = async (data) => {
    try {
      await userApi.changePassword(userId, data);
    } catch (err) {
      setError('Đổi mật khẩu thất bại');
    }
  };

  const deleteUser = async () => {
    try {
      await userApi.deleteById(userId);
      setUser(null);
    } catch (err) {
      setError('Xoá người dùng thất bại');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return {
    user,
    publicProfile,
    loading,
    error,
    fetchUser,
    fetchPublicProfile,
    updateProfile,
    changePassword,
    deleteUser,
  };
};
