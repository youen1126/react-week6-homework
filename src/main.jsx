import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



// 載入 bootstrap 的 css 與 js
//import './assets/all.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import './styles/main.scss'; // 入口 Sass

import App from './App.jsx';
import Daily from './weekWork/DailyP.jsx';
//import Week4 from './weekWork/Week4.jsx';


createRoot(document.getElementById('root')).render(
  //嚴謹模式<StrictMode>
  <App />

)
