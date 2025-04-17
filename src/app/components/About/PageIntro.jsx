import React from "react";

const PageIntro = () => {
  return (
    <section className="page-intro section-padding desktop:px-40">
      <div className="container">
        <div className="flex flex-col gap-12 items-center mb-32">
          <div className="valign">
            <div className="content md-mb50">
              <h6 className="sub-title main-color mb-15 wide:text-xl font-bold">About Company</h6>
              <h3 className="fw-600 mb-3 wide:mb-30 text-4xl wide:text-6xl">
                Our Company <span className="fw-300">Objectives</span> 
              </h3>
              <p className="wide:text-xl">
                At Sofreg Solutions, our objective is to deliver innovative and high-quality creative services that empower businesses to communicate effectively and achieve their goals.
              </p>
              {/* <a href="page-contact.html" className="butn butn-md butn-bord radius-30 mt-40">
                <span>Let's Contact</span>
              </a> */}
            </div>
          </div>

          <div className="">
            <div className="services">
              <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4">
                <div className="mb-2 d-flex">
                  <div className="item-box radius-15 flex-grow-1 d-flex flex-column">
                    <div className="icon mb-3 wide:mb-40 opacity-5">
                      {/* <img src="assets/imgs/serv-icons/3.png" alt="" /> */}
                      <i className="fa fa-layer-group text-white text-7xl"></i>
                    </div>
                    <h5 className="mb-3 wide:mb-15 text-2xl font-bold">Build Seamless Digital Experiences</h5>
                    <p className="wide:text-xl">
                        Create user-friendly websites that drive engagement, enhance usability, and support business growth.
                    </p>
                    {/* <a href="page-services-details.html" className="rmore mt-30">
                      <span className="sub-title">Read More</span>
                      <img
                        src="assets/imgs/arrow-right.png"
                        alt=""
                        className="icon-img-20 ml-5"
                      />
                    </a> */}
                  </div>
                </div>
                <div className="mb-2 d-flex">
                  <div className="item-box radius-15 flex-grow-1 d-flex flex-column">
                    <div className="icon mb-3 wide:mb-40 opacity-5">
                      {/* <img src="assets/imgs/serv-icons/4.png" alt="" /> */}
                      <i className="fa fa-palette text-white text-7xl"></i>
                    </div>
                    <h5 className="mb-3 wide:mb-15 text-2xl font-bold">Enhance Brand Identity</h5>
                    <p className="wide:text-xl">
                        Develop compelling graphic designs that reflect our clients’ values and resonate with their target audiences.
                    </p>
                    {/* <a href="page-services-details.html" className="rmore mt-30">
                      <span className="sub-title">Read More</span>
                      <img
                        src="assets/imgs/arrow-right.png"
                        alt=""
                        className="icon-img-20 ml-5"
                      />
                    </a> */}
                  </div>
                </div>
                <div className="mb-2 d-flex">
                  <div className="item-box radius-15 flex-grow-1 d-flex flex-column">
                    <div className="icon mb-3 wide:mb-40 opacity-5">
                      {/* <img src="assets/imgs/serv-icons/4.png" alt="" /> */}
                      <i className="fa fa-camera text-white text-7xl"></i>
                    </div>
                    <h5 className="mb-3 wide:mb-15 text-2xl font-bold">Produce Engaging Multimedia Content</h5>
                    <p className="wide:text-xl">
                        Craft captivating videos that tell our clients' stories, boost brand awareness, and increase audience interaction.
                    </p>
                    {/* <a href="page-services-details.html" className="rmore mt-30">
                      <span className="sub-title">Read More</span>
                      <img
                        src="assets/imgs/arrow-right.png"
                        alt=""
                        className="icon-img-20 ml-5"
                      />
                    </a> */}
                  </div>
                </div>
                <div className="mb-2 d-flex">
                  <div className="item-box radius-15 flex-grow-1 d-flex flex-column">
                    <div className="icon mb-3 wide:mb-40 opacity-5">
                      {/* <img src="assets/imgs/serv-icons/4.png" alt="" /> */}
                      <i className="fa fa-rocket text-white text-7xl"></i>
                    </div>
                    <h5 className="mb-3 wide:mb-15 text-2xl font-bold">Commit to Continuous Improvement</h5>
                    <p className="wide:text-xl">
                        Stay at the forefront of industry trends and technologies to provide cutting-edge solutions that keep our clients competitive.
                    </p>
                    {/* <a href="page-services-details.html" className="rmore mt-30">
                      <span className="sub-title">Read More</span>
                      <img
                        src="assets/imgs/arrow-right.png"
                        alt=""
                        className="icon-img-20 ml-5"
                      />
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-12 items-center">
          <div className="valign">
            <div className="content md-mb50">
              {/* <h6 className="sub-title main-color mb-15 text-xl font-bold">About Company</h6> */}
              <h3 className="fw-600 mb-3 wide:mb-30 text-5xl wide:text-6xl">
                Our Company <span className="fw-300">Business Strategy</span> 
              </h3>
              <p className="wide:text-xl">
                At Sofreg Solutions, our objective is to deliver innovative and high-quality creative services that empower businesses to communicate effectively and achieve their goals.
              </p>
              {/* <a href="page-contact.html" className="butn butn-md butn-bord radius-30 mt-40">
                <span>Let's Contact</span>
              </a> */}
            </div>
          </div>

          <div className="">
            <div className="services">
              <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4">
                <div className="mb-2 d-flex">
                  <div className="item-box radius-15 ">
                    <div className="icon mb-2 wide:mb-40 opacity-5">
                      {/* <img src="assets/imgs/serv-icons/3.png" alt="" /> */}
                      <i className="fa fa-handshake text-white text-7xl"></i>
                    </div>
                    <h5 className="mb-2 wide:mb-15 text-2xl font-bold">Client-Centric Approach Strategy Plan</h5>
                    <p className="wide:text-xl">
                    Prioritize understanding client needs and objectives to deliver customized solutions that exceed expectations. Establish strong relationships built on trust and transparency.
                    </p>
                    
                  </div>
                </div>
                <div className="mb-2 d-flex">
                  <div className="item-box radius-15">
                    <div className="icon mb-2 wide:mb-40 opacity-5">
                      {/* <img src="assets/imgs/serv-icons/4.png" alt="" /> */}
                      <i className="fa fa-cubes text-white text-7xl"></i>
                    </div>
                    <h5 className="mb-2 wide:mb-15 text-2xl font-bold">Diverse Service Offering Strategy Plan</h5>
                    <p className="wide:text-xl">
                    Provide a comprehensive range of services in graphic design, web development, and video editing, allowing clients to find all their creative needs under one roof.
                    </p>
                    {/* <a href="page-services-details.html" className="rmore mt-30">
                      <span className="sub-title">Read More</span>
                      <img
                        src="assets/imgs/arrow-right.png"
                        alt=""
                        className="icon-img-20 ml-5"
                      />
                    </a> */}
                  </div>
                </div>
                <div className="mb-2 d-flex">
                  <div className="item-box radius-15">
                    <div className="icon mb-2 wide:mb-40 opacity-5">
                      {/* <img src="assets/imgs/serv-icons/4.png" alt="" /> */}
                      <i className="fas fa-chart-bar text-white text-7xl"></i>
                    </div>
                    <h5 className="mb-2 wide:mb-15 text-2xl font-bold">Quality and Innovation Strategy Plan</h5>
                    <p className="wide:text-xl">
                    Commit to excellence by using the latest tools and techniques, ensuring high-quality outputs that stand out in the competitive market. Foster a culture of continuous learning and adaptation to stay ahead of industry trends.
                    </p>
                    {/* <a href="page-services-details.html" className="rmore mt-30">
                      <span className="sub-title">Read More</span>
                      <img
                        src="assets/imgs/arrow-right.png"
                        alt=""
                        className="icon-img-20 ml-5"
                      />
                    </a> */}
                  </div>
                </div>
                <div className="mb-2 d-flex">
                  <div className="item-box radius-15">
                    <div className="icon mb-2 wide:mb-40 opacity-5">
                      {/* <img src="assets/imgs/serv-icons/4.png" alt="" /> */}
                      <i className="fas fa-project-diagram text-white text-7xl"></i>
                    </div>
                    <h5 className="mb-2 wide:mb-15 text-2xl font-bold">Strategic Partnerships Strategy Plan</h5>
                    <p className="wide:text-xl">
                    Collaborate with other businesses and industry influencers to expand our reach, enhance service offerings, and access new markets.
                    </p>
                    {/* <a href="page-services-details.html" className="rmore mt-30">
                      <span className="sub-title">Read More</span>
                      <img
                        src="assets/imgs/arrow-right.png"
                        alt=""
                        className="icon-img-20 ml-5"
                      />
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PageIntro;
