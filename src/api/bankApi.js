import axiosClient from "./axiosClient";
const bankApi = {
  getAll: () => axiosClient.get("/banks/one"),
};
export default bankApi;
