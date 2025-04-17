import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const projects = [
  {
    id: "tab-1",
    category: "Category 1",
    title: "Amazon Listings",
    image: "assets/imgs/amazon_listings/Headphones_1.jpg",
    link: "/services?filter=graphic&source=amazon",
  },
  {
    id: "tab-2",
    category: "Category 2",
    title: "UI/UX Design",
    image: "assets/imgs/ui_ux/UI_F1.jpg",
    link: "/services?filter=graphic&source=ui_ux",
  },
  {
    id: "tab-3",
    category: "Category 3",
    title: "Social Media Ads",
    image: "assets/imgs/social_media/Ramen_1.jpg",
    link: "/services?filter=graphic&source=social_media",
  },
  {
    id: "tab-4",
    category: "Category 4",
    title: "Branding & Visual Identity",
    image: "assets/imgs/motion/Delta_1.jpg",
    link: "/services?filter=graphic&source=branding",
  },
  {
    id: "tab-5",
    category: "Category 5",
    title: "Motion & Animation",
    image: "assets/imgs/branding/BRANDING_H_1.jpg",
    link: "/services?filter=graphic&source=motion",
  },
  {
    id: "tab-6",
    category: "Category 6",
    title: "Packaging Design",
    image: "assets/imgs/packaging/AVENUE_1.jpg",
    link: "/services?filter=graphic&source=packaging",
  },
  {
    id: "tab-7",
    category: "Category 7",
    title: "Print Design",
    image: "assets/imgs/print/Events_1.jpg",
    link: "/services?filter=graphic&source=printing",
  },
  {
    id: "tab-8",
    category: "Category 8",
    title: "AI-Assisted Design",
    image: "assets/imgs/ai/aie_1.jpg",
    link: "/services?filter=graphic&source=ai",
  },
  {
    id: "tab-9",
    category: "Category 9",
    title: "Sticker Wrap",
    image: "assets/imgs/sticker/StickerWrap_Thumbnail.jpg",
    link: "/services?filter=graphic&source=sticker",
  },
];

const PortfolioTabGraphics = () => {
  const [activeTab, setActiveTab] = useState("tab-1");
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
              01 <span className="fw-200 text-4xl">Graphic Design</span>
            </h2>
            <div className="ml-auto">
              <Link to="/services?filter=graphic" className="go-more">
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
            initial={{ height: "450px" }}
            animate={{
              height: showAll ? "" : "450px",
            }}
            transition={{ duration: 0.5 }}
            className="col-lg-6 offset-lg-1 content overflow-y-hidden py-2">
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
                  <Link to={project.link}>
                    View Project <i className="ml-15 ti-arrow-top-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
          <div className="more-btn more text-u ls1 flex justify-center laptop:justify-end text-xl mt-6">
            {showAll ? (
              <a onClick={handleShowLess} className="text-color-primary-blue cursor-pointer">
                Show Less <i className="ml-15 fa-light fa-arrow-up-long"></i>
              </a>
            ) : (
              <a onClick={handleShowMore} className="text-color-primary-blue cursor-pointer">
                Show More <i className="ml-15 fa-light fa-arrow-down-long"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioTabGraphics;
