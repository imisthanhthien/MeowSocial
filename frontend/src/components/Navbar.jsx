import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); // ✅ gọi đúng hook
  const navigate = useNavigate(); // ✅ để chuyển hướng sau khi logout
  const { user } = useAuth();
 const defaultAvatar = "https://i.pravatar.cc/150?img=32";
  const avatarUrl = user?.avatarUrl
    ? `${import.meta.env.VITE_API_BASE_URL}${user.avatarUrl}`
    : "https://i.pravatar.cc/150?img=32";

    
  const handleLogout = () => {
    logout();               // Xóa token
    navigate('/login');     // Chuyển hướng về trang đăng nhập
  };

  return (
    <nav className="bg-white shadow-sm px-4 py-2 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            MeowSocial
          </Link>
          <div className="hidden md:flex items-center bg-gray-100 px-2 py-1 rounded-md">
            <input
              type="text"
              placeholder="Search MeowSocial..."
              className="bg-transparent focus:outline-none text-sm px-2 py-1 w-64"
            />
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Đăng xuất
          </button>
          <Link to="/createpost" className="text-gray-700 hover:text-purple-600 font-medium">
            Tạo bài viết
          </Link>
             <Link to="/UploadImageForm" className="text-gray-700 hover:text-purple-600 font-medium">
            upload
          </Link>
           <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-full h-full object-cover"
      />
    </Link>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col mt-3 gap-3 md:hidden">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-purple-600 font-medium" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          <Link to="/createpost" className="text-gray-700 hover:text-purple-600 font-medium" onClick={() => setIsOpen(false)}>
            Create
          </Link>
          <button onClick={handleLogout} className="text-gray-700 hover:text-purple-600 font-medium">
            Đăng xuất
          </button>
        </div>
      )}
    </nav>
  );
}
