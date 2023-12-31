// MainNav.tsx
//Import
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

//Component Navbar
const Navbar = () => {
  //State menu open/close
  const [menuOpen, setMenuOpen] = useState(false);
  //Hook navigation
  const navigate = useNavigate();
  //Open/close menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  //function Log out user
  const logoutUser = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to the login
    navigate("/login");
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar d-flex flex-row-reverse">
        {/* hamburger menu icon with eventhandler */}
        <button
          className="navbar-toggler navbar-dark text-white align-self-end m-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#ToggleNavBar"
          aria-controls="ToggleNavBar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        {/*Navbar with links*/}
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="ToggleNavBar"
        >
          <ul className="navbar-nav">
            <li className="nav-item d-flex justify-content-end">
              <NavLink
                className="nav-link text-white px-4 m-1"
                to="/"
                onClick={toggleMenu}
              >
                Menyer
              </NavLink>
            </li>
          </ul>
          {/**Log out button */}
          <div className="d-flex justify-content-end">
            <button
              className="logout-btn btn btn-outline-light m-2"
              onClick={logoutUser}
            >
              Logga ut
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
