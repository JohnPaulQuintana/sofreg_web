import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Logo from "../../assets/imgs/logo-light.png"
const EmployeeSidebar = ({onMenuClick}) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const logout_url = `${import.meta.env.VITE_API_URL}/logout`;

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
    

    useEffect(() => {
        // Attach menu listeners after component mounts or re-renders
        function attachMenuListeners() {
            // Open menu on clicking the menu icon
            jQuery('.navbar .menu-icon').on('click', function () {
                console.log('clicked');
                jQuery('.hamenu').addClass("open");
                jQuery('.hamenu').animate({ left: 0 });
            });

            // Close menu on clicking the close button or menu items
            jQuery('.hamenu .close-menu, .one-scroll .menu-links .main-menu > li').on('click', function () {
                jQuery('.hamenu').removeClass("open").delay(300).animate({ left: "-100%" });
                jQuery('.hamenu .menu-links .main-menu .dmenu, .hamenu .menu-links .main-menu .sub-dmenu').removeClass("dopen");
                jQuery('.hamenu .menu-links .main-menu .sub-menu, .hamenu .menu-links .main-menu .sub-menu2').slideUp();
            });
        }

        // Call the function to attach listeners
        attachMenuListeners();

        // Clean up the event listeners on component unmount
        return () => {
            jQuery('.navbar .menu-icon').off('click');
            jQuery('.hamenu .close-menu, .one-scroll .menu-links .main-menu > li').off('click');
        };
    }, []); // Empty dependency array ensures it runs only on component mount/unmount


    // const [isOpen, setIsOpen] = useState(false);
    const menuItems = [
        ["Dashboard", "/employee", "dashboard"],
        // ["Clocking", "#"],
        ["Attendance Record", "#", "record"],
        ["Logout", "#"],
    ];

    return (
        <div className={`hamenu one-scroll`}>
            <div className="logo w-[150px]">
                <img className="" src='/assets/imgs/logo-light.png' alt="" />
            </div>
            {/* Step 3: Close button to hide the sidebar */}
            <div className="close-menu cursor-pointer ti-close"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="menu-text">
                            <div className="text">
                                <h2>Menu</h2>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <div className="col-lg-7">
                        <div className="menu-links">
                            <ul className="main-menu rest">
                                {menuItems.map((item, index) => (
                                    <li key={index} data-scroll-nav={index}>
                                        <div className="o-hidden">
                                            {/* <Link to={item[1]} className="link cursor-pointer dmenu"
                                                onClick={item[0] === 'Logout' ? () => toggleConfirmationPopup : undefined}
                                            >
                                                <span className="fill-text text-xl" data-text={item[0]}>
                                                    {item[0]}
                                                </span>
                                            </Link> */}
                                            {item[0] === 'Logout' ? (
                                                <button
                                                type="button"
                                                    className="link cursor-pointer dmenu text-start"
                                                    onClick={toggleConfirmationPopup}
                                                >
                                                    <span className="fill-text text-xl" data-text={item[0]}>
                                                        {item[0]}
                                                    </span>
                                                </button>
                                            ) : (
                                                <Link
                                                onClick={()=>onMenuClick(item[2])}
                                                    to={item[1]}
                                                    className="link cursor-pointer dmenu"
                                                >
                                                    <span className="fill-text text-xl" data-text={item[0]}>
                                                        {item[0]}
                                                    </span>
                                                </Link>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    {/* <div className="col-lg-3">
                        <div className="cont-info">
                            <div className="item mb-50">
                                <h6 className="sub-title mb-15 opacity-7">Address</h6>
                                <h5>
                                    Metro Manila,
                                    <br /> Philippines
                                </h5>
                            </div>
                            <div className="item mb-50">
                                <h6 className="sub-title mb-15 opacity-7">Social Media</h6>
                                <ul className="rest social-text">
                                    {[["Facebook", "https://www.facebook.com/people/Sofreg-Solutions/61567081641563/"], ["WhatsApp", "tel:+639177070531"], ["LinkedIn", "https://www.linkedin.com/company/sofreg-solutions/"], ["Email", "mailto:info@sofregsolutions.com"]].map(
                                        (social, index) => (
                                            <li className="mb-10" key={index}>
                                                <a href={social[1]} className="hover-this">
                                                    <span className="hover-anim">{social[0]}</span>
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="item mb-40">
                                <h6 className="sub-title mb-15 opacity-7">Contact Us</h6>
                                <h5>
                                    <a href="#0">info@sofregsolutions.com</a>
                                </h5>
                                <h5 className="underline mt-10">
                                    <a href="#0">+639177070531</a>
                                </h5>
                            </div>
                        </div>
                    </div> */}
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
        </div >
    );
};

export default EmployeeSidebar;
