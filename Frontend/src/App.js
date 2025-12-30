import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage/ProductPage';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/components/Checkout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Account from './pages/Account/Account';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;