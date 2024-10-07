import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import categories from "./categories";
import ProductDetail from "./ProductDetail";
import Cart from "./cart";
import "./App.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

const Card = ({ id, name, color, img }) => (
  <Link to={`/product/${id}`} className="card">
    <img src={img} alt={name} className="card-image" />
    <div className="card-info">
      <h2 className="card-title">{name}</h2>
      <p className="card-color" style={{ color: color }}>
        {color}
      </p>
    </div>
  </Link>
);

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      updateQuantity(item.id, 1);
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: 1 }, // Initialize quantity for new item
      ]);
    }
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + delta;
          return {
            ...item,
            quantity: newQuantity < 1 ? 1 : newQuantity, // Prevent quantity from going below 1
          };
        }
        return item;
      });
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || category.name === selectedCategory)
  );

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setDropdownVisible(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="logo">
            <h1>ShopEasy</h1>
          </div>
          <nav className="nav">
            <Link
              to="/"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
            >
              Home
            </Link>
            <div
              className="dropdown"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <a href="#">Categories</a>
              {isDropdownVisible && (
                <div className="dropdown-content">
                  {["Shoes", "Clothes", "Cricket Bat"].map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      onClick={() => handleCategoryClick(cat)}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
            </div>
            <Link to="/cart" className="right-icons">
              <FaShoppingCart /> My Cart ({cartItems.length})
            </Link>
            <a href="#" className="right-icons">
              <FaUser /> Account
            </a>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="card-container">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <Card
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      color={category.color}
                      img={category.img}
                    />
                  ))
                ) : (
                  <p>No categories found.</p>
                )}
              </div>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>

        <footer className="footer">
          <p>© 2024 ShopEasy. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
