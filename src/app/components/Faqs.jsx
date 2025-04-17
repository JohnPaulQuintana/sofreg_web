import React, { useState } from "react";

const Faqs = () => {
    return (
        <section className="faqs section-padding position-re desktop:px-40 bg-[#1d1d1d]">
            <div className="container py-10">
                <div className="row justify-content-between">
                    <div className="col-lg-6">
                        <div className="sec-head md-mb80">
                            <h6 className="sub-title main-color mb-15 font-bold text-xl">FAQS</h6>
                            <h2 className="font-bold text-5xl"><span>Frequently</span> <span className="block">Asked Questions</span></h2>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="list-serv">
                            <div className="accordion bord">

                                <div className="item mb-15 wow fadeInUp" data-wow-delay=".1s">
                                    <div className="title">
                                        <h6 className="font-bold text-xl pl-2 wide:text-2xl">What types of projects do you handle in graphic design, video editing, and website development?</h6>
                                        <span className="ico ti-plus"></span>
                                    </div>
                                    <div className="accordion-info">
                                        <p className="text-base text-sm wide:text-xl">We handle a wide range of projects, from creating stunning logos, branding, and marketing materials to producing high-quality videos for promotions, ads, and social media. Our website development services include everything from custom websites to e-commerce solutions, ensuring a seamless experience across design, video, and web.</p>
                                    </div>
                                </div>

                                <div className="item active mb-15 wow fadeInUp" data-wow-delay=".3s">
                                    <div className="title">
                                        <h6 className="font-bold text-xl pl-2 wide:text-2xl">How do you ensure my project meets my vision and needs?</h6>
                                        <span className="ico ti-plus"></span>
                                    </div>
                                    <div className="accordion-info">
                                        <p className="text-base text-sm wide:text-xl">We collaborate closely with our clients, ensuring open communication throughout the process. We begin by understanding your goals and vision, then provide creative solutions tailored to your brand. Regular feedback loops during design, video editing, and website development ensure we meet your expectations at every stage.</p>
                                        
                                    </div>
                                </div>

                                <div className="item mb-15 wow fadeInUp" data-wow-delay=".3s">
                                    <div className="title">
                                        <h6 className="font-bold text-xl pl-2 wide:text-2xl">Do you offer packages or custom solutions for all three services?</h6>
                                        <span className="ico ti-plus"></span>
                                    </div>
                                    <div className="accordion-info">
                                        <p className="text-sm wide:text-xl">Yes, we offer both customizable packages and tailored solutions to meet your specific needs. Whether you require a complete brand overhaul, a website with integrated video content, or individual services like graphic design and editing, we can create a solution that fits your project and budget.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line-overlay up opacity-7">
                <svg viewBox="0 0 1728 1101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M-43 773.821C160.86 662.526 451.312 637.01 610.111 733.104C768.91 829.197 932.595 1062.9 602.782 1098.75C272.969 1134.6 676.888 25.4306 1852 1"
                        style={{strokeDasharray: "3246.53, 0"}}></path>
                </svg>
            </div>
        </section>
    )
}

export default Faqs