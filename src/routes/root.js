import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit,} from "react-router-dom";
import { NavBar } from "../nav-bar";

export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}