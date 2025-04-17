import React from 'react';
import { Link } from 'react-router-dom';
const CareerHeader = () => {
  return (
    <header
      className="page-header-cerv bg-img section-padding"
      style={{ backgroundImage: "url('assets/header/career_header.jpg')" }}
      data-overlay-dark="4"
    >
      <div className="container pt-100">
        <div className="text-center">
          <h1 className="fz-100 font-semibold">Careers.</h1>
          <div className="mt-15">
            <Link to="/" className='text-xl'>Home</Link>
            <span className="padding-rl-20 text-xl">|</span>
            <span className="main-color text-xl">Careers</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CareerHeader;
