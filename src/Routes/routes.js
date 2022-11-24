import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog/Blog";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import AddProduct from "../Pages/DashBoard/AddProduct/AddProduct";
import AllBuyers from "../Pages/DashBoard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/DashBoard/AllSellers/AllSellers";
import DashBoard from "../Pages/DashBoard/DashBoard/DashBoard";
import MakeAdmin from "../Pages/DashBoard/MakeAdmin/MakeAdmin";
import MyBuyers from "../Pages/DashBoard/MyBuyers/MyBuyers";
import MyOrders from "../Pages/DashBoard/MyOrders/MyOrders";
import MyProducts from "../Pages/DashBoard/MyProducts/MyProducts";
import ReportedItems from "../Pages/DashBoard/ReportedItems/ReportedItems";
import Home from "../Pages/Home/Home";
import LoginSignUp from "../Pages/LoginSignUp/LoginSignUp";
import ErrorPage from "../Pages/Shared/ErrorPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/categories", element: <CategoryProducts /> },
      { path: "/login", element: <LoginSignUp /> },
      { path: "/blogs", element: <Blog /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      { index: true, element: <AllBuyers /> },
      { path: "/dashboard/all-buyers", element: <AllBuyers /> },
      { path: "/dashboard/all-sellers", element: <AllSellers /> },
      { path: "/dashboard/add-product", element: <AddProduct /> },
      { path: "/dashboard/my-products", element: <MyProducts /> },
      { path: "/dashboard/my-buyers", element: <MyBuyers /> },
      { path: "/dashboard/my-orders", element: <MyOrders /> },
      { path: "/dashboard/reported-items", element: <ReportedItems /> },
      { path: "/dashboard/make-admin", element: <MakeAdmin /> },
    ],
  },
]);
