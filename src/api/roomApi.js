import axiosClient from "./axiosClient";

const roomApi = {
  getAll: (id) => axiosClient.get(`/rooms/hotel/${id}`),
  getById: (id) => axiosClient.get(`/rooms/${id}`),
  getImages: (id) => axiosClient.get(`/room-image?id=${id}`),
};

export default roomApi;
