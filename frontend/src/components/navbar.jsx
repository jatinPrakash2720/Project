import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">KAVACH</span>
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/admin" className="navbar-link">
              Admin Panel
            </Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/missions" className="navbar-link">
              Missions
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
