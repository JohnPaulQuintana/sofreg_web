import React, { useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import axios from "axios";
import Swal from 'sweetalert2';

const JobOverlay = ({ details, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        contact: '',
        portfolioPdf: null,
        portfolioUrl: '',
        resumePdf: null,
        subject: details ? details.title : "Default Subject",
        body: 'This is the generated test for phpmailer',
        securityCode: '123456',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(details)
    if (!details) return null; // If details are not available, do not render the modal.

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if required fields are present
        if (
            !formData.portfolioPdf && !formData.portfolioUrl ||
            !formData.resumePdf ||
            !formData.name ||
            !formData.email ||
            !formData.address ||
            !formData.contact ||
            !formData.subject ||
            !formData.body ||
            !formData.securityCode
        ) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill all fields and upload both PDFs.',
            });
            setResponseMessage('Please fill all fields and upload both PDFs.');
            return;
        }

        setLoading(true);
        const data = new FormData();

        console.log(formData)
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('address', formData.address);
        data.append('contact', formData.contact);
        data.append('portfolio_pdf', formData.portfolioPdf);
        data.append('portfolio_url', formData.portfolioUrl);
        data.append('resume_pdf', formData.resumePdf);
        data.append('subject', details.title);
        data.append('body', formData.body);
        data.append('security_code', formData.securityCode); // Add security code

        try {

            // Display SweetAlert with loading spinner while the email is being processed
            const swalInstance = Swal.fire({
                title: 'Sending Application...',
                text: 'Please wait while we process your request.',
                icon: 'info',  // You can change the icon to 'info' or 'loading'
                showConfirmButton: false,
                allowOutsideClick: false,
                willOpen: () => {
                    Swal.showLoading(); // Show the loading spinner
                },
            });

            // Sending POST request to PHP API (Ensure your PHP API is running at this URL)
            const response = await axios.post('http://localhost/sofreg_mailer/send-email.php', data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensures the PDFs are sent as files
                },
            });

            setResponseMessage(response.data.success || response.data.error);

            // Show success alert if email is sent successfully
            if (response.data.success) {
                swalInstance.close(); // Close the loading alert
                Swal.fire({
                    icon: 'success',
                    title: 'Email Sent',
                    text: response.data.success,  // Show the success message from the API
                }).then(() => {
                    // Reset the form after success
                    setFormData({
                        name: '',
                        email: '',
                        address: '',
                        contact: '',
                        portfolioPdf: null,
                        portfolioUrl: '',
                        resumePdf: null,
                        subject: '',
                        body: '',
                        securityCode: '',
                    });
                });;
            } else {
                // Show error alert if there's an issue in the response
                swalInstance.close(); // Close the loading alert
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.error || 'Something went wrong!',
                })
            }

        } catch (error) {
            console.error('Error sending email:', error);

            // Show error alert in case of any issues during the request
            Swal.fire({
                icon: 'error',
                title: 'Failed to Send Email',
                text: 'Failed to send email. Please try again.',
            });

            setResponseMessage('Failed to send email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            id="image-viewer"
            className="fixed overflow-x-hidden inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center zoomout"
        >
            <div className="p-4 rounded-lg">

                <span className="">
                    <div className="p-2 flex flex-col">


                        <span className="w-full laptop:w-[50%] p-10 py-6 flex flex-col phone:flex-row laptop:items-center gap-4 bg-[#1d1d1d] relative zoomout">
                            <span
                                id="preview-close"
                                className="absolute z-[9999] top-10 right-10  text-white text-5xl cursor-pointer hover:text-red-500"
                                onClick={onClose}
                            >
                                &times;
                            </span>

                            <span className="w-20 laptop:w-24 rounded-sm">
                                <img src="/assets/PNG/LOGO_WHITE.png" className="bg-color-primary-blue p-2" alt="" />
                            </span>

                            <span className="flex flex-col w-full">
                                <span className="text-2xl laptop:text-3xl font-bold">
                                    {details?.title}
                                </span>
                                <span className="text-sm">
                                    {details?.address}
                                </span>
                                <span className="text-xs text-gray-500">• {formatDistanceToNow(new Date(details?.date_posted), { addSuffix: true })}</span>
                                <span className=""> <span className="text-sm border w-fit px-1 mt-2 rounded-sm me-2">Full-Time</span>
                                    <span className="text-sm border w-fit px-1 mt-2 rounded-sm">Work From Home</span></span>
                            </span>


                        </span>

                        <span className="w-full laptop:w-[50%] p-10 py-6 flex flex-col gap-3 bg-[#1d1d1d] h-[400px] overflow-y-auto">
                            <span className="flex-1 text-xl font-bold text-color-primary-blue"><i className="fas fa-clipboard-list text-xl"></i> Job Description: </span>
                            <span className="phone:text-xl text-gray-300">{details?.description}</span>
                            <span className="flex-1 text-xl font-bold text-color-primary-blue"><i className="fas fa-check-circle text-color-primary-blue text-xl"></i> Key Responsibilities: </span>
                            <span className="flex flex-col gap-2 phone:text-xl">
                                {details?.responsibilities?.map((item, index) => (
                                    <span key={index}><span>✔</span> {item?.responsibility}</span>
                                ))}
                            </span>
                            <span className={`flex-1 text-xl font-bold text-color-primary-blue ${details?.requirements?.length > 0 ? 'block' : 'hidden'}`}><i className="fas fa-check-circle text-color-primary-blue text-xl"></i> Requirements: </span>
                            <span className="flex flex-col gap-2 phone:text-xl">
                                {details?.requirements?.length > 0 &&
                                    details?.requirements?.map((item, index) => (
                                        <span key={index}>
                                            <span>✔</span> {item?.requirement}
                                        </span>
                                    ))}
                            </span>

                            <span className="phone:text-xl"> Join our team and be a part of a forward-thinking company that values innovation and creativity!</span>
                            <span className="phone:text-xl">  Interested candidates should send their resume and portfolio by clicking the button below. </span>
                            <span className="phone:text-xl">  Applications will be reviewed on a rolling basis until the positions are filled. </span>
                            {details?.status === "open" && (
                            <a href="https://forms.gle/hCr6UsrC7c154sWc7" target="_blank" rel="noopener noreferrer" className="hover:bg-color-gray cursor-pointer bg-color-primary-blue w-fit p-2 rounded-sm">
                                Apply Now
                            </a>

                            )}
                            {/* <span className="bg-[#181616] p-2 rounded-sm">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                    <span className="phone:text-xl font-bold text-color-primary-blue">Apply as {details.title}</span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="form_name"
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            className="p-2 text-color-dark rounded-sm"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Address</label>
                                        <input
                                            id="form_address"
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            className="p-2 text-color-dark rounded-sm"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Contact No.</label>
                                        <input
                                            id="form_contact"
                                            type="text"
                                            name="contact"
                                            placeholder="Contact Number"
                                            className="p-2 text-color-dark rounded-sm"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            required
                                        />
                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Email</label>
                                        <input
                                            id="form_email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className="p-2 text-color-dark rounded-sm"
                                            value={formData.email}
                                            onChange={handleChange}
                                            
                                        />
                                        

                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Resume/CV</label>
                                        <input
                                            id="form_resume"
                                            type="file"
                                            name="resumePdf"
                                            placeholder="Resume/CV"
                                            className="p-2 rounded-sm"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            required
                                        />
                                    </span>
                                    <span className="flex flex-col">
                                        <label htmlFor="name">Portfolio</label>
                                        <input
                                            id="form_portfolio"
                                            type="file"
                                            name="portfolioPdf"
                                            placeholder="Portfolio"
                                            className="p-2 rounded-sm"
                                            onChange={handleFileChange}
                                            accept=".pdf"
                                            

                                        />
                                        <p>OR</p>
                                        <input
                                            type="text"
                                            name="portfolioUrl"
                                            value={formData.portfolioUrl}
                                            placeholder="Enter portfolio URL"
                                            className="p-2 text-color-dark rounded-sm"
                                            onChange={handleChange}
                                        />
                                    </span>

                                    <button className="border p-2" type="submit" disabled={loading}>
                                        {loading ? 'Sending...' : 'Send Email'}
                                    </button>
                                </form>
                            </span> */}
                        </span>
                    </div>
                </span>

            </div>

        </div>
    )
}

export default JobOverlay