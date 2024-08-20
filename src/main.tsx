import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Header from "./ui/Header.tsx";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/Profile.tsx";
import Favorite from "./pages/Favorite.tsx";
import Cart from "./pages/Cart.tsx";
const RouterLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "profile", element: <Profile /> },
      { path: "/favorite", element: <Favorite /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
