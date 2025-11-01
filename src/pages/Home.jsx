import { MapPin, Calendar, Search, Star, Hotel } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Building2, Users } from "lucide-react";
import hotelsApi from "../api/hotelApi";
import { useEffect, useState } from "react";
import bannerApi from "../api/bannerApi";
import HeroSection from "../component/HeroSection";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [banners, setBanners] = useState([]);
  const formatVND = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  const fetchHotels = async () => {
    try {
      const rest = await hotelsApi.getAll({ limit: 3, active: true });
      setHotels(rest.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBanners = async () => {
    try {
      const rest = await bannerApi.findAllByStatus();
      setBanners(rest.data);
      // console.log(rest);
      rest.data;
      console.log(banners);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDescription = (text) => {
    if (!text) return [];
    return text
      .split(",") // tách theo dấu phẩy
      .map((item) => item.trim()) // xóa khoảng trắng dư
      .filter((item) => item.length > 0); // bỏ phần rỗng
  };

  useEffect(() => {
    fetchHotels();
    fetchBanners();
  }, []);

  // const handleSearch = () => {
  //   toast.success("Đang tìm khách sạn phù hợp ✈️");
  // };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen">
        <HeroSection banners={banners} />
      </section>

      {/* 🏨 About Section */}
      <section className="max-w-6xl md:mt-12 mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=60"
            alt="Luxury Hotel"
            className="rounded-2xl shadow-xl w-full object-cover h-[350px]"
          />
          <div className="absolute -bottom-4 -right-4 bg-white shadow-lg rounded-xl p-4 flex items-center gap-3">
            <Building2 className="text-blue-600 w-8 h-8" />
            <div>
              <p className="font-bold text-gray-800 text-sm">giá tốt</p>
              <p className="text-xs text-gray-500">Khách sạn tại hà nội</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Trải nghiệm đặt phòng hiện đại
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Chúng tôi mang đến trải nghiệm du lịch tiện lợi, an toàn và nhanh
            chóng. Đặt Phòng Nhanh giúp bạn dễ dàng tìm kiếm, so sánh và đặt
            phòng khách sạn yêu thích chỉ trong vài phút.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Địa điểm phong phú
                </h4>
                <p className="text-sm text-gray-600">Gần trung tâm thành phố</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Phục vụ tận tâm</h4>
                <p className="text-sm text-gray-600">
                  Đội ngũ hỗ trợ 24/7 luôn sẵn sàng giúp bạn bất cứ lúc nào.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section className="max-w-6xl mx-auto py-20 px-6 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Khách sạn nổi bật
          </h2>
          <p className="text-gray-500 mt-2">
            Được yêu thích bởi hàng ngàn du khách trong tháng này
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group flex flex-col"
            >
              {/* Ảnh khách sạn */}
              <div className="relative overflow-hidden">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Rating */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1 shadow-md">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {hotel.rating}
                </div>
              </div>

              {/* Nội dung */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Hotel size={16} /> {hotel.name}
                </h3>

                <p className="flex items-center gap-1 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 text-blue-500" /> {hotel.address}
                </p>

                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {formatDescription(hotel.description).map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-semibold">
                    {formatVND(hotel.price)} /đêm
                  </span>
                  <Link
                    to={`/hotel/${hotel._id}`}
                    className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sẵn sàng cho chuyến đi tiếp theo?
        </h2>
        <p className="text-blue-100 mb-8 text-lg">
          Đặt phòng dễ dàng, thanh toán an toàn và nhận ưu đãi độc quyền!
        </p>
        <button
          onClick={() => toast.info("Tính năng đang được phát triển 💡")}
          className="btn btn-warning text-blue-900 font-semibold px-10 rounded-full shadow-md hover:shadow-xl transition"
        >
          Khám phá ngay
        </button>
      </section>
    </div>
  );
}
