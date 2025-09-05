import { useEffect } from "react";
import { useState } from "react";
export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, []);
  return (
    <div>
      <h4>Orders</h4>
      {orders.length === 0 && <p>No orders yet</p>}
      {orders.length > 0 && (
        <table border="1" cellPadding={5} style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, idx) => (
              <tr key={idx}>
                <td>{o.product}</td>
                <td>{o.quantity}</td>
                <td>{o.price}</td>
                <td>{o.total}</td>
                <td>{new Date(o.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
