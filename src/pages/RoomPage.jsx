import { useParams, Link } from "react-router-dom";
import { MapPin, Star, DollarSign } from "lucide-react";

const rooms = [
  { id: 1, name: "Phòng Deluxe", price: 1200000, beds: 2 },
  { id: 2, name: "Phòng Superior", price: 950000, beds: 1 },
  { id: 3, name: "Phòng VIP View Biển", price: 1800000, beds: 2 },
];

export default function HotelDetail() {
  const { hotel_id } = useParams();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80"
          alt="Hotel"
          className="rounded-xl w-full h-72 object-cover"
        />
      </div>

      <h2 className="text-3xl font-bold text-blue-700 mb-2">
        The Grand Resort #{hotel_id}
      </h2>
      <p className="flex items-center text-gray-500 mb-2">
        <MapPin size={18} className="mr-1" /> Hà Nội
      </p>
      <p className="flex items-center text-yellow-500 mb-4">
        <Star /> <Star /> <Star /> <Star /> <Star className="text-gray-300" />{" "}
        <span className="ml-2 text-gray-600">4.0/5</span>
      </p>

      <p className="text-gray-700 mb-8 leading-relaxed">
        The Grand Resort là khách sạn cao cấp tọa lạc tại trung tâm Hà Nội, mang
        đến trải nghiệm nghỉ dưỡng sang trọng với hồ bơi, spa và nhà hàng đạt
        chuẩn 5 sao.
      </p>

      <h3 className="text-xl font-semibold mb-4">Danh sách phòng</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="card bg-base-100 shadow-sm hover:shadow-lg transition"
          >
            <div className="card-body">
              <h4 className="card-title">{room.name}</h4>
              <p className="flex items-center gap-1 text-gray-600">
                <DollarSign size={16} />
                {room.price.toLocaleString()}đ / đêm
              </p>
              <p className="text-gray-500">Giường: {room.beds}</p>
              <div className="card-actions justify-end mt-2">
                <Link
                  to={`/hotel/${hotel_id}/${room.id}`}
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Đặt phòng
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
