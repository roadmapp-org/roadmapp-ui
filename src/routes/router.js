import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./root";
import { PrivateRoute } from "./private-route";
import { Home } from "../pages/home/home";
import { Login } from "../pages/login/login";
import { NotFound } from "../pages/not-found";
import { Config } from "../pages/config/config";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "login", element: <Login /> },
        { path: "home", element: <PrivateRoute element={<Home />} />},
        { path: "config", element: <PrivateRoute element={<Config />} />},
        { path: '*', element: <NotFound/>},
      ],
    },
  ]);

export default router;