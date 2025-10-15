import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

import HotelPage from "../pages/HotelPage";
import RoomPage from "../pages/RoomPage";
import BookingPage from "../pages/BookingPage";

import PrivateRoute from "./PrivateRoute";

export default [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },

      // pages list not login
      { path: "hotel", element: <HotelPage /> },
      { path: "hotel/:hotel_id", element: <RoomPage /> },

      // pages list  login
      // {
      //   path: "hotel/:id/room",
      //   element: (
      //     <PrivateRoute>
      //       <RoomList />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "hotel/:hotel_id/:room_id",
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
      },
    ],
  },
];
