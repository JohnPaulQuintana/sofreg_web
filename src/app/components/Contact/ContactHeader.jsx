import React from 'react';
import { Link } from 'react-router-dom';
const ContactHeader = () => {
  return (
    <header
      className="page-header-cerv bg-img section-padding"
      style={{ backgroundImage: "url('assets/header/contact_us_header.jpg')" }}
      data-overlay-dark="4"
    >
      <div className="container pt-100">
        <div className="text-center">
          <h1 className="fz-100 font-semibold">Contact Us.</h1>
          <div className="mt-15">
            <Link to="/" className='text-xl'>Home</Link>
            <span className="padding-rl-20 text-xl">|</span>
            <span className="main-color text-xl">Contact</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ContactHeader;
