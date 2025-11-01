import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("user_token");
  const location = useLocation();

  // Nếu chưa đăng nhập
  if (!token) {
    // Chỉ thêm redirect nếu chưa có sẵn trong URL
    const currentPath = location.pathname + location.search;
    const encoded = encodeURIComponent(currentPath);

    // Nếu đã là trang login rồi thì không redirect nữa
    if (location.pathname !== "/login") {
      return <Navigate to={`/login?redirect=${encoded}`} replace />;
    }
  }

  return children;
}
