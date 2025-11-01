import axiosClient from "./axiosClient";

const userApi = {
  // 🧾 Lấy danh sách user (phân trang, chỉ role = user)
  getAll: (params) => axiosClient.get("/users", { params }),

  // 🧍‍♂️ Lấy chi tiết 1 user
  getById: (id) => axiosClient.get(`/users/${id}`),

  // ✏️ Cập nhật tên, số điện thoại, mật khẩu
  update: (id, data) => axiosClient.put(`/users/${id}`, data),
};

export default userApi;
