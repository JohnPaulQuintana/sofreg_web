import React, { useState } from "react";
import axios from "axios";

const AccountModal = ({ onClose }) => {
    const addEmployeeAccountApi = `${import.meta.env.VITE_API_URL}/admin/employee-account`;
    const [formData, setFormData] = useState({
        employeeId: "",
        name: "",
        address: "",
        contactNo: "",
        department: "",
        position: "",
        timeOfDutyStart: "", // Added field
        timeOfDutyEnd: ""    // Added field
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = JSON.parse(localStorage.getItem("authentication")) || {};
            const response = await axios.post(addEmployeeAccountApi, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
            });
            console.log("Employee added:", response.data);
            onClose();
        } catch (error) {
            console.error("Error adding employee:", error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-[50%]">
                <h2 className="text-xl font-bold mb-2 text-color-dark">Add a new Employee</h2>
                <form onSubmit={handleSubmit} className="p-4 grid grid-cols-2 gap-2">
                    {[
                        // { label: "Employee ID", name: "employeeId", type: "text" },
                        { label: "Name", name: "name", type: "text" },
                        { label: "Address", name: "address", type: "text" },
                        { label: "Contact No.", name: "contactNo", type: "text" },
                        { label: "Department", name: "department", type: "text" },
                        { label: "Position", name: "position", type: "text" },
                        { label: "Time of Duty Start", name: "timeOfDutyStart", type: "time" }, // New input
                        { label: "Time of Duty End", name: "timeOfDutyEnd", type: "time" }     // New input
                    ].map(({ label, name, type }) => (
                        <div key={name} className="">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className={`text-color-dark w-full p-2 border rounded-md ${errors[name] ? "border-red-500" : ""
                                        }`}
                                />
                                {errors[name] && (
                                    <p className="text-red-500 text-sm mt-1">{errors[name][0]}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end space-x-2 col-span-2 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-color-dark text-white px-4 py-2 rounded-md"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountModal;
