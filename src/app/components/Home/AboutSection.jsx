import React from 'react';
import { Link } from 'react-router-dom';
const AboutSection = () => {
  return (
    <section className="about desktop:px-40" data-scroll-index="2">
      <div className="container section-padding bord-thin-top">
        <div className="row md-marg">
          <div className="col-lg-6">
            <div className="cont md-mb50">
              <h6 className="sub-title main-color mb-15 font-bold text-xl">Who We Are</h6>
              <h3 className="text-4xl font-bold">
              Empowering Innovation and Success with Sofreg Solution
              </h3>
              <div className="d-flex align-items-end mt-100">
                <div>
                  <Link to="/about" className="d-flex align-items-end">
                    <span className="sub-title nowrap">About Us</span>
                    <span className="fz-70 line-height-45 ti-arrow-top-right"></span>
                  </Link>
                </div>
                <div className="ml-80">
                  <p>
                  At Sofreg Solution, we specialize in delivering innovative designs, cutting-edge development, and strategic solutions that drive success for businesses in a competitive digital landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="img-vid">
              <img src="assets/imgs/GDHEADER.jpg" alt="" />
              <div className="curv-butn main-bg">
                <Link to="/services?filter=graphic" className="vid">
                  <div className="icon">
                    <i className="fas fa-play"></i>
                  </div>
                </Link>
                <div className="shap-left-top">
                  <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
                    <path
                      d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                      fill="#1a1a1a"
                    ></path>
                  </svg>
                </div>
                <div className="shap-right-bottom">
                  <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
                    <path
                      d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                      fill="#1a1a1a"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
