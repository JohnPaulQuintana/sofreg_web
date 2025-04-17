import React, {useState} from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import WorkHeader from "../components/Service/WorkHeader";
import WorkSection from "../components/Service/WorkSection";
import Footer from "../components/Footer";
import ProgressScrollButton from "../components/ProgressScrollButton";
import ImageScale from "../components/ImageScale";
import Testimonials from "../components/Testimonial";
import Faqs from "../components/Faqs";
// import ContactSection from "../components/ContactSection";
import Sidebar from "../components/Sidebar";
import ContactForm from "../components/ContactForm";
import FooterDetailed from "../components/FooterDetailed";
import Modal from "../components/ImageViewer"
import { useLocation } from "react-router-dom";
import MultiStepForm from "../components/popup/MultiStepForm";

const Services = () => {

    const [isFormOpen, setIsFormOpen] = useState(false);

    const location = useLocation();
    const { state } = location.state || {}; // Access the prop
    // console.log(state)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to open the modal with the selected image
    const openModal = (image, type) => {
        setSelectedImage({src:image, type});
        setIsModalVisible(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedImage(null);
    };

    const handleFormOpen = () => setIsFormOpen(true);
    const handleFormClose = () => setIsFormOpen(false);

    return (
        <div className="smooth-wrapper overflow-hidden">

            {/* Loader */}
            <Loader />

            {/* Cursor */}
            <div className="cursor"></div>

            <ProgressScrollButton />
            {/* Navbar */}
            <Navbar />

            {/* sidebar */}
            <Sidebar />
            <div id="smooth-content">

                <main className="main-bg">
                    {/* header */}
                    <WorkHeader />

                    {/* Portfolio */}
                    <WorkSection openModal={openModal}/>

                    {/* Image Scale */}
                    <ImageScale onOpenForm={handleFormOpen}/>

                    {/* Testimonials */}
                    <Testimonials />

                    {/* Faqs */}
                    <Faqs />

                    {/* COntact */}
                    {/* <ContactSection /> */}
                    <ContactForm />
                </main>

            


            <FooterDetailed />
            {/* <Footer /> */}
            </div>
            {/* Modal Component */}
            <Modal isVisible={isModalVisible} imageSrc={selectedImage?.src} type={selectedImage?.type} onClose={closeModal} />
            {/* Render MultiStepForm */}
            <MultiStepForm isOpen={isFormOpen} onClose={handleFormClose} />
        </div>
    )
}

export default Services;