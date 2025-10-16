import axiosClient from "./axiosClient";

const mailApi = {
  sendBooking: (data) => axiosClient.post("/mail/test-booking", data),
};

export default mailApi;
