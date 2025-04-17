import React from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
const Sidebar = ({onSectionClick}) => {
    const location = useLocation();  // Get the current location (path)
    const currentPath = location.pathname;  // Get the current route path
    const logout_url = `${import.meta.env.VITE_API_URL}/logout`;
  
    const navItems = [
      { id: "dashboard", section:"dashboard", label: "Dashboard", icon: "fas fa-home", url: "#" },
      { id: "account", section:"account", label: "Employee", icon: "fas fa-user", url: "#" },
      { id: "attendance", section:"attendance", label: "Attendance", icon: "fas fa-clock", url: "#" },
      { id: "jobs", section:"jobs", label: "Job Posting", icon: "fas fa-file-alt", url: "#" },
    ];
  
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
  
    return (
      <div className="bg-gray-800 text-white h-screen p-4 transition-all duration-300 w-16 tablet:w-64 flex flex-col items-center tablet:items-start">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center justify-center w-full">
          <img src="/assets/PNG/LOGO_WHITE.png" className="w-full tablet:w-16" alt="Logo" />
          {/* <span>Sofreg Solutions</span> */}
        </div>
  
        {/* Menu Items */}
        <nav className="space-y-4 w-full h-screen relative">
          <div className="w-full border-b-2 border-slate-700 mb-4">
            <span className="text-slate-500 hidden tablet:inline-block">Menu</span>
          </div>
  
          {/* Render Navigation Items */}
          {navItems.map((item) => (
            <div
              onClick={() => {
                console.log("Clicked", item.section);
                localStorage.setItem('active-session',item.section)
                onSectionClick(item.section)}}
              // to={item.url}
              key={item.id}
              className={`flex items-center gap-2 space-x-3 cursor-pointer hover:text-white`}
            >
              <i className={`${item.icon} text-2xl tablet:text-xl`}></i>
              <span className="ps-2 text-xl hidden tablet:inline-block">{item.label}</span>
            </div>
          ))}
  
          {/* Logout Button */}
          <button
            onClick={logout}
            className="absolute bottom-0 flex items-center gap-2 space-x-3 tablet:space-x-0 tablet:block text-red-400 cursor-pointer hover:text-red-500"
          >
            <i className="fas fa-sign-out-alt text-2xl tablet:text-xl"></i>
            <span className="ps-2 text-xl hidden tablet:inline-block">Logout</span>
          </button>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
