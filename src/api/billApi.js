import axiosClient from "./axiosClient";
const billApi = {
  save: (data) => axiosClient.post("/bills/", data),
  //   findAllByStatus: () => axiosClient.get("/banners/find"),
  //   getById: (id) => axiosClient.get(`/banners/${id}`),
  // 📋 Lấy danh sách hóa đơn theo user (có phân trang và lọc)
  getByUser: (userId, page = 1, limit = 10, status = "") => {
    let url = `/bills/user/${userId}?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    return axiosClient.get(url);
  },
  updateStatus: (id, data) => axiosClient.put(`/bills/${id}/status`, data),
};
export default billApi;
