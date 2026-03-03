// useMessage
// 封裝訊息通知行為（呼叫 createAsyncMessage）

import { useDispatch } from "react-redux";
import { createAsyncMessage } from "@/slice/messageSlice";

export default function useMessage() {
  const dispatch = useDispatch();

  const showSuccess = (message) => {
    dispatch(
      createAsyncMessage({
        success: true,
        message,
      }),
    );
  };

  const showError = (message) => {
    dispatch(
      createAsyncMessage({
        success: false,
        message,
      }),
    );
  };

  return {
    showSuccess,
    showError,
  };
}
