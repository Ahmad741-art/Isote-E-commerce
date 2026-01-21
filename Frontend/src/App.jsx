
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/Product/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account/Account";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProductForm from "./pages/Admin/AdminProductForm";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
            <Route path="/admin/products/new" element={<AdminRoute><AdminProductForm/></AdminRoute>} />
            <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminProductForm edit /></AdminRoute>} />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  );
}

