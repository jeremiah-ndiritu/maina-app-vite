import AddProduct from "../components/AddProduct";
import Products from "../components/Products";
export default function ProductsPage({ products }) {
  return (
    <div>
      <h2>Products Page</h2>
      <AddProduct />
      <Products products={products} />
    </div>
  );
}
