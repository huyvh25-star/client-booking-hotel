import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("user_token");
  const location = useLocation();

  // Nếu chưa đăng nhập
  if (!token) {
    // Lấy path hiện tại + query (nếu có)
    const currentPath = location.pathname + location.search;
    const encoded = encodeURIComponent(currentPath);

    // Nếu chưa phải trang login thì redirect sang login
    if (location.pathname !== "/login") {
      return <Navigate to={`/login?redirect=${encoded}`} replace />;
    }
  }

  return children;
}
