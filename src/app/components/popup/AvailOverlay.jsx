import React, {useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AvailOverlay = ({ isOpen, onClose, data }) => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', country: '', mobile: '' });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    country: "",
    mobile: ""
  });

  if (!isOpen) return null;

  const resetForm = () => {
    setUserInfo({ name: '', email: '', country: '', mobile: '' });
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
      let formattedPrice = data.price
      const formData = {
        service_id: 'service_bgys0a8',
        template_id: 'template_21fyy28',
        user_id: '2NyHEnshLP21eIwYA',
        template_params: {
          from_name: userInfo.name,
          message: "This email is created by quotation.",
          country: userInfo.country,
          mobile_number: userInfo.mobile,
          category: data.category,
          package: data.package,
          plan: data.plan,
          price: "$"+formattedPrice.toString(),
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


  // console.log(data)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[99999] flex justify-center items-center zoomin">
      <form onSubmit={handleSubmit} className="bg-[#1e1b1b] bg-opacity-65 rounded-sm shadow-lg w-96 tablet:w-[60%]" id="multiStepForm">
        {/* Header */}
        <div className="px-6 py-4 text-center flex justify-between items-center">
          <span></span>
          <span className="text-xl tablet:text-4xl font-bold text-white">Finalize Your Quote</span>
          <span className="font-bold text-xl text-red-500 hover:cursor-pointer hover:text-red-700 modal-close" onClick={() => {
            resetForm(); // Reset the form after submission
            onClose()
          }}>
            {/* <i className="fav fa-x"></i> */}
            <span>x</span>
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-4 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 gap-4 items-stretch justify-center max-h-[80vh] overflow-y-auto">
          {/* First Column */}
          <div className="w-full flex flex-col h-full rounded-md justify-center p-4 bg-[#212529]">

            <div className="pb-4 text-center">
              <span className="text-2xl tablet:text-3xl text-white font-bold">{data.category}</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl tablet:text-2xl font-bold text-blue-700">$</span>
              <span className="text-4xl tablet:text-5xl font-bold text-white">{data.subprice}</span>
              <span className="mt-2 tablet:mt-5 text-blue-700">/month</span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center mt-4">
              <span className="text-white text-lg tablet:text-xl text-center">{data.package}</span>
              <span className="text-lg tablet:text-xl text-center text-blue-700">{data.plan}</span>
            </div>

          </div>

          {/* Second Column */}
          <div className="steps flex flex-col gap-2 justify-center w-full h-full">
            <h6 className="text-white text-xl tablet:text-2xl font-medium text-start">
              CONTACT DETAILS
            </h6>

            {/* Contact Form */}
            <div className="text-lg tablet:text-xl">
              <label htmlFor="name" className="text-white text-sm font-medium">NAME:</label>
              <input type="text" name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                className="w-full h-10 text-lg text-white font-bold border border-white p-2 text-center bg-transparent" />
                {errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>
            <div className="text-lg tablet:text-xl">
              <label htmlFor="email" className="text-white text-sm font-medium">EMAIL:</label>
              <input type="text" name="email" 
              value={userInfo.email}
              onChange={handleInputChange}
              className="w-full h-10 text-lg text-white font-bold border border-white p-2 text-center bg-transparent" />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            <div className="text-lg tablet:text-xl">
              <label htmlFor="country" className="text-white text-sm font-medium">COUNTRY:</label>
              <input type="text" name="country"
              value={userInfo.country}
              onChange={handleInputChange} 
              className="w-full h-10 text-lg text-white font-bold border border-white p-2 text-center bg-transparent" />
              {errors.country && <span className="text-red-500">{errors.country}</span>}
            </div>
            <div className="text-lg tablet:text-xl">
              <label htmlFor="mobile_number" className="text-white text-sm font-medium">MOBILE NUMBER/WHATSAPP NO:</label>
              <input type="text" name="mobile" 
              value={userInfo.mobile}
              onChange={handleInputChange}
              className="w-full h-10 text-lg tablet:text-xl text-white font-bold border border-white p-2 text-center bg-transparent" />
              {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
            </div>

            <div className="w-full">
              <button type="submit" className="flex gap-2 items-center justify-center w-full bg-blue-700 text-white py-2 px-4 rounded-tablet hover:bg-blue-500">
                <span className="text-tablet">Submit Now</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AvailOverlay;
