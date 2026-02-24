import { createHashRouter } from "react-router";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/front/Home";
import Products from "./views/front/Products";
import SingleProduct from "./views/front/SingleProduct";
import Cart from "./views/front/Cart";
import Checkout from "./views/front/Checkout";
import Login from "./views/Login";
import Back from "./views/Back";
import NotFound from "./views/front/NotFound";

export const router = createHashRouter([
    {
        path: '/',
        element: <FrontendLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/product',
                element: <Products />
            },
            {
                path: '/product/:id',
                element: <SingleProduct />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: "/back",
                element: <Back />,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    },
]);