import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Star,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import hotelsApi from "../api/hotelApi";
import roomApi from "../api/roomApi";
import RoomCard from "../component/RoomCard";

export default function HotelDetail() {
  const { hotel_id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [imgs, setImgs] = useState({}); // { roomId: [img1, img2, ...] }

  // Fetch hotel info
  const fetchHotel = async () => {
    try {
      const res = await hotelsApi.getById(hotel_id);
      setHotel(res.data);
    } catch (error) {
      console.error("Lỗi tải khách sạn:", error);
    }
  };

  // Fetch all rooms of the hotel
  const fetchRooms = async () => {
    try {
      const res = await roomApi.getAll(hotel_id);
      setRooms(res.data);
      console.log(res.data);
      // Gọi song song lấy ảnh cho từng room
      res.data.forEach(async (room) => {
        try {
          const imgRes = await roomApi.getImages(room._id);
          setImgs((prev) => ({ ...prev, [room._id]: imgRes.data || [] }));
        } catch (error) {
          console.error("Lỗi tải ảnh phòng:", error);
        }
      });
    } catch (error) {
      console.error("Lỗi khi tải danh sách phòng:", error);
    }
  };

  useEffect(() => {
    fetchHotel();
    fetchRooms();
  }, [hotel_id]);

  // Render sao
  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const total = 5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} fill="currentColor" size={18} />);
    }
    if (hasHalf)
      stars.push(
        <Star key="half" fill="currentColor" size={18} className="opacity-50" />
      );
    for (let i = stars.length; i < total; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={18} className="text-gray-300" />
      );
    }
    return stars;
  };

  if (!hotel)
    return (
      <div className="text-center text-gray-500 py-10">
        Đang tải thông tin khách sạn...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Ảnh khách sạn */}
      <div className="mb-6">
        <img
          src={hotel.img || ""}
          alt={hotel.name || "Hotel"}
          className="rounded-xl w-full h-72 object-cover"
        />
      </div>

      {/* Tên & Địa chỉ */}
      <h2 className="text-3xl font-bold text-blue-700 mb-2">{hotel.name}</h2>
      <p className="flex items-center text-gray-500 mb-2">
        <MapPin size={18} className="mr-1" /> {hotel.address || "Đang cập nhật"}
      </p>

      {/* Rating */}
      <p className="flex items-center text-yellow-500 mb-4">
        {renderStars(hotel.rating)}
        <span className="ml-2 text-gray-600 text-sm">
          {hotel.rating ? hotel.rating.toFixed(1) : "Chưa có đánh giá"}
        </span>
      </p>

      {/* Mô tả */}
      <p className="text-gray-700 mb-8 leading-relaxed">{hotel.description}</p>

      {/* Danh sách phòng */}
      <h3 className="text-xl font-semibold mb-4">Danh sách phòng</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room._id}
            room={room}
            images={imgs[room._id] || []}
            hotelId={hotel_id}
          />
        ))}
      </div>
    </div>
  );
}
