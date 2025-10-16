import axiosClient from "./axiosClient";

const hotelsApi = {
  getAll: (params) => axiosClient.get("/hotels", { params }),
  getById: (id) => axiosClient.get(`/hotels/${id}`),
};
export default hotelsApi;
