import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login, user, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Nếu đã đăng nhập => chuyển hướng về trang chủ
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, password);

    if (res?.access_token) {
      navigate("/");
    } else {
      alert(res?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Đăng nhập</h2>

        {error && (
          <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-2 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link to="/register" className="text-purple-600 hover:underline">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
  