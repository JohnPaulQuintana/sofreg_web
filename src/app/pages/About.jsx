import React, {useState} from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ProgressScrollButton from "../components/ProgressScrollButton";
import AboutHeader from "../components/About/AboutHeader";
import PageIntro from "../components/About/PageIntro";
import PageIntroModern from "../components/About/PageIntroModern";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import FooterDetailed from "../components/FooterDetailed";
import MultiStepForm from "../components/popup/MultiStepForm";
const About = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFormOpen = () => setIsFormOpen(true);
    const handleFormClose = () => setIsFormOpen(false);

    return (
        <div className="overflow-hidden">
            {/* Loader */}
            <Loader />

            {/* Cursor */}
            <div className="cursor"></div>

            {/* Navbar */}
            <Navbar />

            {/* Sidebar */}
            <Sidebar />
            {/* progess scroll */}
            <ProgressScrollButton />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="main-bg">
                        {/* header */}
                        <AboutHeader />

                        {/* page intro */}
                        <PageIntro />

                        {/* Page Intro Modern */}
                        <PageIntroModern onOpenForm={handleFormOpen}/>


                    </main>

                    <FooterDetailed />
                </div>
            </div>
            {/* Render MultiStepForm */}
            <MultiStepForm isOpen={isFormOpen} onClose={handleFormClose} />
        </div>
    )
}

export default About;