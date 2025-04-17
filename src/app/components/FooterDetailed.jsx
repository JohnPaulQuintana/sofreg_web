import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const FooterDetailed = () => {
  return (
    <footer className="modern-footer pt-80 desktop:px-40">
      <div className="footer-container">
        <div className="container ontop">
          <div className="row pb-30 bord-thin-bottom">
            <div className="col-lg-5">
              <div className="logo icon-img-250">
                <img src="assets/imgs/logo-light.png" alt="Logo" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="social-media d-flex justify-content-end">
                <ul className="rest d-flex align-items-center fz-14">
                  <li className="hover-this cursor-pointer">
                    <a href="https://www.facebook.com/people/Sofreg-Solutions/61567081641563/" className="hover-anim">
                      <i className="fab fa-facebook-f mr-10"></i> Facebook
                    </a>
                  </li>
                  <li className="hover-this cursor-pointer ml-50">
                    <a href="tel:+639177070531" className="hover-anim">
                    <i className="fab fa-whatsapp mr-10 text-md"></i> Whatsapp
                    </a>
                  </li>
                  <li className="hover-this cursor-pointer ml-50">
                    <a href="https://www.linkedin.com/company/sofreg-solutions/" className="hover-anim">
                      <i className="fab fa-linkedin-in mr-10"></i> LinkedIn
                    </a>
                  </li>
                  <li className="hover-this cursor-pointer ml-50">
                    <a href="mailto:sofreginfo@gmail.com" className="hover-anim">
                    <i className="fa fa-envelope mr-10"></i> Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row pt-80">
            <div className="col-lg-7">
              <div className="call-action">
                <h2 className="d-slideup wow fz-60 fw-600">
                  <span className="sideup-text">
                    <span className="up-text">Have a project in mind?</span>
                  </span>
                  
                </h2>
                <div className="info mt-40 grid grid-cols-1 tablet:grid-cols-2 gap-2 align-items-center">
                    {/* <h1 className='col-span-2 mb-2 text-xl'>Active Email</h1> */}
                    {/* <a href="mailto:shereen@sofregsolutions.com" className="butn butn-md butn-bord-thin mb-2 w-full">
                      <span className="text">shereen@sofregsolutions.com</span>
                    </a>
                  
                    <a href="mailto:brijet@sofregsolutions.com" className="butn butn-md butn-bord-thin mb-2 w-full">
                      <span className="text">brijet@sofregsolutions.com</span>
                    </a> */}
                  
                    <a href="mailto:info@sofregsolutions.com" className="butn butn-md butn-bord-thin w-full">
                      <span className="text">info@sofregsolutions.com</span>
                    </a>
                  
                    <a href="tel:+639177070531" className="butn butn-md butn-bord-thin w-full">
                      <span className="text">+63 917 7070 531</span>
                    </a>

                  {/* <div>
                    <a href="#0" className="butn butn-md butn-bord-thin radius-30 ml-30">
                      <span className="text">+63 917 7070 531</span>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1 bord-left">
              <div className="column">
                <h6 className="sub-title mb-30">Useful Links</h6>
                <div className="row">
                  <div className="col-12">
                    <ul className="rest fz-14">
                      <li className="mb-15">
                        <Link to="/about">About</Link>
                      </li>
                      <li className="mb-15">
                        <Link to="/services">Services</Link>
                      </li>
                      <li className="mb-15">
                        <Link to="/Pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                  
                </div>
              </div>
              
            </div>
          </div>
          {/* <div className="text-center pt-30 pb-30 sub-bg mt-80">
            <p className="fz-14">
              © {new Date().getFullYear()} Sofreg Solutions {" "}
              
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default FooterDetailed