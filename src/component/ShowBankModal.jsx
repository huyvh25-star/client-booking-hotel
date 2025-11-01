import { XCircle, CheckCircle } from "lucide-react";

export default function ShowBankModal({ banks, onClose, onPaymentSuccess }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <XCircle className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold text-center mb-4 text-indigo-600">
          Chọn tài khoản để thanh toán 💳
        </h3>

        <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {banks.map((b) => (
            <li
              key={b._id}
              className="p-3 border rounded-lg hover:bg-indigo-50 transition"
            >
              <p className="font-semibold">Ngân hàng: {b.bankName}</p>
              <p className="text-sm text-gray-600">STK: {b.number}</p>
              <p className="text-sm text-gray-600">Chủ TK: {b.name}</p>
            </li>
          ))}
        </ul>

        <button
          onClick={onPaymentSuccess}
          className="btn btn-success w-full mt-6 flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Đã thanh toán
        </button>
      </div>
    </div>
  );
}
