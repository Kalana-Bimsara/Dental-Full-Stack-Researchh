// React import not required with the new JSX runtime
import { Link } from "react-router";
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavbarComponent = () => {


  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("token")
  );

  const navigate = useNavigate();


  useEffect(() => {
    // In case you ever use multiple tabs
    const handleStorage = (e) => {
      if (e.key === "token") {
        setIsLoggedIn(!!e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);


  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark-navy shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src="Icon.png"
              alt="Logo"
              className="navbar-brand img me-2 align-items-left"
            />
          </a>
          <button
            className="navbar-toggler bg-custom-blue"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white" style={{ fontSize: "1.2rem" }} >Home</Link>
              </li>
              <li className="nav-item">
                <HashLink
                  className="nav-link text-white"
                  to="/#about"
                  style={{ fontSize: "1.2rem" }}
                >
                  About Us
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink
                  className="nav-link text-white"
                  to="/#services"
                  style={{ fontSize: "1.2rem" }}
                >
                  Services
                </HashLink>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/prices"
                  style={{ fontSize: "1.2rem" }}
                >
                  Prices
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/ourteam"
                  style={{ fontSize: "1.2rem" }}
                >
                  Our Team
                </Link>
              </li>
              <li className="nav-item">
                <HashLink
                  className="nav-link text-white"
                  to="/#contact"
                  style={{ fontSize: "1.2rem" }}
                >
                  Contact
                </HashLink>
              </li>
            </ul>
            {/* Book Now Button */}
            <Link to="/booking" className="btn btn-primary btn-lg ms-3" >Book Now</Link>
            {/* <Link to="/login" className="btn btn-success btn-lg ms-3" >Log In</Link> */}
            {/* Show Log In only when NOT logged in */}
            {!isLoggedIn && (
              <Link to="/login" className="btn btn-success btn-lg ms-3">
                Log In
              </Link>
            )}

            {/* Show Logout only when logged in */}
            {isLoggedIn && (
              <button
                className="btn btn-outline-light btn-lg ms-3"
                onClick={handleLogout}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavbarComponent;
