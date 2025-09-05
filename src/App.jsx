import { useEffect, useState } from "react";
// import axios from "axios";
import "./App.css";

import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import Orders from "./components/Orders";
import Stats from "./components/Stats";

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
      <h1 className="heading">Maina vite app</h1>
      <AddProduct setProducts={setProducts} />
      <Products products={products} />
      <Orders orders={orders} />
      <Stats orders={orders} />
    </>
  );
}

export default App;
