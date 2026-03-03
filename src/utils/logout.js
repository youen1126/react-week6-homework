import axios from "axios";
import { removeCookie } from "../utils/authToken";

export function logout() {
  removeCookie("myToken");
  delete axios.defaults.headers.common.Authorization; // 或設成空字串也行
  //alert("登出成功！");
}
