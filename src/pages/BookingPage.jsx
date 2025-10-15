import { useParams } from "react-router-dom";
import {
  CalendarDays,
  Mail,
  User,
  Users,
  Home,
  ArrowRight,
} from "lucide-react";

export default function BookingPage() {
  const { hotel_id, room_id } = useParams();
  console.log(hotel_id, room_id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2 flex items-center justify-center gap-2">
            <Home className="w-7 h-7 text-indigo-600" />
            Đặt phòng khách sạn #{hotel_id}
          </h2>
          <p className="text-gray-600">Phòng số #{room_id}</p>
        </div>

        {/* Booking Form */}
        <div className="card bg-base-100 shadow-xl border border-gray-100 p-6 md:p-8 rounded-2xl transition-all hover:shadow-2xl">
          <form className="space-y-6">
            {/* Họ và tên */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-500" /> Họ và tên
                </span>
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên của bạn"
                className="input input-bordered w-full"
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
                placeholder="example@email.com"
                className="input input-bordered w-full"
              />
            </div>

            {/* Ngày nhận phòng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-indigo-500" /> Ngày
                    nhận phòng
                  </span>
                </label>
                <input type="date" className="input input-bordered w-full" />
              </div>

              {/* Ngày trả phòng */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-indigo-500" /> Ngày
                    trả phòng
                  </span>
                </label>
                <input type="date" className="input input-bordered w-full" />
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
                min="1"
                placeholder="Nhập số lượng người"
                className="input input-bordered w-full"
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

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Cảm ơn bạn đã lựa chọn khách sạn #{hotel_id}! 💙
        </p>
      </div>
    </div>
  );
}
