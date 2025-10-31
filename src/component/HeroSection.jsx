import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { toast } from "sonner";

export default function HeroSection({ banners }) {
  console.log("banner : ", banners);

  const [current, setCurrent] = useState(0);
  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  //   const handleSearch = () => toast.success("Đang tìm khách sạn phù hợp ✈️");

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* bannershow images */}
      {banners.map((slide, index) => (
        <img
          key={index}
          src={slide.url}
          alt={`Slide ${index}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Đặt phong ngay siêu nhiều ưu đãi
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl">
          chuỗi khách sạn của chúng tôi cung cấp các khách sạn giá tốt
        </p>
        <Link
          to="/hotel"
          className="w-36 h-12 flex justify-center items-center rounded-2xl font-bold text-white 
             bg-gradient-to-r from-amber-400 to-yellow-500 
             shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Đặt phòng ngay
        </Link>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-white scale-110" : "bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
