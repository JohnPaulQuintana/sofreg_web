import React from "react";

const Footer = () => {
  return (
    <footer className="min-footer sub-bg pt-30 pb-30">
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-lg-4 col-md-6 md-mb15">
            <div className="logo icon-img-250">
              <img src="assets/imgs/logo-light.png" alt="Logo" />
            </div>
          </div>

          {/* Center Text */}
          <div className="col-lg-4 order-md-3">
            <div className="text-center">
              <p className="fz-14 footer-text">
                © {new Date().getFullYear()} Sofreg Solutions {" "}
                <span className="underline main-color">
                  {/* <a
                    href="https://themeforest.net/user/ui-themez"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    UI-ThemeZ
                  </a> */}
                </span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-lg-4 col-md-6 order-md-2 md-mb15">
            <div className="links d-flex justify-content-end">
              <ul className="rest d-flex align-items-center">
                <li>
                  <a href="#" className="text-xl">FAQ</a>
                </li>
                <li className="ml-30">
                  <a href="#" className="text-xl">Careers</a>
                </li>
                <li className="ml-30">
                  <a href="#" className="text-xl">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
