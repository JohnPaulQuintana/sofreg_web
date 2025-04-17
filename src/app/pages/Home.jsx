import React, {useState} from "react"
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Header from "../components/Home/Header"
import Services from "../components/Home/Services"
import AboutSection from "../components/Home/AboutSection"
// import "/assets/css/satoshi.css"
// import "/assets/css/plugins.css"
// import "/assets/css/style.css"
import ProgressScrollButton from "../components/ProgressScrollButton";
import MarqueeSection from "../components/Home/Marquee"
import MarqueeSection2 from "../components/HeaderMarquee2"
import PortfolioTabGraphics from "../components/Home/PortfolioTabGraphics"
import ImageScale from "../components/ImageScale"
import Team from "../components/Home/Team"
import Footer from "../components/Footer"
import PortfolioTabWeb from "../components/Home/PortfolioTabWeb"
import PortfolioTabVideo from "../components/Home/PortfolioTabVideo"
import Testimonials from "../components/Testimonial"
import Faqs from "../components/Faqs"
import ContactForm from "../components/ContactForm";
import FooterDetailed from "../components/FooterDetailed";
import MultiStepForm from "../components/popup/MultiStepForm";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormOpen = () => setIsFormOpen(true);
  const handleFormClose = () => setIsFormOpen(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="startup-one overflow-hidden">
      {/* Loader */}
      <Loader />

      {/* Cursor */}
      <div className="cursor"></div>

      {/* Progress Scroll Button */}
      <ProgressScrollButton />

      <div id="smooth-wrapper">

        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar}/>
        {/* End of Navbar */}

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen}/>
        {/* End of Sidebar */}

        <div id="smooth-content">

            <main className="main-bg">

              {/* Header */}
              <Header onOpenForm={handleFormOpen}/>
              <div className="text-center py-10">
                  <h1 className="text-2xl mb-2"><span className="font-bold text-color-primary-blue">150+</span> Projects Successfully Delivered With Many More on the Horizon!</h1>
                <MarqueeSection2 />
              </div>
              {/* Marquee */}

              {/* Services */}
              <Services />

              {/* About */}
              <AboutSection />

              {/* Marquee */}
              <MarqueeSection />

              {/* Graphics */}
              <PortfolioTabGraphics />

              {/* Web Solutions */}
              <PortfolioTabWeb />

              {/* Video Production */}
              <PortfolioTabVideo />
              {/* Render ImageScale component and pass the handler */}
              <ImageScale onOpenForm={handleFormOpen} />

              {/* about footer section */}
              <Team />

              {/* Testimonials */}
              <Testimonials />

              {/* Frequently ask */}
              <Faqs />

              {/* Contact Section */}
              {/* <ContactSection /> */}
              <ContactForm />
            </main>

          {/* footer */}
          <FooterDetailed />
        </div>
      </div>
      {/* Render MultiStepForm */}
      <MultiStepForm isOpen={isFormOpen} onClose={handleFormClose} />
    </div>
  );
};

export default Home;
