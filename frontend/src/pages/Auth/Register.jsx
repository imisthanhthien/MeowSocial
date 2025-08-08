import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCat } from "react-icons/fa";

export default function Register() {
  const { register, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res?.success) {
      navigate("/login");
    } else {
      alert(res?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-pink-200">
        <div className="flex justify-center mb-4">
          <FaCat className="text-pink-400 text-5xl animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Đăng ký</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Tên"
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-150"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-150"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-150"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        {/* Dòng chuyển hướng đến đăng nhập */}
        <div className="text-center mt-4">
          <span className="text-gray-600">Đã có tài khoản? </span>
          <Link to="/login" className="text-pink-500 font-medium hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>

  );
}
