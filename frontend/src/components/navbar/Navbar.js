import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import "./navbar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleClick = () => setClick(!click);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      setIsLoggedIn(false);

      navigate("/login");

      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login"); 

      window.location.reload();
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
        </div>

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
