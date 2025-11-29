
import { Link, useNavigate } from "react-router-dom";
import { BsHouse, BsCalendarCheck, BsListUl, BsBoxArrowRight } from "react-icons/bs";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear whatever you stored on login
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
    // or sessionStorage.clear(); if you want everything gone

    // Redirect to login (or "/")
    navigate("/login");
  };

  return (
    <div className="sidebar p-3 bg-dark-navy">
      <h4 className="text-center">Admin Dashboard</h4>

      <Link to="#" className="d-block">
        <BsHouse /> Dashboard
      </Link>

      <Link to="#Appointments" className="d-block">
        <BsCalendarCheck /> Appointment
      </Link>

      <Link to="#price-list" className="d-block">
        <BsListUl /> Price List
      </Link>

      {/* Logout as a clickable action */}
      <button
        type="button"
        className="d-block btn btn-link text-start p-0 mt-2"
        onClick={handleLogout}
      >
        <BsBoxArrowRight /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
