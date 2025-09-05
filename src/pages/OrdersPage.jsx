import OrdersList from "../components/OrdersList";
import Orders from "../components/Orders";

export default function OrdersPage() {
  return (
    <div>
      <h2>Orders Page</h2>
      <Orders />
      <OrdersList />
    </div>
  );
}
