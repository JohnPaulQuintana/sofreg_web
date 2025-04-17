import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const prices = {
    "categories": [
        {
            "name": "GRAPHIC DESIGN + VIDEO EDITING",
            "subcategories": [
                {
                    "name": "FULL-TIME AND PROJECT-BASED",
                    "prices": [
                        { "duration": "Monthly", "price": "1,700K" },
                        { "duration": "Monthly", "price": "2,500K" },
                        { "duration": "Monthly", "price": "4,000K" },
                    ]
                },
                // {
                //     "name": "PROJECT-BASED",
                //     "prices": [
                //         { "duration": "Monthly", "price": "1,700K" },
                //         { "duration": "Monthly", "price": "3,000K" },
                //         { "duration": "Monthly", "price": "6,000K" },
                //     ]
                // }
            ]
        },
        {
            "name": "WEBSITE SOLUTIONS",
            "subcategories": [
                {
                    "name": "PROJECT-BASED",
                    "prices": [
                        { "duration": "Monthly", "price": "4,500K" },
                        { "duration": "Monthly", "price": "6,500K" },
                        { "duration": "Monthly", "price": "10,000K" },
                    ]
                }
            ]
        },
        {
            "name": "ALL SERVICES",
            "subcategories": [
                {
                    "name": "FULL-TIME AND PROJECT-BASED",
                    "prices": [
                        { "duration": "Monthly", "price": "4,960K" },
                        { "duration": "Monthly", "price": "7,200K" },
                        { "duration": "Monthly", "price": "11,200K" },
                    ]
                },
                // {
                //     "name": "PROJECT-BASED",
                //     "prices": [
                //         { "duration": "Monthly", "price": "3,760K" },
                //         { "duration": "Monthly", "price": "6,800K" },
                //         { "duration": "Monthly", "price": "11,600K" },
                //     ]
                // }
            ]
        }
    ]
};

