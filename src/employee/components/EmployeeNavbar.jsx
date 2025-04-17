import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const EmployeeNavbar = ({onMenuClick}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logout_url = `${import.meta.env.VITE_API_URL}/logout`;
  const navigate = useNavigate();

  // confirmation function
  const toggleConfirmationPopup = () => {
    setShowLogoutModal(true);
  }
  const toggleConfirmationPopupClose = () => {
    setShowLogoutModal(false);
  }

  const logout = async () => {
    const data = JSON.parse(localStorage.getItem("authentication")) || {};
    console.log(data.token); // Check if this logs

    if (!data.token) {
      console.log("No token found!");
      return;
    }

    try {
      const response = await axios.post(
        logout_url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      console.log("API response:", response.data);

      if (response.status === 200) {
        localStorage.removeItem("authentication"); // Clear frontend token
        window.location.reload(true); // Redirect to login page
      }
    } catch (error) {
      console.error("Error logging out:", error.response ? error.response.data : error.message);
    }
  };

  const menuItems = [
    { name: "Dashboard", link: "/employee", title:'dashboard' },
    { name: "Attendance Record", link: "#", title:'record' },
  ];

  return (
    <nav className="navbar navbar-expand-lg nav-crev">
      <div className="container">
        {/* Logo */}
        <Link className="logo w-[150px] desktop:w-[150px]" to="/">
          <img src="/assets/imgs/logo-light.png" alt="logo" />
        </Link>

        {/* Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar">
            <i className="fas fa-bars"></i>
          </span>
        </button>

        {/* Navbar Links */}
        <div className="hidden laptop:block justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {menuItems.map((item, index) => (
              <li className="nav-item" key={index} onClick={() => onMenuClick(item.title)}>
                <Link className="nav-link" to={item.link} data-scroll-nav={index}>
                  <span className="rolling-text">{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <button
                onClick={toggleConfirmationPopup}
                className="nav-link cursor-pointer text-red-500"
              >
                <span className="rolling-text">Logout</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Sidebar Toggle */}
        <div className="topnav">
          <div className="menu-icon cursor-pointer block laptop:hidden">
            <span className="icon ti-align-right"></span>
          </div>
        </div>

        {/* confirmation popup */}
        {showLogoutModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-color-dark">Confirm Logout</h2>
            <p className="text-color-gray">Are you sure you want to log out?</p>
            {/* <div className="border p-2">
              <span className="text-color-dark">Reminder: </span>
            </div> */}
            <div className="flex justify-center mt-4">
              <button
                onClick={toggleConfirmationPopupClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
