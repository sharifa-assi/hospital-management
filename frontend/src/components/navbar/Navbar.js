import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import "./navbar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check login status on initial load and whenever the location changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleClick = () => setClick(!click);

  const handleLogout = async () => {
    try {
      // Call the backend logout API to invalidate the token (optional)
      await axios.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove token from localStorage
      localStorage.removeItem("token");
      setIsLoggedIn(false);

      // Manually trigger redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("token");  // Ensure token is removed on error
      setIsLoggedIn(false);
      navigate("/login");  // Redirect to login in case of failure
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact="true" to="/" className="nav-logo">
          Hospital Management<i className="fas fa-code"></i>
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <NavLink
                  exact="true"
                  to="/register"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact="true"
                  to="/login"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="nav-links logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
