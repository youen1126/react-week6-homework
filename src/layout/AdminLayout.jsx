//後台layout

import { Outlet, NavLink } from "react-router";
import Logout from "../components/Logout";

export default function AdminLayout() {
  return (
    <>
      <header
        className="align-items-center text-white"
        style={{
          minHeight: "5vh",
          backgroundColor: "#493c33",
        }}
      >
        <ul className="nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/product">
              後台管理商品列
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/order">
              後台管理訂單列
            </NavLink>
          </li>
        </ul>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
