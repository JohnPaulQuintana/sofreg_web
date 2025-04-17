import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const EditJobModal = ({ onClose, job }) => {
    console.log(job)
    const jobApi = `${import.meta.env.VITE_API_URL}/admin/jobs/${job.id}`;
    const [formData, setFormData] = useState({
        status: "open",
        title: "",
        description: "",
        date_posted: "",
        address: "",
        responsibilities: [""],
        requirements: [""],
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Load job details into form
    useEffect(() => {
        if (job) {
            setFormData({
                title: job.title || "",
                status: job.status || "open",
                description: job.description || "",
                date_posted: job.date_posted || "",
                address: job.address || "",
                responsibilities: job.responsibilities?.map(r => r.responsibility) || [""],
                requirements: job.requirements?.map(r => r.requirement) || [""],
            });
        }
    }, [job]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (type, index, value) => {
        const updated = [...formData[type]];
        updated[index] = value;
        setFormData({ ...formData, [type]: updated });
    };

    const addArrayItem = (type) => {
        setFormData({ ...formData, [type]: [...formData[type], ""] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = JSON.parse(localStorage.getItem("authentication")) || {};
            const response = await axios.post(jobApi, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
            });
            console.log("Job updated:", response.data);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Job updated successfully!',
                timer: 2000,
                showConfirmButton: false,
            }).then(()=>{
                window.location.reload(); // 👈 reload after alert
            });
            onClose();
        } catch (error) {
            console.error("Error updating job:", error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-background-dark p-6 rounded-lg w-[50%] max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Edit Job Posting</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Title", name: "title", type: "text" },
                        { label: "Status", name: "status", type: "text" },
                        { label: "Address", name: "address", type: "text" },
                        { label: "Date Posted", name: "date_posted", type: "datetime-local" },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className={`w-full p-2 border text-black rounded-md ${errors[name] ? "border-red-500" : ""}`}
                            />
                            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name][0]}</p>}
                        </div>
                    ))}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className={`w-full p-2 border text-black rounded-md ${errors.description ? "border-red-500" : ""}`}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description[0]}</p>}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Responsibilities</label>
                        {formData.responsibilities.map((item, index) => (
                            <input
                                key={index}
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                                className="w-full text-black mb-2 p-2 border rounded-md"
                            />
                        ))}
                        <button type="button" onClick={() => addArrayItem("responsibilities")} className="text-sm text-blue-600">
                            + Add Responsibility
                        </button>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Requirements</label>
                        {formData.requirements.map((item, index) => (
                            <input
                                key={index}
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                                className="w-full text-black mb-2 p-2 border rounded-md"
                            />
                        ))}
                        <button type="button" onClick={() => addArrayItem("requirements")} className="text-sm text-blue-600">
                            + Add Requirement
                        </button>
                    </div>

                    <div className="flex justify-end col-span-2 space-x-2">
                        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded-md" disabled={loading}>
                            {loading ? "Updating..." : "Update Job"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditJobModal;
