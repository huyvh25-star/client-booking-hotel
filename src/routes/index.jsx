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
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "hotel", element: <HotelPage /> },
      { path: "bill", element: <BillPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "hotel/:hotel_id", element: <RoomPage /> },
      { path: "booking/:hotel_id/:room_id", element: <BookingPage /> },
    ],
  },
];
