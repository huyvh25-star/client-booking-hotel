import { useState } from "react";
import { Link } from "react-router-dom";
import { DollarSign } from "lucide-react";

function RoomCard({ room, images = [], hotelId }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;
  const formatDescription = (text) => {
    if (!text) return [];
    return text
      .split(",") // tách theo dấu phẩy
      .map((item) => item.trim()) // xóa khoảng trắng dư
      .filter((item) => item.length > 0); // bỏ phần rỗng
  };
  const next = (e) => {
    e.stopPropagation();
    if (total > 0) setCurrent((c) => (c + 1) % total);
  };

  const prev = (e) => {
    e.stopPropagation();
    if (total > 0) setCurrent((c) => (c - 1 + total) % total);
  };

  return (
    <div className="card bg-white shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden border border-gray-100">
      {/* ✅ Carousel ảnh */}
      <div className="relative w-full h-56 bg-gray-100">
        {total > 0 ? (
          <img
            src={images[current]?.url}
            alt={room.name}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Không có ảnh
          </div>
        )}

        {/* Nút điều hướng & chấm */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 rounded-full p-1.5 shadow"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 rounded-full p-1.5 shadow"
            >
              ›
            </button>

            {/* Dấu chấm hiển thị ảnh hiện tại */}
            <div className="absolute bottom-2 w-full flex justify-center gap-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === current ? "bg-yellow-500" : "bg-white/70"
                  }`}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ✅ Nội dung phòng */}
      <div className="p-4">
        <h4 className="font-semibold text-lg text-gray-800 mb-1">
          {room.name}
        </h4>
        <p className="flex items-center gap-1 text-gray-600">
          <DollarSign size={16} className="text-yellow-500" />
          {room.price.toLocaleString()}/ đêm
        </p>
        <p className="text-gray-500 text-sm">
          Số người tối đa: {room.capacity}
        </p>

        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          {formatDescription(room.description).map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}
        </ul>
        <div className="flex justify-end mt-3">
          <Link
            to={`/hotel/${hotelId}/${room._id}`}
            className="btn btn-outline btn-primary btn-sm rounded-full px-4"
          >
            Đặt phòng
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
