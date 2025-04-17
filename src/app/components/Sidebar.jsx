import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
// import Logo from "../../assets/imgs/logo-light.png"
const Sidebar = () => {

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
        ["Home", "/"],
        ["Services", "/services"],
        ["About", "/about"],
        ["Pricing", "/pricing"],
        ["Contact", "/contact"],
        ["Career", "/career"],
    ];

    // useEffect(() => {
    //     const sidebar = document.querySelector('.hamenu');
    //     if (isOpen) {
    //       sidebar.classList.add("open");
    //       sidebar.style.left = "0";
    //     } else {
    //       sidebar.classList.remove("open");
    //       sidebar.style.left = "-100%";
    //     }
    //   }, [isOpen]);

    return (
        <div className={`hamenu one-scroll`}>
            <div className="logo w-[200px]">
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
                                            <Link to={item[1]} className="link cursor-pointer dmenu" 
                                                >
                                                <span className="fill-text" data-text={item[0]}>
                                                {item[0]}
                                            </span>
                                        </Link>
                                    </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="col-lg-3">
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
                                {/* <a href="#0">+1 840 841 25 69</a> */}
                                <a href="#0">+639177070531</a>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
};

export default Sidebar;
