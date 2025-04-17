import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const ContactForm = () => {
    const [userInfo, setUserInfo] = useState({ name: '', email: '', subject: '',message:'' });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });


    const resetForm = () => {
        setUserInfo({ name: '', email: '', subject: '', message: '' });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        console.log(userInfo)
        // Check if name, email, country, and mobile are filled
        if (!userInfo.name.trim()) newErrors.name = "Name is required";
        if (!userInfo.email.trim()) newErrors.email = "Email is required";
        if (!userInfo.subject.trim()) newErrors.subject = "Subject is required";
        if (!userInfo.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);

        // If there are errors, return false to prevent form submission
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {

            // Show SweetAlert loading message
            Swal.fire({
                title: 'Sending...',
                text: 'Please wait while we process your request.',
                icon: 'info',
                showConfirmButton: false,
                allowOutsideClick: false,
                willOpen: () => {
                Swal.showLoading();
                },
            });

            const formData = {
                service_id: 'service_bgys0a8',
                template_id: 'template_21fyy28',
                user_id: '2NyHEnshLP21eIwYA',
                template_params: {
                    from_name: userInfo.name,
                    email_id: userInfo.email,
                    message: userInfo.message || "No message provided.",
                    'country': 'not available',
                    'mobile_number': 'not available',
                    'category': 'not available',
                    'package': 'not available',
                    'plan': 'not available',
                    'price': 'not available'
                }
            };
            console.log('Form Submitted:', formData);

            try {
                // Send email using Axios
                const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', formData, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
          
                console.log('Email sent successfully!', response);
          
                // Reset form
                setUserInfo({ name: '', email: '', country: '', mobile: '' });
          
                // Show SweetAlert success message
                Swal.fire({
                  title: 'Success!',
                  text: 'Your quote has been sent successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                resetForm(); // Reset the form after submission

              } catch (err) {
                console.log('Error sending email:', err);
          
                // Show SweetAlert error message
                Swal.fire({
                  title: 'Error!',
                  text: 'There was an issue submitting the quote. Please try again.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              }
            
        }
    };

    return (
        <section className="contact section-padding desktop:px-40">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 valign">
                        <div className="sec-head info-box full-width md-mb80">
                            <div className="phone fz-30 fw-600 underline main-color">
                                <a href="#0" className='text-2xl'>+63 917 7070 531</a>
                            </div>
                            <div className="morinfo mt-4 pb-2 bord-thin-bottom">
                                <h6 className="mb-2 text-xl">Address</h6>
                                <p className='text-sm'>Quezon City Metro Manila, Philippines</p>
                            </div>
                            <div className="morinfo mt-4 pb-2 bord-thin-bottom">
                                <h6 className="mb-2 text-xl">Email</h6>
                                <p className='text-sm'>info@sofregsolutions.com</p>
                            </div>

                            <div className="social-icon-circle mt-4 flex gap-2">
                                <a href="https://www.facebook.com/people/Sofreg-Solutions/61567081641563/">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="tel:+639177070531">
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/sofreg-solutions/">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href="mailto:sofreginfo@gmail.com">
                                    <i className="fa fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 offset-lg-1 valign">
                        <div className="full-width">
                            <div className="sec-head mb-4">
                                <h6 className="sub-title main-color mb-2 font-bold">Let's Chat</h6>
                                <h3 className="text-u ls1 text-4xl font-bold">
                                    Send a <span className="fw-200">message</span>
                                </h3>
                            </div>
                            <form
                                id="contact-form"
                                className="form2"
                                onSubmit={handleSubmit}
                            >
                                <div className="messages"></div>

                                <div className="controls row">
                                    <div className="col-lg-6">
                                        <div className="form-group mb-2">
                                            <input
                                                id="form_name"
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                value={userInfo.name}
                                                onChange={handleInputChange}
                                                
                                            />
                                            {errors.name && <span className="text-red-500">{errors.name}</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group mb-2">
                                            <input
                                                id="form_email"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={userInfo.email}
                                                onChange={handleInputChange}
                                                
                                            />
                                            {errors.email && <span className="text-red-500">{errors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group mb-2">
                                            <input
                                                id="form_subject"
                                                type="text"
                                                name="subject"
                                                placeholder="Subject"
                                                value={userInfo.subject}
                                                onChange={handleInputChange}
                                            />
                                            {errors.subject && <span className="text-red-500">{errors.subject}</span>}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea
                                                id="form_message"
                                                name="message"
                                                placeholder="Message"
                                                rows="4"
                                                value={userInfo.message}
                                                onChange={handleInputChange}
                                            ></textarea>
                                            {errors.message && <span className="text-red-500">{errors.message}</span>}
                                        </div>
                                        <div className="mt-2">
                                            <button type="submit" className="butn butn-full butn-bord radius-10">
                                                <span className="text">Let's Talk</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
