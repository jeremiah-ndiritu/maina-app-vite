import { useState } from "react";

export default function AddProduct({ setProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  async function handleAddProduct() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount", discount);
    if (file) formData.append("image", file);

    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/add-product`, {
      method: "POST",
      body: formData,
    });

    let data = await res.json();
    if (data.success) {
      setProducts((prev) => [...prev, data.product]);
      alert("Product added!");
      // reset
      setName("");
      setPrice("");
      setDiscount("");
      setFile(null);
      setPreview(null);
    } else {
      alert(data.error);
    }
  }

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  }

  // calculate discounted price
  const discountedPrice =
    price && discount ? price - (price * discount) / 100 : price;

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Add Product</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button onClick={handleAddProduct} type="button">
          Add Product
        </button>
      </div>

      {/* Live preview card */}
      {(name || price || preview) && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "150px",
                height: "auto",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            />
          )}
          <h3>{name || "Product Name"}</h3>
          <p>
            Price:{" "}
            {discount ? (
              <>
                <span style={{ textDecoration: "line-through", color: "gray" }}>
                  Ksh {price}
                </span>{" "}
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Ksh {discountedPrice}
                </span>
              </>
            ) : (
              <span>Ksh {price || "0"}</span>
            )}
          </p>
          {discount && <p>Discount: {discount}%</p>}
        </div>
      )}
    </div>
  );
}
