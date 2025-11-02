import { useEffect, useState } from "react";
import billApi from "../api/billApi";
import { toast } from "sonner";
import dayjs from "dayjs";

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [status, setStatus] = useState("");
  const [pagination, setPagination] = useState(null);

  const user = JSON.parse(localStorage.getItem("user_login"));

  const fetchBills = async () => {
    try {
      const res = await billApi.getByUser(user._id, page, limit, status);
      setBills(res.data);
      setPagination(res.pagination);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải danh sách hóa đơn ❌");
    }
  };

  const updateStatusBill = async (billId, newStatus) => {
    try {
      await billApi.updateStatus(billId, { status: newStatus });
      toast.success("Cập nhật trạng thái thành công ✅");
      fetchBills();
    } catch (error) {
      console.error(error);
      toast.error("Không thể cập nhật trạng thái hóa đơn ❌");
    }
  };

  useEffect(() => {
    fetchBills();
  }, [page, status]);

  // Hàm đổi màu trạng thái
  const renderStatus = (status) => {
    const colorMap = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
      confirmed: "bg-green-100 text-green-700 border-green-400",
      cancelled: "bg-red-100 text-red-700 border-red-400",
      paid: "bg-blue-100 text-blue-700 border-blue-400",
    };

    const textMap = {
      pending: "⏳ Chờ xác nhận",
      confirmed: "✅ Đã xác nhận",
      cancelled: "❌ Đã hủy",
      paid: "💳 Đã thanh toán",
    };

    return (
      <span
        className={`px-3 py-1 border text-sm font-medium rounded-full ${
          colorMap[status] || "bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        {textMap[status] || status}
      </span>
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        🧾 Danh sách hóa đơn của bạn
      </h2>

      {/* Bộ lọc trạng thái */}
      <div className="mb-5 flex justify-between items-center">
        <select
          className="border rounded-md px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="paid">Đã thanh toán</option>
          <option value="cancelled">Đã hủy</option>
        </select>

        <span className="text-sm text-gray-500">
          Tổng: {pagination?.totalDocs || bills.length} hóa đơn
        </span>
      </div>

      {/* Danh sách hóa đơn */}
      {bills.length === 0 ? (
        <p className="text-gray-500 text-center py-6">Không có hóa đơn nào</p>
      ) : (
        bills.map((bill) => (
          <div
            key={bill._id}
            className="border p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {bill.hotel_id?.name}
              </h3>
              <div>{renderStatus(bill.status)}</div>
            </div>

            <p className="text-gray-600">
              <strong>Phòng:</strong> {bill.room_id?.name}
            </p>
            <p className="text-gray-600">
              <strong>Tổng tiền:</strong>{" "}
              {bill.total_price.toLocaleString("vi-VN")} ₫
            </p>
            <p className="text-gray-500 text-sm">
              <strong>Ngày tạo:</strong>{" "}
              {dayjs(bill.createdAt).format("DD/MM/YYYY HH:mm")}
            </p>

            {bill.status === "pending" && (
              <button
                onClick={() => updateStatusBill(bill._id, "cancelled")}
                className="mt-3 bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
              >
                Hủy đơn
              </button>
            )}
          </div>
        ))
      )}

      {/* Phân trang */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1.5 rounded-md border transition-colors ${
                page === i + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BillPage;
