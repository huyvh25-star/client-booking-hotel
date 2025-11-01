import axiosClient from "./axiosClient";
const billApi = {
  save: (data) => axiosClient.post("/bills/", data),
  //   findAllByStatus: () => axiosClient.get("/banners/find"),
  //   getById: (id) => axiosClient.get(`/banners/${id}`),
};
export default billApi;
