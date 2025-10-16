import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, DollarSign, Filter } from "lucide-react";
import hotelsApi from "../api/hotelApi";
export default function HotelList() {
  const [hotels, setHotels] = useState([]);

  // fetch hotels
  const fetchHotels = async () => {
    try {
      const rest = await hotelsApi.getAll({ limit: 12 });
      console.log("rest  :", rest);
      setHotels(rest.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHotels();
  }, []);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [sort, setSort] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Filter className="text-blue-500" /> Danh sách khách sạn
      </h2>

      {/* Bộ lọc */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên..."
            className="input input-bordered w-full pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="select select-bordered"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">Tất cả địa điểm</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="Đà Nẵng">Đà Nẵng</option>
          <option value="Nha Trang">Nha Trang</option>
          <option value="Đà Lạt">Đà Lạt</option>
        </select>

        <select
          className="select select-bordered"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sắp xếp</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      {/* Danh sách khách sạn */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition"
          >
            <figure>
              <img
                src={hotel.img}
                alt={hotel.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-blue-600">{hotel.name}</h3>
              <p className="flex items-center gap-1 text-gray-500">
                <MapPin size={16} /> {hotel.address}
              </p>
              <div className="card-actions justify-end mt-2">
                <Link
                  to={`/hotel/${hotel._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
