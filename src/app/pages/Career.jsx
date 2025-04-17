import React, {useState} from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProgressScrollButton from "../components/ProgressScrollButton";
import CareerHeader from "../components/Career/CareerHeader";
import SectionHeader from "../components/Career/SectionHeader";
import CareerMarqueeSection from "../components/Career/CareerMarquee";
import SectionContent from "../components/Career/SectionContent";
// import jobOverlay from "../components/Popup/JobOverlay.jsx";
import FooterDetailed from "../components/FooterDetailed";
import JobOverlay from "../components/Popup/JobOverlay.jsx";
const Career = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    // Function to open the modal with the selected image
    const openModal = (details) => {
        setSelectedJob(details);
        setIsModalVisible(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedJob(null);
    };

    return (
        <div className="startup-one overflow-hidden">
            {/* Loader */}
            <Loader />

            {/* Cursor */}
            <div className="cursor"></div>

            <ProgressScrollButton />
            {/* Navbar */}
            <Navbar />

            <Sidebar />
            <div id="smooth-content">

                <main className="main-bg">
                    <CareerHeader />
                    <SectionHeader />
                    <CareerMarqueeSection />
                    <SectionContent openModal={openModal}/>
                </main>

            <FooterDetailed />
            </div>
            <JobOverlay isVisible={isModalVisible} details={selectedJob} onClose={closeModal}/>
        </div>
    )
}

export default Career;