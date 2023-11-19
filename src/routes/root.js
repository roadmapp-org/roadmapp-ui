import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit,} from "react-router-dom";

export default function Root() {
  return (
    <div>
      <h1>Root</h1>
      <Outlet />
    </div>
  );
}