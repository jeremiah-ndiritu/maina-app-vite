import AddOrder from "./AddOrder";
import OrdersList from "./OrdersList";

export default function Orders() {
  return (
    <div>
      <h2>Orders managemenet</h2>
      <AddOrder />
      <OrdersList />
    </div>
  );
}
