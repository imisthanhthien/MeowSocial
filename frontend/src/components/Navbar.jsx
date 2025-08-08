import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaBell, FaFacebookMessenger } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHome, FaUserFriends } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NotificationsBell from './NotificationsBell';
import { FaCat } from 'react-icons/fa';

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
    <nav className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 shadow-md px-4 py-2 sticky top-0 z-50">
      <div className="grid grid-cols-3 items-center w-full">

        {/* Cột trái: Logo + Search */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-pink-300 text-3xl hover:text-pink-400 transition duration-200">
            <FaCat />
          </Link>

          {/* Tìm kiếm - hiện từ md trở lên */}
          <div className="hidden md:flex items-center bg-pink-100 px-4 py-2 rounded-full shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-pink-300">
            <FaSearch className="text-pink-400 w-4 h-4 mr-2 transition-transform duration-200 group-focus-within:scale-110" />
            <input
              type="text"
              placeholder="Meow meow... tìm gì nè?"
              className="bg-transparent focus:outline-none text-sm w-44 lg:w-64 placeholder-pink-400 text-pink-700"
            />
          </div>

        </div>

        {/* Cột giữa: Navigation - ẩn trên mobile */}
        <div className="hidden md:flex justify-center items-center gap-6">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 
      ${location.pathname === "/"
                ? "bg-pink-100 text-pink-600 shadow-md font-semibold"
                : "text-white hover:text-pink-500 hover:bg-pink-50 hover:shadow"
              }`}
          >
            <FaHome className="w-6 h-6" />
            <span className="text-sm font-medium hidden lg:inline">Trang chủ</span>
          </Link>

          <Link
            to={`/following/${user?.id}`}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 
      ${location.pathname === `/following/${user?.id}`
                ? "bg-pink-100 text-pink-600 shadow-md font-semibold"
                : "text-white hover:text-pink-500 hover:bg-pink-50 hover:shadow"
              }`}
          >
            <FaUserFriends className="w-6 h-6" />
            <span className="text-sm font-medium hidden lg:inline">Đã theo dõi</span>
          </Link>
        </div>


        {/* Cột phải: Icon + Avatar */}
        <div className=" flex justify-end items-center gap-3 md:gap-6 relative" ref={dropdownRef}>

          <NotificationsBell userId={user?.id} />

          {/* Message */}
          <button className="relative text-gray-600 hover:text-purple-600">
            {/* <FaFacebookMessenger className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
              2
            </span> */}

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
            <div className="absolute top-12 right-0 w-52 bg-white border border-pink-200 rounded-2xl shadow-lg z-50 overflow-hidden animate-fade-in">
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition rounded-lg"
              >
                <FaUser className="w-5 h-5" />
                <span>Trang cá nhân</span>
              </Link>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  handleLogout();
                }}
                className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-100 transition rounded-lg"
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
