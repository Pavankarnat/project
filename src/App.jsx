import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import OrderPizza from "./components/pizza/OrderPizza";
import BuildPizza from "./components/build/BuildPizza";
import Cart from "./components/cart/Cart";
import OrderHistory from "./components/orders/OrderHistory";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncUserCart } from "./redux/slices/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.username) {
      dispatch(syncUserCart(user.username));
    } else {
      dispatch(syncUserCart(null));
    }
  }, [user, dispatch]);
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Only accessible after Login/Register */}
          <Route path="/" element={<Hero />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPizza />
              </ProtectedRoute>
            }
          />
          <Route
            path="/build"
            element={
              <ProtectedRoute>
                <BuildPizza />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect to login if unknown path */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
