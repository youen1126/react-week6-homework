import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

    navigate("/", { replace: true });
  };

  return (
    <button className="nav-link bg-transparent border-0" onClick={handleLogout}>
      登出
    </button>
  );
}

export default Logout;
