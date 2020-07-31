import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/index";
import "./Navbar.css";

const Navbar = () => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        const { isLoggedIn, handleLogout } = context;

        return (
          <nav className="navbar">
            <div>
              {isLoggedIn ? (
                <div>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navbar;
