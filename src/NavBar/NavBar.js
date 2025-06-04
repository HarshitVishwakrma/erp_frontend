import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
// import CropFreeIcon from "@mui/icons-material/CropFree";
// import BedtimeIcon from "@mui/icons-material/Bedtime";
// import GridViewIcon from "@mui/icons-material/GridView";
import SettingsIcon from "@mui/icons-material/Settings";
// import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
// import us from "../assets/us.jpg";
import user from "../assets/user-1.jpg";

const NavBar = ({ toggleSideNav }) => {
  const navigate = useNavigate();

  // Fetch username and year from localStorage
  const username = localStorage.getItem("username");
  const year = localStorage.getItem("year");

  // Function for logout
  const handleLogout = () => {
    // Clear the stored data and redirect to login
    localStorage.removeItem("username");
    localStorage.removeItem("year");
    localStorage.removeItem("permissions");
    navigate("/"); // Redirect to login page
  };

  // State for controlling dropdown visibility
  // const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  // const [megaDropdownOpen, setMegaDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const toggleDropdown = (dropdownSetter) => {
    dropdownSetter((prev) => !prev);
  };


  useEffect(() => {
    // Bootstrap's JavaScript initialization (optional, only if Bootstrap JS is used)
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <button className="navbar-toggle" onClick={toggleSideNav}>
            ☰
          </button>
          <h6 className="navbar-logo">Produlink</h6>
        </div>

        <div className="navbar-menu">
          {/* Create New Dropdown */}
          

          {/* Mega Menu Dropdown */}
          
        </div>

        <div className="navbar-actions">
          <input
            className="navbar-search"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
  
          <img className="navbar-user" src={user} alt="user" />
          
          {/* Display the username and year */}
         
          <label>{year}</label>

          {/* Admin Dropdown */}
          <div className="navbar-dropdown">
            <button
              className="navbar-button dropdown-toggle"
              type="button"
              onClick={() => toggleDropdown(setAdminDropdownOpen)}
            >
              <label>{username}</label>
            </button>
            {adminDropdownOpen && (
              <ul className="navbar-dropdown-menu">
                <li>
                  <Link className="navbar-dropdown-item" to="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="navbar-dropdown-item" to="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <button
                    className="navbar-dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>

          <SettingsIcon className="navbar-icon" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;