import React from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ProgressScrollButton from "../components/ProgressScrollButton";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
const NotFound = () => {
    return (
        <div className="">
            {/* Loader */}
            <Loader />

            {/* Cursor */}
            <div className="cursor"></div>

           

            {/* progess scroll */}
            <ProgressScrollButton />

            <div className="smooth-wrapper">
                 {/* Navbar */}
                <Navbar />

                <Sidebar />
                <div id="smooth-content">
                    <header className="page-header-error section-padding valign">
                    <div className="container">
                        <div className="text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                            <div className="img">
                                <img src="assets/imgs/404.png" alt="404" />
                            </div>
                            <div className="text mt-40">
                                <h2 className="mb-10 text-5xl font-bold">Page not found</h2>
                                <p className="text-xl">Sorry, but the page you are looking for does not exist.</p>
                                <Link
                                to="/"
                                className="butn butn-md butn-bg bg-color-primary-blue text-white radius-30 mt-30"
                                >
                                <span className="text">Back to Home</span>
                                </Link>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="main-marq">
                        <div className="slide-har st1">
                        <div className="box">
                            {Array.from({ length: 6 }).map((_, index) => (
                            <div className="item" key={`box1-${index}`}>
                                <h4 className="d-flex align-items-center fw-800l">
                                <span className="text-8xl">Error 404</span>
                                </h4>
                            </div>
                            ))}
                        </div>
                        <div className="box">
                            {Array.from({ length: 6 }).map((_, index) => (
                            <div className="item" key={`box2-${index}`}>
                                <h4 className="d-flex align-items-center fw-800">
                                <span className="text-8xl">Error 404</span>
                                </h4>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    </header>

                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default NotFound