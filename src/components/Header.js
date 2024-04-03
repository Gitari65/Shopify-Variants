import React from 'react';
import shopify_logo from '../Assets/images/shopify_logo.png';


function Header() {
  return (
    <header className="top-header">
      <div className="logo">
        <img  src={shopify_logo} alt="Logo" />
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
