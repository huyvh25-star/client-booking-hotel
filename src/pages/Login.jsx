import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  ArrowLeft,
  KeyRound,
  Loader2,
} from "lucide-react";
import authApi from "../api/authApi";

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // "login" | "register" | "forgot"
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (mode === "login") {
        res = await authApi.login({
          email: user.email,
          password: user.password,
        });
        if (res.data.role === "admin") {
          toast.error("bạn không truy cập trang người dùng  được !!");
          return;
        } else {
          localStorage.setItem("user_token", res.access_token);
          localStorage.setItem("user_login", JSON.stringify(res.data));
          toast.success("Đăng nhập thành công!");
          navigate("/");
        }
      } else if (mode === "register") {
        res = await authApi.register(user);
        toast.success("Đăng ký thành công!");
        setMode("login");
      } else {
        // forgot password
        await authApi.forgotPassword({ email: user.email });
        toast.success("Vui lòng kiểm tra email để nhận mật khẩu tạm!");
        setMode("login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {mode === "login"
            ? "Đăng nhập tài khoản"
            : mode === "register"
            ? "Tạo tài khoản mới"
            : "Quên mật khẩu"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">
              <User className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Họ và tên"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full outline-none"
                required
              />
            </div>
          )}

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">
            <Mail className="text-gray-500 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full outline-none"
              required
            />
          </div>

          {mode !== "forgot" && (
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">
              <Lock className="text-gray-500 mr-2" size={20} />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full outline-none"
                required
              />
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Đang xử lý...
              </>
            ) : mode === "login" ? (
              <>
                <LogIn size={18} /> Đăng nhập
              </>
            ) : mode === "register" ? (
              <>
                <UserPlus size={18} /> Đăng ký
              </>
            ) : (
              <>
                <KeyRound size={18} /> Gửi yêu cầu
              </>
            )}
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-4 text-sm text-gray-600">
          {mode === "login" && (
            <>
              <button
                onClick={() => setMode("forgot")}
                className="text-blue-600 hover:underline"
              >
                Quên mật khẩu?
              </button>
              <div className="mt-2">
                Chưa có tài khoản?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Đăng ký ngay
                </button>
              </div>
            </>
          )}

          {mode === "register" && (
            <div>
              Đã có tài khoản?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-600 hover:underline font-medium"
              >
                Đăng nhập
              </button>
            </div>
          )}

          {mode === "forgot" && (
            <div>
              <button
                onClick={() => setMode("login")}
                className="flex items-center justify-center gap-1 text-blue-600 hover:underline mt-2 mx-auto"
              >
                <ArrowLeft size={16} /> Quay lại đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
