import { RouterProvider } from "react-router";
import { router } from './router';

import "./assets/style.css";
import './styles/main.scss'; // 入口 Sass

export default function App() {
  return (<>
    <RouterProvider router={router} />
  </>)
};