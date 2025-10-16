import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
// Tạo instance axios
const axiosClient = axios.create({
  baseURL: apiUrl, // URL gốc backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // nếu bạn cần gửi cookie / JWT kèm theo request
});

// 🧱 INTERCEPTOR: trước khi gửi request
// axiosClient.interceptors.request.use(
//   (config) => {
//     // Lấy token từ localStorage (nếu có)
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Xử lý lỗi trước khi gửi request
//     return Promise.reject(error);
//   }
// );

//🧱 INTERCEPTOR: sau khi nhận response
axiosClient.interceptors.response.use(
  (response) => {
    // Nếu backend trả về data dạng { data, message, pagination, ... }
    return response.data;
  },
  (error) => {
    // Xử lý lỗi chung (401, 403, 500...)
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        console.error("Unauthorized! Redirect to login...");
        // Có thể logout / redirect
      } else if (status === 403) {
        console.error("Forbidden!");
      } else if (status >= 500) {
        console.error("Server error:", data?.message || "Unknown error");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
