import React from "react";

const HeaderMarqueeSection = () => {
  return (
    <section className="overflow-hidden relative">
      <div
        style={{
          backgroundImage: "linear-gradient(180deg, transparent 20%, #1a1a1a  80%)",
        }}
        className="absolute bottom-0 w-full h-[50px] z-50"
      >
      </div>
      <div
        style={{
          backgroundImage: "linear-gradient(0deg, transparent 20%, #1a1a1a  80%)",
        }}
        className="absolute top-0 w-full h-[50px] z-50"
      >
      </div>

      <div className="main-marq lrg o-hidden flex flex-col opacity-5">

        <div className="slide-har st1 mb-12">
          <div className="box">
            <div className="item flex justify-center flex-col gap-2">
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/ai/aie_1.jpg"
                  alt=""
                />
              </h4>
              

            </div>
            <div className="item flex justify-center flex-col gap-2">
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/amazon_listings/AMAZON_A1.jpg"
                  alt=""
                />
              </h4>
              
            </div>
            <div className="item flex justify-center flex-col gap-2">
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/branding/BRANDING_FROH_1.jpg"
                  alt=""
                />
              </h4>
              
            </div>
            <div className="item flex justify-center flex-col gap-2">
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/motion/Motion_Animation/d_1.jpg"
                  alt=""
                />
              </h4>
              
            </div>
            <div className="item flex justify-center flex-col gap-2">
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/packaging/AVENUE_1.jpg"
                  alt=""
                />
              </h4>
              
            </div>
            <div className="item flex justify-center flex-col gap-2">
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/print/Events_1.jpg"
                  alt=""
                />
              </h4>
              
            </div>
            <div className="item flex justify-center flex-col gap-2">
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/social_media/BikeShop_1.jpg"
                  alt=""
                />
              </h4>
              
            </div>
            <div className="item flex justify-center flex-col gap-2">
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/sticker/TRAILER_1.jpg"
                  alt=""
                />
              </h4>
              
            </div>
            <div className="item flex justify-center flex-col gap-2">
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/ui_ux/UI_A1.jpg"
                  alt=""
                />
              </h4>
              
            </div>
          </div>
        </div>

        <div className="slide-har st2">
          <div className="box">
            <div className="item flex justify-center flex-col gap-2">
              
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/ai/aiq_1.jpg"
                  alt=""
                />
              </h4>

            </div>
            <div className="item flex justify-center flex-col gap-2">
              
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/amazon_listings/DragonFire_1.jpg"
                  alt=""
                />
              </h4>
            </div>
            <div className="item flex justify-center flex-col gap-2">
             
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/branding/BRANDING_H_1.jpg"
                  alt=""
                />
              </h4>
            </div>
            <div className="item flex justify-center flex-col gap-2">
              
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/motion/Motion_Animation/e_1.jpg"
                  alt=""
                />
              </h4>
            </div>
            <div className="item flex justify-center flex-col gap-2">
              
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/packaging/CHOCO_1.jpg"
                  alt=""
                />
              </h4>
            </div>
            <div className="item flex justify-center flex-col gap-2">
              
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/print/OutdoorAd_1.jpg"
                  alt=""
                />
              </h4>
            </div>
            <div className="item flex justify-center flex-col gap-2">
              
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/social_media/Gym_1.jpg"
                  alt=""
                />
              </h4>
            </div>
            <div className="item flex justify-center flex-col gap-2">
              
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/sticker/VAN_1.jpg"
                  alt=""
                />
              </h4>
            </div>
            <div className="item flex justify-center flex-col gap-2">
              
              <h4 className="d-flex align-items-center">
                <img
                  className="object-cover w-full h-72"
                  src="assets/imgs/ui_ux/UI_B1.jpg"
                  alt=""
                />
              </h4>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default HeaderMarqueeSection;
