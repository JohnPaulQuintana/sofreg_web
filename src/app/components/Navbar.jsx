import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // console.log(toggleSidebar)
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "About", link: "/about" },
    // { name: "Portfolio", link: "#portfolio" },
    { name: "Pricing", link: "/pricing" },
    { name: "Contact", link: "/contact" },
    { name: "Career", link: "/career" },
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
          // onClick={toggleSidebar}
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
        <div
          className="hidden laptop:block justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            {menuItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className="nav-link"
                  to={item.link}
                  data-scroll-nav={index}
                >
                  <span className="rolling-text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Toggle */}
        <div className="topnav">
          <div className="menu-icon cursor-pointer block laptop:hidden">
            <span className="icon ti-align-right"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
