import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Profile from '../pages/Profile/Profile';
import CreatePost from '../pages/Post/PostDetail';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/Navbar';
import UploadImageForm from '../pages/Home/UploadImageForm';
import GuestOnlyRoute from '../components/GuestOnlyRoute';
import UserProfile from '../pages/Profile/UserProfile';

export default function Router() {
  const location = useLocation(); // 👈 lấy đường dẫn hiện tại

  // Ẩn Navbar nếu đang ở /login hoặc /register
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Routes KHÔNG cần đăng nhập */}
       <Route
          path="/login"
          element={
            <GuestOnlyRoute>
              <Login />
            </GuestOnlyRoute>
          }
        />
       <Route
          path="/register"
          element={
            <GuestOnlyRoute>
              <Register />
            </GuestOnlyRoute>
          }
        />

        {/* Routes CẦN đăng nhập */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

       <Route path="/users/:id" element={<UserProfile />} />
       
        <Route
          path="/createpost"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
         <Route
          path="/UploadImageForm"
          element={
            <PrivateRoute>
              <UploadImageForm />
            </PrivateRoute>
          }
        />

      </Routes>
    </>
  );
}
