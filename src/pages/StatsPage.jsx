import Stats from "../components/Stats";
export default function StatsPage({ orders }) {
  return (
    <div>
      <h2>StatsPage</h2>
      <Stats orders={orders} />
    </div>
  );
}
