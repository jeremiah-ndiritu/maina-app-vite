import { useState, useEffect } from "react";

export default function AddOrder() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");

  // Load products from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setPrice(product.price); // default price
    setSearch(""); // clear search after selecting
  };

  async function handleSubmit() {
    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }
    let order = {
      product: selectedProduct.name,
      quantity,
      price,
    };
    let res = await fetch(`${import.meta.env.VITE_API_URL}api/add-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    let data = await res.json();
    if (data.success) {
      alert("Order added!");
      setSelectedProduct(null);
      setQuantity(1);
      setPrice("");
    } else {
      alert(data.error || "Something went wrong");
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add Order</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      {/* Dropdown suggestions */}
      {search && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "150px",
            overflowY: "auto",
            marginBottom: "10px",
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div
                key={p.name + Math.random()}
                onClick={() => handleSelect(p)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {p.image && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}${p.image}`}
                    alt={p.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                )}
                <span>{p.name}</span>
              </div>
            ))
          ) : (
            <div style={{ padding: "5px" }}>No products found</div>
          )}
        </div>
      )}

      {/* Selected product preview */}
      {selectedProduct && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          {selectedProduct.image && (
            <img
              src={`${import.meta.env.VITE_API_URL}${selectedProduct.image}`}
              alt={selectedProduct.name}
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
          )}
          <strong>{selectedProduct.name}</strong>
        </div>
      )}

      {/* Quantity + Price */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          style={{ padding: "5px" }}
        />
      </div>

      <button onClick={handleSubmit}>Add Order</button>
    </div>
  );
}
