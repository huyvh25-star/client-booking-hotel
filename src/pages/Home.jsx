import { MapPin, Calendar, Search, Star } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Building2, Users, CircleDollarSign, Hotel } from "lucide-react";
import hotelsApi from "../api/hotelApi";
import { useEffect, useState } from "react";
export default function Home() {
  const [hotels, setHotels] = useState([]);

  // fetch hotels
  const fetchHotels = async () => {
    try {
      const rest = await hotelsApi.getAll({ limit: 3 });
      console.log("rest  :", rest);
      setHotels(rest.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHotels();
  }, []);
  const handleSearch = () => {
    toast.success("Đang tìm khách sạn phù hợp ✈️");
  };
  // const hotels = [
  //   {
  //     id: 1,
  //     name: "The Grand Resort",
  //     city: "Đà Nẵng",
  //     img: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&w=1200&q=80",
  //     rating: 4.8,
  //     price: 1450000,
  //   },
  //   {
  //     id: 2,
  //     name: "Sunrise Hotel",
  //     city: "Nha Trang",
  //     img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  //     rating: 4.5,
  //     price: 890000,
  //   },
  //   {
  //     id: 3,
  //     name: "Ocean View Villas",
  //     city: "Phú Quốc",
  //     img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=60",
  //     rating: 4.9,
  //     price: 2350000,
  //   },
  // ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <section className="relative w-full h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1500&q=80"
          alt="Travel background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Khám phá & đặt phòng dễ dàng
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl">
            Tìm kiếm hàng ngàn khách sạn, villa và resort trên khắp Việt Nam
          </p>

          {/* SEARCH BOX */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4 p-5 w-full max-w-3xl">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <MapPin className="text-blue-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Điểm đến..."
                className="input input-bordered w-full md:w-64"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto focus:border-amber-300">
              <Calendar className="text-blue-600 w-5 h-5" />
              <input
                type="date"
                className="input input-bordered w-full md:w-48"
              />
            </div>
            <button
              onClick={handleSearch}
              className="btn btn-primary w-full md:w-auto flex items-center gap-2 font-semibold px-6"
            >
              <Search className="w-4 h-4" /> Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* 🏨 About Section */}
      <section className="max-w-6xl  mt-8 mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
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
              <p className="font-bold text-gray-800 text-sm">Hơn 2.000+</p>
              <p className="text-xs text-gray-500">Khách sạn toàn quốc</p>
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
            chóng. BookingApp giúp bạn dễ dàng tìm kiếm, so sánh và đặt phòng
            khách sạn yêu thích chỉ trong vài phút.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Địa điểm phong phú
                </h4>
                <p className="text-sm text-gray-600">
                  Từ trung tâm thành phố đến vùng biển yên bình – chúng tôi có
                  tất cả.
                </p>
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
      {/* end */}

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
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group relative"
            >
              {/* Ảnh khách sạn */}
              <div className="relative overflow-hidden">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700"
                />
                {/* Overlay mờ khi hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Góc trên hiển thị rating */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1 shadow-md">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {hotel.rating}
                </div>
              </div>

              {/* Nội dung thông tin */}
              <div className="p-6 space-y-3">
                <div className="flex justify-center items-center">
                  <Hotel />
                  <h3 className="text-lg font-bold text-gray-800">
                    {hotel.name}
                  </h3>
                </div>
                <div className="flex flex-col justify-between  md:flex-row">
                  <p className="flex items-center gap-1 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 text-blue-500" /> {hotel.address}
                  </p>
                  <Link
                    to={`/hotel/${hotel._id}`}
                    className="btn btn-primary btn-sm text-white shadow-md"
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
