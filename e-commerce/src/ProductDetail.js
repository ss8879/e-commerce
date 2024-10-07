import React, { useState } from "react";
import { useParams } from "react-router-dom";
import categories from "./categories";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const product = categories.find((category) => category.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({ ...product, size: selectedSize, quantity });
    } else {
      alert("Please select a size before adding to cart.");
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>Color: {product.color}</p>
        <p>
          Sizes:
          {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
            <span
              key={size}
              className={`size-circle ${
                size === selectedSize ? "selected" : ""
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </span>
          ))}
        </p>
        <div className="quantity-controls">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <button className="buy-now">Buy Now</button>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
