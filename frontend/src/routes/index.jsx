import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Profile from '../pages/Profile/Profile';
import CreatePost from '../components/CreatePost';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/Navbar';
import GuestOnlyRoute from '../components/GuestOnlyRoute';
import UserProfile from '../pages/Profile/UserProfile';
import PostDetail from '../components/PostDetail';
import FollowingPage from '../components/FollowingPage';
export default function Router() {

  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Routes KHÔNG cần đăng nhập */}
        <Route path="/login" element={<GuestOnlyRoute> <Login /> </GuestOnlyRoute>} />
        <Route path="/register" element={<GuestOnlyRoute> <Register /> </GuestOnlyRoute>} />

        {/* Routes CẦN đăng nhập */}
        <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
        <Route path="/users/:id" element={<PrivateRoute> <UserProfile /> </PrivateRoute>} />
        <Route path="/posts/:postId" element={<PrivateRoute> <PostDetail /> </PrivateRoute>} />
        <Route path="/following/:userId" element={<PrivateRoute> <FollowingPage /> </PrivateRoute>} />
        <Route path="/createpost" element={<PrivateRoute> <CreatePost /> </PrivateRoute>} />

      </Routes>
    </>
  );
}
