import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./root";
import { PrivateRoute } from "./private-route";
import { Home } from "../pages/home/home";
import { Login } from "../pages/login/login";
import { NotFound } from "../pages/not-found";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "login", element: <Login /> },
        { path: "home", element: <PrivateRoute element={<Home/>} />},
        { path: '*', element: <NotFound/>},
      ],
    },
  ]);

export default router;