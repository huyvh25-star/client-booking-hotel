import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CalendarDays,
  Mail,
  User,
  Users,
  Home,
  ArrowRight,
  Phone,
} from "lucide-react";
import roomApi from "../api/roomApi";
import hotelsApi from "../api/hotelApi";
import mailApi from "../api/mailApi";

export default function BookingPage() {
  const { hotel_id, room_id } = useParams();

  // State riêng cho room và hotel
  const [room, setRoom] = useState({});
  const [hotel, setHotel] = useState({});

  // Fetch thông tin phòng
  const fetchRoom = async () => {
    try {
      const res = await roomApi.getById(room_id);
      setRoom(res.data);
    } catch (error) {
      console.log("Lỗi khi lấy phòng:", error);
    }
  };

  // Fetch thông tin khách sạn
  const fetchHotel = async () => {
    try {
      const res = await hotelsApi.getById(hotel_id);
      setHotel(res.data);
    } catch (error) {
      console.log("Lỗi khi lấy khách sạn:", error);
    }
  };

  useEffect(() => {
    fetchRoom();
    fetchHotel();
  }, [room_id, hotel_id]);

  // State lưu thông tin form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Thông tin đặt phòng:");
    const booking = {
      room_price: room?.price,
      hotel_id,
      hotel_name: hotel?.name,
      room_id,
      room_name: room?.name,
      ...formData,
    };

    try {
      const rest = await mailApi.sendBooking(booking);
      console.log(rest);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2 flex items-center justify-center gap-2">
            <Home className="w-7 h-7 text-indigo-600" />
            {hotel?.name ? `Đặt phòng ${hotel.name}` : `Đang tải khách sạn...`}
          </h2>
          <p className="text-gray-600">
            {room?.name ? `Phòng: ${room.name}` : "Đang tải phòng..."}
          </p>
        </div>

        {/* Booking Form */}
        <div className="card bg-base-100 shadow-xl border border-gray-100 p-6 md:p-8 rounded-2xl transition-all hover:shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Họ và tên */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-500" /> Họ và tên
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <Mail className="w-5 h-5 text-indigo-500" /> Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Số điện thoại */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <Phone className="w-5 h-5 text-indigo-500" /> Số điện thoại
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại của bạn"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Ngày nhận & trả */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-indigo-500" /> Ngày
                    nhận phòng
                  </span>
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-indigo-500" /> Ngày
                    trả phòng
                  </span>
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Số người */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" /> Số người
                </span>
              </label>
              <input
                type="number"
                name="guests"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Nhập số lượng người"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Nút xác nhận */}
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2 mt-4 transition-transform hover:scale-105"
            >
              Xác nhận đặt phòng
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Cảm ơn bạn đã lựa chọn khách sạn {hotel?.name || hotel_id}! 💙
        </p>
      </div>
    </div>
  );
}
