import axiosClient from "./axiosClient";
const bannerApi = {
  getAll: () => axiosClient.get("/banners/"),
  findAllByStatus: () => axiosClient.get("/banners/find"),
  getById: (id) => axiosClient.get(`/banners/${id}`),
};
export default bannerApi;
