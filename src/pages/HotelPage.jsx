import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, DollarSign, Filter } from "lucide-react";
import hotelsApi from "../api/hotelApi";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, [search, sort]); // chạy lại khi search hoặc sort thay đổi

  const formatDescription = (text) => {
    if (!text) return [];
    return text
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const fetchHotels = async () => {
    try {
      setLoading(true);

      // Tạo object params để gửi query
      const params = {
        limit: 12,
        active: true,
      };

      // nếu người dùng nhập tên thì thêm vào query
      if (search.trim()) {
        params.name = search.trim();
      }

      // sắp xếp theo giá
      if (sort) {
        params.sort = sort; // server sẽ xử lý sort=asc hoặc sort=desc
      }

      const res = await hotelsApi.getAll(params);
      const fakeData = res.data.map((hotel) => ({
        ...hotel,
        description: hotel.description,
        price: hotel.price,
        rating: hotel.rating,
      }));
      setHotels(fakeData);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Tiêu đề */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">
          Danh sách khách sạn
        </h2>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sắp xếp</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 py-10 animate-pulse">
          Đang tải dữ liệu...
        </div>
      )}

      {/* Danh sách khách sạn */}
      {!loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              Không tìm thấy khách sạn nào phù hợp.
            </p>
          ) : (
            hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Ảnh + thông tin phụ */}
                <div className="relative">
                  <img
                    src={hotel.img}
                    alt={hotel.name}
                    className="h-52 w-full object-cover rounded-t-xl"
                  />

                  {/* ⭐ Góc trái trên */}
                  <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 font-semibold px-2 py-1 rounded-md text-sm shadow-md">
                    ⭐ {hotel.rating}
                  </div>

                  {/* 💰 Góc phải dưới */}
                  <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 shadow-md">
                    <DollarSign size={14} />{" "}
                    {hotel.price.toLocaleString("vi-VN")} VNĐ/đêm
                  </div>
                </div>

                {/* Nội dung */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-700 mb-1">
                    {hotel.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                    <MapPin size={14} className="text-gray-400" />{" "}
                    {hotel.address}
                  </p>

                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {formatDescription(hotel.description).map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>

                  <div className="flex justify-center mt-4">
                    <Link
                      to={`/hotel/${hotel._id}`}
                      className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
