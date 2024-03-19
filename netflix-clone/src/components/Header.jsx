//Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <header className="topNav">
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid">
          {/* <a href="/" className="navbar-brand">
            <img
              className="nav__logo"
              src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
              alt=""
            />
          </a> */}
          {/* Implement after adding routes */}
          <Link to="/" className="navbar-brand">
            <img
              className="nav__logo"
              src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
              alt=""
            />
          </Link>
          <div className="navbar">
            <form className="d-flex" role="search">
              <select>
                <option>English</option>
                <option>Hindi</option>
              </select>
              <button className="btn btn-danger" onClick={clickHandler}>
                Sign In
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
