export default function Stats({ orders }) {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  // most ordered product
  const productCount = {};
  orders.forEach((o) => {
    productCount[o.product] = (productCount[o.product] || 0) + o.quantity;
  });
  const topProduct = Object.entries(productCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Business Stats</h2>
      <p>Total Orders: {totalOrders}</p>
      <p>Total Revenue: ${totalRevenue}</p>
      {topProduct && (
        <p>
          Most Ordered: {topProduct[0]} ({topProduct[1]} units)
        </p>
      )}
    </div>
  );
}
