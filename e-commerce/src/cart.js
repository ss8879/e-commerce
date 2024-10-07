import React from "react";

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  const handleQuantityChange = (itemId, delta) => {
    updateQuantity(itemId, delta);
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleBuy = (itemName) => {
    alert(`${itemName} has been successfully purchased!`);
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p>Size: {item.size}</p>
                <p>Price: ${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>
                <button
                  className="remove-from-cart"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
                <button
                  className="Buy-from-cart"
                  onClick={() => handleBuy(item.name)}
                >
                  Buy
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
