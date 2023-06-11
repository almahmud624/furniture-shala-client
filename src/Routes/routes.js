import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog/Blog";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import AddProduct from "../Pages/DashBoard/AddProduct/AddProduct";
import AllBuyers from "../Pages/DashBoard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/DashBoard/AllSellers/AllSellers";
import DashBoard from "../Pages/DashBoard/DashBoard/DashBoard";
import DashBoardIndex from "../Pages/DashBoard/DashBoard/DashBoardIndex";
import Payment from "../Pages/DashBoard/DashBoard/Payment/Payment";
import MakeAdmin from "../Pages/DashBoard/MakeAdmin/MakeAdmin";
import MyBuyers from "../Pages/DashBoard/MyBuyers/MyBuyers";
import MyOrders from "../Pages/DashBoard/MyOrders/MyOrders";
import MyProducts from "../Pages/DashBoard/MyProducts/MyProducts";
import MyWishlist from "../Pages/DashBoard/MyWishlist/MyWishlist";
import ReportedItems from "../Pages/DashBoard/ReportedItems/ReportedItems";
import Home from "../Pages/Home/Home";
import LoginSignUp from "../Pages/LoginSignUp/LoginSignUp";
import PrivateAdminRoute from "../Pages/Route/PrivateAdminRoute";
import PrivateRoute from "../Pages/Route/PrivateRoute";
import PrivateSellerRoute from "../Pages/Route/PrivateSellerRoute";
import ErrorPage from "../Pages/Shared/ErrorPage";
import Shop from "../Pages/Shop/Shop";
import SearchProduct from "../Pages/SearchProduct/SearchProduct";
import BecomeASeller from "../Pages/BecomeASeller/BecomeASeller";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/categories/:category",
        element: (
          <PrivateRoute>
            <CategoryProducts />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <LoginSignUp /> },
      { path: "/blog", element: <Blog /> },
      { path: "/shop", element: <Shop /> },
      { path: "/search", element: <SearchProduct /> },
      { path: "/become-seller", element: <BecomeASeller /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashBoardIndex /> },
      {
        path: "/dashboard/all-buyers",
        element: (
          <PrivateAdminRoute>
            <AllBuyers />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/dashboard/all-sellers",
        element: (
          <PrivateAdminRoute>
            <AllSellers />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <PrivateSellerRoute>
            <AddProduct />
          </PrivateSellerRoute>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <PrivateSellerRoute>
            <MyProducts />
          </PrivateSellerRoute>
        ),
      },
      {
        path: "/dashboard/my-buyers",
        element: (
          <PrivateSellerRoute>
            <MyBuyers />
          </PrivateSellerRoute>
        ),
      },
      { path: "/dashboard/my-orders", element: <MyOrders /> },
      { path: "/dashboard/my-wishlist", element: <MyWishlist /> },
      {
        path: "/dashboard/payments/:id",
        loader: ({ params }) =>
          fetch(
            `https://furniture-shala-server.vercel.app/orders/payment/${params.id}`
          ),
        element: <Payment />,
      },
      {
        path: "/dashboard/reported-items",
        element: (
          <PrivateAdminRoute>
            <ReportedItems />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/dashboard/make-admin",
        element: (
          <PrivateAdminRoute>
            <MakeAdmin />
          </PrivateAdminRoute>
        ),
      },
    ],
  },
]);