const MultiStepForm = ({ isOpen, onClose }) => {

    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [userInfo, setUserInfo] = useState({ name: '', email: '', country: '', mobile: '' });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        country: "",
        mobile: ""
    });

    if (!isOpen) return null;

    const resetForm = () => {
        setStep(1);
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setSelectedPrice(null);
        setUserInfo({ name: '', email: '', country: '', mobile: '' });
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setStep(2); // Move to the next step (subcategory selection)
    };

    const handleSubcategorySelect = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setStep(3); // Move to the next step (price selection)
    };

    const handlePriceSelect = (price) => {
        setSelectedPrice(price);
        setStep(4); // Move to the final step (user info)
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
        if (!userInfo.country.trim()) newErrors.country = "Country is required";
        if (!userInfo.mobile.trim()) newErrors.mobile = "Mobile is required";

        // Check if either mobile or whatsapp is filled and is 11 digits long
        const mobile = userInfo.mobile ? userInfo.mobile.trim() : ""; // Default to empty string if undefined
        const whatsapp = userInfo.whatsapp ? userInfo.whatsapp.trim() : ""; // Default to empty string if undefined

        const isValidNumber = (num) => /^\d{11}$/.test(num); // Regex to check for exactly 11 digits

        if (!mobile && !whatsapp) {
            newErrors.mobile = "Mobile or WhatsApp is required";
        } else if (!(isValidNumber(mobile) || isValidNumber(whatsapp))) {
            newErrors.mobile = "Mobile or WhatsApp must be 11 digits";
        }

        setErrors(newErrors);

        // If there are errors, return false to prevent form submission
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {

        //         service_id: 'service_bgys0a8',  // Replace with your EmailJS service ID
        //   template_id: 'template_21fyy28',  // Replace with your EmailJS template ID
        //   user_id: '2NyHEnshLP21eIwYA',  // Replace with your EmailJS public key
        //   template_params: {
        //     'from_name': name,
        //     'email_id': email,
        //     'message': formData.get('message') || "No message provided.",
        //     'country': country,
        //     'mobile_number': mobile_number,
        //     'category': localStorage.getItem("category"),
        //     'package': 'not set',
        //     'plan': localStorage.getItem("subcategory"),
        //     'price': localStorage.getItem("price")
        //   }

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
                    message: "This email is created by quotation.",
                    country: userInfo.country,
                    mobile_number: userInfo.mobile,
                    category: selectedCategory.name,
                    package: 'Not available',
                    plan: selectedSubcategory.name,
                    price: selectedPrice.price +' '+ selectedPrice.duration,
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
                onClose(); // Close the modal after submitting

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

    const handleBack = () => {
        if (step === 2) {
            setSelectedCategory(null);
        } else if (step === 3) {
            setSelectedSubcategory(null);
        } else if (step === 4) {
            setSelectedPrice(null);
        }
        setStep((prevStep) => prevStep - 1); // Navigate to the previous step
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-[99999] flex justify-center items-center zoomin">
            <form onSubmit={handleSubmit} className="bg-[#1e1b1b] rounded-sm shadow-lg w-96 tablet:w-[60%] p-4" id="multiStepForm">
                {/* Header */}
                <div className="px-6 py-2 text-center flex justify-between items-center">
                    <span></span>
                    <span className="text-2xl tablet:text-4xl font-bold text-white">Design a Quote</span>
                    <span className="font-bold text-xl text-red-500 hover:cursor-pointer hover:text-red-700 modal-close" onClick={() => {
                        resetForm(); // Reset the form after submission
                        onClose();
                    }}>
                        x
                    </span>
                </div>

                {/* Body */}
                <div className="laptop:px-6 py-4 grid grid-cols-1 gap-4 items-stretch justify-center max-h-[80vh] overflow-y-auto">
                    {/* Step 1: Choose Category */}
                    {step === 1 && (
                        <div className='flex flex-col items-start gap-3 laptop:px-16 zoomin'>
                            <h2 className="text-white text-xl">Which services are you interested in?</h2>
                            {prices.categories.map((category, index) => (
                                <button
                                    key={index}
                                    className="w-full border font-bold text-slate-50 py-2 px-4 rounded transition-all duration-300 ease-in-out transform laptop:hover:scale-105"
                                    onClick={() => handleCategorySelect(category)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Choose Subcategory */}
                    {step === 2 && selectedCategory && (
                        <div className='flex flex-col items-start gap-3 laptop:px-16 zoomin'>
                            <h2 className="text-white text-xl">How do you want to work?</h2>
                            {selectedCategory.subcategories.map((subcategory, index) => (
                                <button
                                    key={index}
                                    className="w-full border font-bold text-slate-50 py-2 px-4 rounded transition-all duration-300 ease-in-out transform laptop:hover:scale-105"
                                    onClick={() => handleSubcategorySelect(subcategory)}
                                >
                                    {subcategory.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 3: Choose Price */}
                    {step === 3 && selectedSubcategory && (
                        <div className='flex flex-col items-start gap-3 laptop:px-16 zoomin'>
                            <div>
                                <h2 className="text-white text-xl">What is your Budget? (in USD)</h2>
                                <span>Service Price Starts at:</span>
                            </div>
                            {selectedSubcategory.prices.map((price, index) => (
                                <button
                                    key={index}
                                    className="w-full border font-bold text-slate-50 py-2 px-4 rounded transition-all duration-300 ease-in-out transform laptop:hover:scale-105"
                                    onClick={() => handlePriceSelect(price)}
                                >
                                    {price.duration}: {price.price}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 4: User Info and Submit */}
                    {step === 4 && selectedPrice && (
                        <div className='laptop:px-16 zoomin'>
                            <h2 className="text-white text-xl">Step 4: Enter Your Information</h2>
                            <div className="mt-2">
                                <label className="text-white">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-2 rounded-sm bg-transparent border"
                                    
                                />
                                {errors.name && <span className="text-red-500">{errors.name}</span>}
                            </div>
                            <div className="mt-2">
                                <label className="text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-2 rounded-sm bg-transparent border"
                                    
                                />
                                {errors.email && <span className="text-red-500">{errors.email}</span>}
                            </div>
                            <div className="mt-2">
                                <label className="text-white">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={userInfo.country}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-2 rounded-sm bg-transparent border"
                                    
                                />
                                {errors.country && <span className="text-red-500">{errors.country}</span>}
                            </div>
                            <div className="mt-2">
                                <label className="text-white">Mobile Number / Whatsapp</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={userInfo.mobile}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-2 rounded-sm bg-transparent border"
                                    
                                />
                                {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
                            </div>

                        </div>
                    )}
                </div>
                {/* Back Button */}
                {step > 1 && (
                    <div className="flex justify-center gap-4 laptop:px-[88px] zoomin">
                        <button
                            type='button'
                            className="w-full bg-gray-600 text-white py-2 px-4 rounded"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-2 px-4 rounded"
                            // onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default MultiStepForm;
