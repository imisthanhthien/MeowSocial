// components/GuestOnlyRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const GuestOnlyRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />; // Chuyển hướng về trang chủ nếu đã login
  }
  return children;
};

export default GuestOnlyRoute;
