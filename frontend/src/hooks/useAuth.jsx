import { useState } from 'react';
import authService from "../services/auth.service";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await authService.register(name, email, password);
      return res;
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await authService.login(email, password);
      console.log("✅ API trả về:", res);

      if (res.access_token) {
        setUser(res.user);
        return res; // <-- QUAN TRỌNG: Trả về object chứa access_token
      } else {
        throw new Error("Không nhận được access_token");
      }
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      setError(err.response?.data?.message || err.message || "Đăng nhập thất bại");
      return { message: err.message }; // <-- để bên Login.jsx có thể xử lý
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
  };
};

export default useAuth;
