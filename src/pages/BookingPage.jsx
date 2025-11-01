import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CalendarDays,
  Users,
  Home,
  ArrowRight,
  FileText,
  CreditCard,
  Phone,
} from "lucide-react";
import { toast } from "sonner";

import roomApi from "../api/roomApi";
import hotelsApi from "../api/hotelApi";
import bankApi from "../api/bankApi";
import billApi from "../api/billApi";
import ShowBankModal from "../component/ShowBankModal";

export default function BookingPage() {
  const navigate = useNavigate();
  const { hotel_id, room_id } = useParams();

  const [user, setUser] = useState({});
  const [room, setRoom] = useState({});
  const [hotel, setHotel] = useState({});
  const [banks, setBanks] = useState([]);
  const [modal, setModal] = useState(false);

  // Thêm vào state ban đầu
  const [formData, setFormData] = useState({
    quantity_room: 1,
    quantity_people: 1,
    check_in: "",
    check_out: "",
    note: "",
    paymentMethod: "off",
    phone: "", // ✅ thêm phone
  });

  // Hàm validate phone
  const isValidPhone = (phone) => {
    // Chỉ chấp nhận số, từ 9-12 chữ số
    const regex = /^[0-9]{9,12}$/;
    return regex.test(phone);
  };

  // === Fetch dữ liệu ===
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user_login"));
    setUser(u);
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await bankApi.getAll();
      setBanks(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy ngân hàng:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomRes, hotelRes] = await Promise.all([
          roomApi.getById(room_id),
          hotelsApi.getById(hotel_id),
        ]);
        setRoom(roomRes.data);
        setHotel(hotelRes.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      }
    };
    fetchData();
  }, [room_id, hotel_id]);

  // === Tính tổng tiền ===
  const calcTotal = () => {
    if (!formData.check_in || !formData.check_out || !room.price) return 0;
    const inDate = new Date(formData.check_in);
    const outDate = new Date(formData.check_out);
    const diffDays = Math.max(
      1,
      Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24))
    );
    return room.price * formData.quantity_room * diffDays;
  };

  // === Xử lý thay đổi form ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // === Lưu hóa đơn ===
  const saveBill = async (bill) => {
    try {
      const res = await billApi.save(bill);
      console.log("✅ Đã lưu hóa đơn:", res.data);
    } catch (error) {
      console.error("❌ Lỗi lưu hóa đơn:", error);
      toast.error("Không thể lưu hóa đơn!");
    }
  };

  // === Gửi form đặt phòng ===
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPhone(formData.phone)) {
      toast.error("Số điện thoại không hợp lệ! Vui lòng nhập 9-12 chữ số.");
      return;
    }
    const billData = {
      user_id: user?._id,
      hotel_id,
      room_id,
      quantity_room: Number(formData.quantity_room),
      quantity_people: Number(formData.quantity_people),
      check_in: formData.check_in,
      check_out: formData.check_out,
      total_price: calcTotal(),
      note: formData.note,
      paymentMethod: formData.paymentMethod,
      paymentStatus: "not_paid",
      status: "pending",
      phone: formData.phone,
    };

    console.log("📦 BILL MODEL DATA:", billData);

    if (formData.paymentMethod === "onl") {
      // Mở modal chọn ngân hàng
      setModal(true);
    } else {
      // Thanh toán tại quầy
      saveBill(billData);
      toast.success("Đặt phòng thành công! Thanh toán tại quầy nhé 🏨");
      navigate("/");
    }
  };

  // === Sau khi thanh toán online thành công ===
  const handlePaymentSuccess = async () => {
    const billData = {
      user_id: user?._id,
      hotel_id,
      room_id,
      quantity_room: Number(formData.quantity_room),
      quantity_people: Number(formData.quantity_people),
      check_in: formData.check_in,
      check_out: formData.check_out,
      total_price: calcTotal(),
      note: formData.note,
      paymentMethod: "onl",
      paymentStatus: "paid",
      status: "pending",
      phone: formData.phone,
    };

    try {
      await saveBill(billData);
      toast.success("Gửi yêu cầu đặt phòng thành công!");
      setModal(false);
      navigate("/");
    } catch (err) {
      console.error("Lỗi khi lưu hóa đơn sau thanh toán:", err);
    }
  };

  // === JSX ===
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
            {/* Số lượng phòng */}
            <div className="form-control">
              <label className="label font-semibold">Số lượng phòng</label>
              <input
                type="number"
                name="quantity_room"
                min="1"
                value={formData.quantity_room}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Số người */}
            <div className="form-control">
              <label className="label font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" /> Số người
              </label>
              <input
                type="number"
                name="quantity_people"
                min="1"
                value={formData.quantity_people}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold flex items-center gap-2">
                <Phone className="w-5 h-5 text-indigo-500" /> Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Ngày nhận và trả */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-indigo-500" /> Ngày nhận
                </label>
                <input
                  type="date"
                  name="check_in"
                  value={formData.check_in}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-indigo-500" /> Ngày trả
                </label>
                <input
                  type="date"
                  name="check_out"
                  value={formData.check_out}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            {/* Ghi chú */}
            <div className="form-control">
              <label className="label font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" /> Ghi chú
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Thêm yêu cầu đặc biệt (nếu có)"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            {/* Phương thức thanh toán */}
            <div className="form-control">
              <label className="label font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-500" /> Phương thức
                thanh toán
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="off">Thanh toán tại quầy</option>
                <option value="onl">Thanh toán online</option>
              </select>
            </div>
            {/* Tổng tiền */}
            <div className="text-lg font-semibold text-center text-indigo-700 mt-4">
              Tổng tiền: {calcTotal().toLocaleString()} VND
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2 mt-4 transition-transform hover:scale-105"
            >
              Xác nhận đặt phòng
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Modal ngân hàng */}
        {modal && (
          <ShowBankModal
            banks={banks}
            onClose={() => setModal(false)}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        <p className="text-center text-gray-500 text-sm mt-6">
          Cảm ơn bạn đã lựa chọn khách sạn {hotel?.name || hotel_id}! 💙
        </p>
      </div>
    </div>
  );
}
