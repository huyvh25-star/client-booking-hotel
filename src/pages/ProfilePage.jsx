import React, { useState, useEffect } from "react";
import userApi from "../api/userApi";
import { toast } from "sonner";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  // 🧩 Lấy thông tin từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user_login");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setForm({
        name: parsedUser.name || "",
        phone: parsedUser.phone || "",
        password: "",
      });
    }
  }, []);

  // 🧾 Hàm cập nhật thông tin
  const handleUpdate = async () => {
    if (!user?._id) return toast.error("Không tìm thấy tài khoản");

    if (!form.name.trim()) return toast.error("Tên không được để trống");
    if (!form.phone.trim())
      return toast.error("Số điện thoại không được để trống");

    setLoading(true);
    try {
      const res = await userApi.update(user._id, {
        name: form.name,
        phone: form.phone,
        password: form.password || undefined, // chỉ gửi nếu có nhập
      });

      toast.success(res.message || "Cập nhật thành công!");
      // Cập nhật lại localStorage
      const updatedUser = { ...user, ...res.data };
      localStorage.setItem("user_login", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setForm({ ...form, password: "" });
    } catch (error) {
      toast.error("Cập nhật thất bại!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center mt-10">Đang tải thông tin...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
        Thông tin cá nhân
      </h2>

      <div className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="text"
            value={user.email}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-pink-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Số điện thoại
          </label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-pink-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Mật khẩu mới
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-pink-500"
            placeholder="Nhập nếu muốn đổi"
          />
        </div>

        {/* Nút cập nhật */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`w-full py-2 mt-4 font-semibold rounded-xl text-white transition 
            ${loading ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"}`}
        >
          {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
