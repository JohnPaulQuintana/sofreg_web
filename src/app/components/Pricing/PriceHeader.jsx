import React from "react";

const PriceHeader = () => {
  return (
    <header
      className="page-header-cerv bg-img section-padding"
      // data-background="assets/imgs/header/2.jpg"
      style={{ backgroundImage: 'url(assets/imgs/header/2.jpg)' }}
      data-overlay-dark="4"
    >
      <div className="container pt-100 ontop">
        <div className="text-center">
          <h1 className="fz-100">Service Price.</h1>
          <div className="mt-15">
            <a href="#" className="text-xl">Home</a>
            <span className="padding-rl-20 text-xl">|</span>
            <span className="main-color text-xl">Pricing</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PriceHeader;
