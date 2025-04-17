import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditAccountModal = ({ data, onClose }) => {
    const updateEmployeeAccountApi = `${import.meta.env.VITE_API_URL}/admin/update-employee`;
    

    const [formData, setFormData] = useState({
        employee_id: "",
        name: "",
        address: "",
        contact_no: "",
        department: "",
        position: "",
        time_of_duty_start: "",
        time_of_duty_end: ""
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {

            setFormData({
                employee_id: data.employee.employee_id || "",
                name: data.employee.name || "",
                address: data.employee.address || "",
                contact_no: data.employee.contact_no || "",
                department: data.employee.department || "",
                position: data.employee.position || "",
                time_of_duty_start: data.employee.time_of_duty_start || "",
                time_of_duty_end: data.employee.time_of_duty_end || ""
            });

        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const authData = JSON.parse(localStorage.getItem("authentication")) || {};
            const response = await axios.post(updateEmployeeAccountApi, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authData.token}`,
                },
            });
            console.log("Employee updated:", response.data);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Employee account updated successfully!",
            }).then(() => {
                console.log('success!')
            });

        } catch (error) {
            console.error("Error updating employee:", error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            employee_id: "",
            name: "",
            address: "",
            contact_no: "",
            department: "",
            position: "",
            time_of_duty_start: "",
            time_of_duty_end: ""
        });
        onClose();
    };

    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-color-dark p-6 rounded-lg w-[50%]">
                <h2 className="text-xl font-bold mb-2 text-white">Edit Employee Information Account</h2>
                <form onSubmit={handleSubmit} className="p-4 grid grid-cols-2 gap-2">
                    {["employee_id", "name", "address", "contact_no", "department", "position", "time_of_duty_start", "time_of_duty_end"].map((field) => (
                        <div key={field} className="">
                            <label className="block text-sm font-medium text-white">
                                {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </label>
                            <input
                                type={field.includes("timeOfDuty") ? "time" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                disabled={field === "employee_id"}
                                className={`text-white w-full p-2 border bg-transparent rounded-md ${errors[field] ? "border-red-500" : ""}`}
                            />
                            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field][0]}</p>}
                        </div>
                    ))}
                    <div className="flex justify-end space-x-2 col-span-2 mt-2">
                        <button onClick={handleCancel} type="button" className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                        <button type="submit" className="bg-white text-color-dark px-4 py-2 rounded-md" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccountModal;
