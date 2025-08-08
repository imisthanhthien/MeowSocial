import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaCat } from "react-icons/fa";

export default function Login() {
  const { login, user, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMeowLoading, setIsMeowLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🐱 Show cute meow loading
    setIsMeowLoading(true);

    setTimeout(async () => {
      setIsMeowLoading(false);
      const res = await login(email, password);

      if (res?.access_token) {
        navigate("/");
      } else {
        alert(res?.message || "Đăng nhập thất bại");
      }
    }, 2000); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 px-4 relative">

      {/* 🐾 Meow Loading Overlay */}
      {isMeowLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <FaCat className="text-pink-400 text-6xl animate-bounce mb-4" />
          <p className="text-lg font-semibold text-pink-500 animate-pulse">
            Meow meow... Đang đăng nhập...
          </p>
        </div>
      )}

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-pink-200 relative">
        <div className="flex justify-center mb-4">
          <FaCat className="text-pink-400 text-5xl animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Đăng nhập MeowSocial
        </h2>

        {/* Error từ context */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email của bạn"
            className="w-full px-4 py-2 border border-purple-200 rounded-full mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border border-purple-200 rounded-full mb-3 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-400 text-white py-2 rounded-full hover:bg-pink-500 transition duration-300 font-semibold shadow"
            disabled={loading || isMeowLoading}
          >
            {loading ? "Đang đăng nhập..." : "Meow đăng nhập"}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">Chưa có tài khoản? </span>
          <Link
            to="/register"
            className="text-pink-500 hover:underline text-sm font-semibold"
          >
            Đăng ký ngay!
          </Link>
        </div>
      </div>
    </div>
  );
}
