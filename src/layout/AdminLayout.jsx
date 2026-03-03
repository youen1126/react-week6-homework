//後台layout

import { Outlet, NavLink } from "react-router";
import { useNavigate } from "react-router";
import { logout } from "../utils/logout";
import useMessage from "@/hooks/useMessage";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { showSuccess } = useMessage();
  const handleLogout = () => {
    logout();
    showSuccess("登出成功！");
    navigate("/", { replace: true });
  };
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
          <li className="nav-item">
            <button
              type="button"
              className="nav-link bg-transparent border-0"
              onClick={handleLogout}
            >
              登出
            </button>
          </li>
        </ul>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
