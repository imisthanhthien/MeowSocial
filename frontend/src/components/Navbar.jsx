import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaBell, FaFacebookMessenger } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHome, FaUserFriends } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // menu mobile
  const [dropdownOpen, setDropdownOpen] = useState(false); // dropdown avatar
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const location = useLocation();

  const avatarUrl = user?.avatarUrl
    ? `${import.meta.env.VITE_API_BASE_URL}${user.avatarUrl}`
    : "https://i.pravatar.cc/150?img=32";

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Đóng dropdown nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm px-4 py-2 sticky top-0 z-50">
      <div className="grid grid-cols-3 items-center w-full">
        {/* Cột trái: Logo + Search */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-purple-600 whitespace-nowrap">
            MeowSocial
          </Link>
          {/* Tìm kiếm - hiện từ md trở lên */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <FaSearch className="text-gray-500 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm trên MeowSocial"
              className="bg-transparent focus:outline-none text-sm w-40 lg:w-64"
            />
          </div>
        </div>

        {/* Cột giữa: Navigation - ẩn trên mobile */}
        <div className="hidden md:flex justify-center items-center gap-6">
          <Link
            to="/"
            className={`flex items-center gap-2 transition-colors duration-150 ${location.pathname === "/"
                ? "text-purple-600 font-semibold"
                : "text-gray-600 hover:text-purple-600"
              }`}
          >
            <FaHome className="w-6 h-6" />
            <span className="text-sm font-medium hidden lg:inline">Trang chủ</span>
          </Link>

          <Link
            to="/following"
            className={`flex items-center gap-2 transition-colors duration-150 ${location.pathname === "/following"
                ? "text-purple-600 font-semibold"
                : "text-gray-600 hover:text-purple-600"
              }`}
          >
            <FaUserFriends className="w-6 h-6" />
            <span className="text-sm font-medium hidden lg:inline">Đã theo dõi</span>
          </Link>
        </div>

        {/* Cột phải: Icon + Avatar */}
        <div className="flex justify-end items-center gap-3 md:gap-6 relative" ref={dropdownRef}>
          {/* Notification */}
          <button className="relative text-gray-600 hover:text-purple-600">
            <FaBell className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
              3
            </span>
          </button>

          {/* Message */}
          <button className="relative text-gray-600 hover:text-purple-600">
            <FaFacebookMessenger className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
              2
            </span>
          </button>

          {/* Avatar */}
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-800 transition-transform hover:scale-105"
          >
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-12 right-0 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition"
              >
                <FaUser className="w-4 h-4" />
                <span>Trang cá nhân</span>
              </Link>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  handleLogout();
                }}
                className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gray-50 transition"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
