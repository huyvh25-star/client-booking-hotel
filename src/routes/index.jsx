import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import HotelPage from "../pages/HotelPage";
import RoomPage from "../pages/RoomPage";
import BookingPage from "../pages/BookingPage";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../pages/ProfilePage";
import BillPage from "../pages/BillPage";

export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "hotel", element: <HotelPage /> },
      { path: "bill", element: <BillPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "hotel/:hotel_id", element: <RoomPage /> },

      // 🔒 Trang booking yêu cầu đăng nhập
      {
        path: "booking/:hotel_id/:room_id",
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
      },
    ],
  },
];
