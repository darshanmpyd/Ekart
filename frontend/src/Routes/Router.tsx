import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Main from "../Pages/Main/Main";
import Cart from "../Pages/Cart/Cart";
import Orders from "../Pages/Orders/Orders";
import Products from "../Pages/Products/Products";
import ProductFullDetails from "../Pages/Products/ProductFullDetails";
import ProtectedRoute from "../Component/ProtectedRoute";
import { useSelector } from "react-redux";
import { getisLoggedIn } from "../Reducer/Login/LoginSlice";

const Router = () => {
  const isLoggedIn = useSelector(getisLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <ProtectedRoute isAuthenticated={isLoggedIn}>
            <Main />
          </ProtectedRoute>
        }
      >
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/full" element={<ProductFullDetails />} />
      </Route>
    </Routes>
  );
};

export default Router;
