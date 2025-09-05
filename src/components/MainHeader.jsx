import React from "react";
import { Link } from "react-router-dom";
import "./styles/MainHeader.css";

export default function MainHeader() {
  return (
    <header className="main-header">
      <nav>
        <ul className="header-links">
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/stats">Stats</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
