import React from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ProgressScrollButton from "../components/ProgressScrollButton";
import Sidebar from "../components/Sidebar";
import ContactHeader from "../components/Contact/ContactHeader";
import ContactForm from "../components/ContactForm";
import GoogleMap from "../components/GoogleMap";
import Footer from "../components/Footer";
import FooterDetailed from "../components/FooterDetailed";

const Contact = () => {
    return (
        <div className="smooth-wrapper overflow-hidden">
            {/* Loader */}
            <Loader />

            {/* Cursor */}
            <div className="cursor"></div>

            <ProgressScrollButton />

            {/* navbar */}
            <Navbar />
            <Sidebar />
            <div id="smooth-content">

                <main className="main-bg">
                    <ContactHeader />

                    <ContactForm />

                    <GoogleMap />
                </main>
                <FooterDetailed />
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default Contact;