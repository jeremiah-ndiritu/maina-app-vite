import { Routes, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import StatsPage from "./pages/StatsPage";
import LoginPage from "./pages/LoginPage";
import { useState, useEffect } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // fetch products initially
  useEffect(() => {
    async function fetchProducts() {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      let data = await res.json();
      if (data.products) setProducts(data.products);
    }
    fetchProducts();
  }, []);
  useEffect(() => {
    async function fetchOrders() {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
      let data = await res.json();
      if (data.orders) setOrders(data.orders);
    }
    fetchOrders();
  }, []);

  return (
    <>
      <MainHeader />
      <Routes>
        <Route
          path="/products"
          element={<ProductsPage products={products} />}
        />
        <Route path="/orders" element={<OrdersPage orders={orders} />} />
        <Route path="/stats" element={<StatsPage orders={orders} />} />
        <Route path="/login" element={<LoginPage type="login" />} />
      </Routes>
    </>
  );
}

export default App;
