import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Isotope from "isotope-layout";
import { categories } from "../../data/categories";
import BouncingText from "./BouncingText";
import { LazyLoadImage } from "react-lazy-load-image-component";

const WorkSection = ({ openModal }) => {
  const [loadingImages, setLoadingImages] = useState({}); // Track loading state for each image

  const galleryRef = useRef(null); // Ref for the gallery container
  const [isotopeInstance, setIsotopeInstance] = useState(null); // Store the Isotope instance
  const [activeFilter, setActiveFilter] = useState({ category: "*", subcategory: "*" }); // Track active filter
  const location = useLocation(); // Access URL location

  useEffect(() => {
    if (galleryRef.current && !isotopeInstance) {
      // Initialize Isotope only if the galleryRef is ready
      const instance = new Isotope(galleryRef.current, {
        itemSelector: ".items", // Class for items in the gallery
        layoutMode: "fitRows", // Use the fitRows layout mode
        percentPosition: true, // Ensures that items are correctly positioned relative to their parent
      });

      setIsotopeInstance(instance);
      return () => {
        if (isotopeInstance) {
          isotopeInstance.destroy();
        }
      };
    }
  }, [galleryRef, isotopeInstance]);

  const handleImageLoad = (id) => {
    // Mark the specific image as loaded
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
    // Trigger Isotope layout recalculation
    if (isotopeInstance) {
      isotopeInstance.arrange();
      isotopeInstance.layout();
    }
  };

  useEffect(() => {
    if (isotopeInstance) {
      let filter = "*"; // Default to show all items

      if (activeFilter.category !== "*" && activeFilter.subcategory === "*") {
        filter = `.${activeFilter.category}`;
      } else if (activeFilter.category !== "*" && activeFilter.subcategory !== "*") {
        filter = `.${activeFilter.category}.${activeFilter.subcategory}`;
      }

      isotopeInstance.arrange({ filter });
    }
  }, [activeFilter, isotopeInstance]);

  const handleFilterClick = (filterValue, subValue) => {
    setActiveFilter({ category: filterValue, subcategory: subValue });
  };

  // Recalculate Isotope layout when `loadingImages` state changes
  useEffect(() => {
    if (isotopeInstance) {
      isotopeInstance.arrange();
      isotopeInstance.layout();
    }
  }, [loadingImages, isotopeInstance]);

  return (
    <section className="work-stand section-padding sub-bg desktop:px-40">
      <div className="container-xxl">
        <div className="row">
          {/* filter links */}
          <div className="filtering col-12 mb-50 text-center">
            <div className="filter mb-4">
              <span className="text">Filter By :</span>
              <span
                data-filter="*"
                className={activeFilter.category === "*" ? "active" : ""}
                onClick={() => handleFilterClick("*", "*")}
              >
                Show All
              </span>
              <span
                data-filter=".graphic"
                className={activeFilter.category === "graphic" ? "active" : ""}
                onClick={() => handleFilterClick("graphic", "*")}
              >
                Graphic Design
              </span>
              <span
                data-filter=".web"
                className={activeFilter.category === "web" ? "active" : ""}
                onClick={() => handleFilterClick("web", "*")}
              >
                Web Solutions
              </span>
              <span
                data-filter=".video"
                className={activeFilter.category === "video" ? "active" : ""}
                onClick={() => handleFilterClick("video", "*")}
              >
                Video Production
              </span>
            </div>
          </div>
        </div>

        

        <div className={`gallery row stand-marg`} ref={galleryRef}>
          {categories.map((item) => (
            <div
              key={item.id}
              className={`col-lg-4 col-md-6 transition-transform transform scale-100 hover:scale-110 duration-300 items ${item.category} ${item.sub}`}
            >
              <div className="item mb-40">

                {/* Show loader while the image is loading */}
                {loadingImages[item.id] && (
                     <div
                     className="skeleton flex items-center justify-center bg-gray-200 animate-pulse"
                   >
                     <BouncingText text="Loading..." />
                   </div>
                  )}

                {/* Image */}
                <a onClick={() => openModal(item.imgSrc[1], item.type)} className="img">

                  <LazyLoadImage
                    src={item.imgSrc[0]}
                    alt={item.title}
                    loading="lazy"
                    onLoad={() => handleImageLoad(item.id)} // Trigger layout recalculation on load
                    beforeLoad={() => setLoadingImages((prev) => ({ ...prev, [item.id]: true }))} // Before image load, show loader
                  />
                </a>
                <div className="cont mt-2">
                  <h5 className="fz-12 text-center">
                    Tags: <span className="text-xs">{item.title} | {item.categoryLabel}</span>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
