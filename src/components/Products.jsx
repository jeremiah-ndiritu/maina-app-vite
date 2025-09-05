export default function Products({ products }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {products.map((product, index) => {
          const discountedPrice =
            product.price && product.discount
              ? product.price - (product.price * product.discount) / 100
              : product.price;

          return (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {product.image && (
                <img
                  src={`${import.meta.env.VITE_API_URL}${product.image}`}
                  alt={product.image}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              )}
              <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
              <p>
                {product.discount ? (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                        marginRight: "5px",
                      }}
                    >
                      ${product.price}
                    </span>
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      ${discountedPrice}
                    </span>
                  </>
                ) : (
                  <span>${product.price}</span>
                )}
              </p>
              {product.discount > 0 && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {product.discount}% OFF
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
