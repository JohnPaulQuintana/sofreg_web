import React, {useState} from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PriceHeader from "../components/Pricing/PriceHeader";
import GraphicPrice from "../components/Pricing/GraphicPrice";
import Footer from "../components/Footer";
import FooterDetailed from "../components/FooterDetailed";
import ContactForm from "../components/ContactForm";
import AvailOverlay from "../components/popup/AvailOverlay";
const Pricing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    // handle plans
    const handlePlanClick = (obj) => {
        console.log(obj)
        setModalData(obj);
        setIsModalOpen(true);
    }
    const handlePlanClose = () => {
        setIsModalOpen(false);
      };

    return (
        <div className="startup-one overflow-hidden">
            {/* Loader */}
            <Loader />

            {/* Cursor */}
            <div className="cursor"></div>

            <Navbar />

            <Sidebar />
            
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="main-bg">
                        <PriceHeader />

                        {/* graphic */}
                        <GraphicPrice handlePlanClick={handlePlanClick}/>

                        <ContactForm />
                    </main>

                    {/* footer */}
                    <FooterDetailed />
                </div>
            </div>

            <AvailOverlay isOpen={isModalOpen} onClose={handlePlanClose} data={modalData}/>
        </div>
    )
}

export default Pricing;