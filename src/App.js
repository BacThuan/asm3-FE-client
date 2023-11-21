import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout/Layout";
import Error from "./component/error/Error";
import HomePage from "./page/home/HomePage";
import ShopPage from "./page/shop-page/ShopPage";
import DetailPage from "./page/detail-page/DetailPage";
import AuthForm from "./page/Auth/AuthForm";
import Cart from "./page/cart/Cart";
import Checkout from "./page/checkout/Checkout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import History from "./page/history/History";
import DetailOrder from "./page/detail-order/DetailOrder";
import axios from "axios";
import { api } from "./api/api";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "err", element: <Error /> },
      {
        path: "shop",
        children: [
          { index: true, element: <ShopPage /> },
          { path: ":idProduct", element: <DetailPage /> },
        ],
      },
      { path: "auth", element: <AuthForm /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      {
        path: "history",
        children: [
          { index: true, element: <History /> },
          { path: ":idOrder", element: <DetailOrder /> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(api + "/checkSession", { withCredentials: true })
      .then(() => {
        dispatch({ type: "STILL_LOGIN" });
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT" });
      });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
