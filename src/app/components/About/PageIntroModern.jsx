import React from "react";

const PageIntroModern = ({onOpenForm}) => {
  return (
    <section className="page-intro-modern section-padding desktop:px-40 pt-0 bg-inherit">
      <div className="container">
        <div className="flex p-0">
          <div className="">
            <div className="flex flex-col gap-4 desktop:flex-row">
              <div className="valign w-full desktop:w-[35%]">
                <div className="mb-2 wide:mb-12">
                  {/* <img src="assets/imgs/intro/01.jpg" alt="" /> */}
                  <h1 className="text-2xl wide:text-4xl font-bold mb-2 text-color-primary-blue">Our Mission</h1>
                  <p className="wide:text-xl">Our mission is to design and deliver innovative, eco-friendly products that not only meet the evolving needs of our customers but also promote a healthier planet. We are dedicated to fostering a culture of continuous improvement, where creativity and collaboration drive our success. We prioritize ethical practices and social responsibility, ensuring that every product we create supports our commitment to sustainability and community well-being. Through partnerships and engagement, we strive to make a positive impact. Your success is our MISSION</p>
                </div>
              </div>
              <div className="w-full desktop:w-[30%]">
                <div className="img2 w-full h-full fit-img position-re relative">
                  <img
                    src="assets/imgs/map.png"
                    alt=""
                    data-speed="0.2"
                    data-lag="0"
                    className="object-contain h-full w-full"
                  />
                  <div className="absolute inset-0 z-10 flex justify-center" data-speed="0.2"
                    data-lag="0">

                    <button type="button" className="" onClick={onOpenForm}>
                        <a className="border p-2 text-xl wide:text-4xl">Design a Quote <i className="fa-solid fa-arrow-up-right"></i></a>
                        
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full desktop:w-[35%]">
                <div className="w-full">
                    <div className="mb-2 wide:mb-12">
                    {/* <img src="assets/imgs/intro/01.jpg" alt="" /> */}
                    <h1 className="text-2xl wide:text-4xl font-bold mb-2 text-color-primary-blue">Our Vision</h1>
                    <p className="wide:text-xl">
                        To be a global leader in sustainable innovation, transforming the way communities interact with technology. We envision a future where our cutting-edge solutions empower individuals and organizations to enhance their quality of life while actively contributing to the preservation of our planet. By pioneering advancements that prioritize environmental stewardship, we aim to inspire a movement towards a more sustainable and equitable world for generations to come
                    </p>
                    </div>
                  <div className="img4 w-full h-full">
                    <img src="assets/PNG/LOGOSOFREGWHITE.png" alt="" className="object-contain h-full w-full"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        dwadwa
      </div> */}
      <div className="container">
        <div className="row justify-content-between mt-2">
          <div className="col-lg-5">
            <div className="cont">
              <h4 className="text-2xl wide:text-4xl font-bold">
                If you’re looking for a specialist to build a meaningful digital project you can
                easily reach us by clicking{" "}
                <span className="underline">
                  <a href="#0" className="main-color">
                    here <i className="fa-solid fa-arrow-up-right"></i>
                  </a>
                </span>
              </h4>
              <div className="exp mt-80 md-mb15">
                <h2 className="fz-70 font-bold">
                  9+{" "}
                  <span className="sub-title main-font opacity-7 ml-15">
                    Years of Experience
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="col-lg-5 valign">
            <div className="full-width">
              <div className="text">
                <p className="text-xl">
                  Whether you are a development agency looking to outsource design work, a
                  company in search of a Product Designer or Product Team, a marketing agency
                  that needs.
                </p>
              </div>
              <div className="mt-50">
                <div className="skills-box">
                  <div className="skill-item mb-40">
                    <h5 className="sub-title mb-15 text-xl font-bold">Graphic Design</h5>
                    <div className="skill-progress">
                      <div className="progres" data-value="90%"></div>
                    </div>
                  </div>
                  <div className="skill-item mb-40">
                    <h5 className="sub-title mb-15 text-xl font-bold">Web Solutions</h5>
                    <div className="skill-progress">
                      <div className="progres" data-value="96%"></div>
                    </div>
                  </div>
                  <div className="skill-item mb-40">
                    <h5 className="sub-title mb-15 text-xl font-bold">Video Production</h5>
                    <div className="skill-progress">
                      <div className="progres" data-value="93%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="line-overlay">
        <svg viewBox="0 0 1728 1101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-43 773.821C160.86 662.526 451.312 637.01 610.111 733.104C768.91 829.197 932.595 1062.9 602.782 1098.75C272.969 1134.6 676.888 25.4306 1852 1"
            style={{ strokeDasharray: "3246.53, 0" }}
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default PageIntroModern;
