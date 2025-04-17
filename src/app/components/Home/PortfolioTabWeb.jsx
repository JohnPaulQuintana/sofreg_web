import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const projects = [
  {
    id: "tab-100",
    category: "Category 1",
    title: "Web Development",
    image: "assets/imgs/web/system_THUMBNAIL.jpg",
    link: "/services?filter=web&source=wb",
  },
  {
    id: "tab-101",
    category: "Category 2",
    title: "System Development",
    image: "assets/imgs/web/wd_1.jpg",
    link: "/services?filter=web&source=software",
  },
 
];

const PortfolioTabWeb = () => {
  const [activeTab, setActiveTab] = useState("tab-100");
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    console.log(showAll)
    setShowAll(true)
  };
  const handleShowLess = () => {
    console.log(showAll)  
    setShowAll(false)
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="portfolio-tab crev section-padding desktop:px-40" data-scroll-index="3">
      <div className="container">
        <div className="sec-head mb-80">
          <h6 className="sub-title main-color mb-25 font-bold text-xl">Our Services</h6>
          <div className="bord pt-25 bord-thin-top d-flex align-items-center">
            <h2 className="fw-600 text-u ls1 text-4xl">
              02 <span className="fw-200 text-4xl">Web Solutions</span>
            </h2>
            <div className="ml-auto">
              <Link to="/services?filter=web" className="go-more">
                <span className="text">View all Services</span>
                <span className="icon ti-arrow-top-right"></span>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Tab images */}
          <div className="col-lg-5 d-flex align-items-center justify-content-center">
            <div className="glry-img">
              {projects.map((project) => (
                <div
                  key={project.id}
                  id={project.id}
                  className={`bg-img tab-img ${activeTab === project.id ? "current" : ""}`}
                  style={{ backgroundImage: `url(${project.image})` }} // Apply the background image
                  onClick={() => handleTabClick(project.id)}
                ></div>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <motion.div
            initial={{ height: projects.length >=5 ? "450px" : '' }}
            animate={{
              height: showAll ? "" : "",
            }}
            transition={{ duration: 0.5 }}
            className="col-lg-6 offset-lg-1 content overflow-y-hidden py-2 flex flex-col justify-center">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`cluom mb-30 ${activeTab === project.id ? "current" : ""}`}
                data-tab={project.id}
              >
                <div className="info">
                  <h6 className="sub-title opacity-7">{project.category}</h6>
                  <h4 className="text-2xl">{project.title}</h4>
                </div>
                <div className="img">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="more-btn more text-u ls1 fz-12">
                  <a href={project.link}>
                    View Project <i className="ml-15 ti-arrow-top-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
          {/* <div className="more-btn more text-u ls1 flex justify-center laptop:justify-end text-xl mt-6">
            {showAll ? (
              <a onClick={handleShowLess} className="text-color-primary-blue cursor-pointer">
                Show Less <i className="ml-15 fa-light fa-arrow-up-long"></i>
              </a>
            ) : (
              <a onClick={handleShowMore} className="text-color-primary-blue cursor-pointer">
                Show More <i className="ml-15 fa-light fa-arrow-down-long"></i>
              </a>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default PortfolioTabWeb;
