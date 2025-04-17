import React from "react";

const items = [

    { src: "assets/PNG/LOGO_WHITE.png", alt: "AI-Assisted", title: "Graphic Design" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Motion & Animation", title: "Video Production" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Amazon Listings", title: "Web Solutions" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "AI-Assisted", title: "Graphic Design" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Motion & Animation", title: "Video Production" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Amazon Listings", title: "Web Solutions" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "AI-Assisted", title: "Graphic Design" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Motion & Animation", title: "Video Production" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Amazon Listings", title: "Web Solutions" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "AI-Assisted", title: "Graphic Design" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Motion & Animation", title: "Video Production" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Amazon Listings", title: "Web Solutions" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "AI-Assisted", title: "Graphic Design" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Motion & Animation", title: "Video Production" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Amazon Listings", title: "Web Solutions" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "AI-Assisted", title: "Graphic Design" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Motion & Animation", title: "Video Production" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Amazon Listings", title: "Web Solutions" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "AI-Assisted", title: "Graphic Design" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Motion & Animation", title: "Video Production" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Amazon Listings", title: "Web Solutions" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "AI-Assisted", title: "Graphic Design" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Motion & Animation", title: "Video Production" },
    { src: "assets/PNG/LOGO_WHITE.png", alt: "Amazon Listings", title: "Web Solutions" },
    
];

const CareerMarqueeSection = () => {
  return (
    <section className="overflow-hidden">
      {/* Main marquee content */}
      <div className="main-marq lrg o-hidden flex flex-col">
        <div className="slide-har st1 mb-12">
          <div className="box">
            {items.map((item, index) => (
              <div key={index} className="item flex justify-center flex-col gap-2">
                <h4 className="d-flex align-items-center gap-2">
                  <div className="w-[70px] p-2">
                    <img
                      className="object-cover"
                      src={item.src}
                      alt={item.alt}
                    />
                  </div>
                  <span className="tracking-widest">{item.title}</span>
                </h4>
              </div>
            ))}
          </div>
          <div className="box">
            {items.map((item, index) => (
              <div key={index} className="item flex justify-center flex-col gap-2">
                <h4 className="d-flex align-items-center gap-2">
                  <div className="w-[70px] p-2">
                    <img
                      className="object-cover"
                      src={item.src}
                      alt={item.alt}
                    />
                  </div>
                  <span className="tracking-widest">{item.title}</span>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerMarqueeSection;
