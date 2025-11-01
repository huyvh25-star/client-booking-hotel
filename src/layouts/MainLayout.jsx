import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, LogIn, User, LogOut, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MainLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("user_token");

  const handleLogout = () => {
    localStorage.clear(); // Xóa toàn bộ key trong localStorage
    toast.success("Đăng xuất thành công 👋");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen   bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Đặt Phòng Nhanh
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/hotel"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
              }
            >
              Khách sạn
            </NavLink>
            <NavLink
              to="/bill"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
              }
            >
              Đơn đặt phòng
            </NavLink>
          </nav>

          {/* User area */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <User className="w-5 h-5 text-gray-700" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">Tài khoản</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-sm flex items-center gap-1"
              >
                <LogIn className="w-4 h-4" /> Đăng nhập
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 shadow-inner flex flex-col gap-3 py-4 px-6">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/hotel"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Khách sạn
            </NavLink>
            <NavLink
              to="/bill"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Đơn đặt phòng
            </NavLink>
          </nav>
        )}
      </header>

      {/* CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Vũ Hoàng Huy - 0353204860</p>
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/huyvh31846"
              className="hover:text-blue-600"
            >
              facebook
            </a>
            <a
              href="https://www.facebook.com/huyvh31846"
              className="hover:text-blue-600"
            >
              zalo
            </a>
            <span className="hover:text-blue-600">SĐT: 0123-456-789</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
