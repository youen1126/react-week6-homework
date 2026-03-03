//路由守衛：通過才會顯示後台
import axios from "axios";
import { useEffect, useState } from "react";
import { RotatingTriangles } from "react-loader-spinner";
import { Navigate } from "react-router";
import useMessage from "@/hooks/useMessage";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useMessage();

  //存token保持登入狀態
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("myToken="))
      ?.split("=")[1];
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }

    async function checkLogin() {
      try {
        const res = await axios.post(`${API_BASE}/api/user/check`);
        showSuccess(`有取得token,成功登入:${res.status}`);
        setIsAuth(true);
      } catch (error) {
        showError(`登入失敗，:${error.response?.data.message}`);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  if (loading) return <RotatingTriangles />;
  if (!isAuth) return <Navigate to="/login" />;

  return children;
}
