import React from "react";

const AttendanceModal = ({ employeeData, onClose }) => {
    // console.log(employeeData)
    const isScrollable = employeeData.attendance_records.length > 5;

    const imageUrl = `${import.meta.env.VITE_API_URL}/storage`
    if (!employeeData || employeeData.length === 0) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-[50%]">
                    <h2 className="text-xl text-color-dark mb-2">No Attendance Data Available</h2>
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-color-dark p-6 rounded-lg w-[60%]">
                <h2 className="text-xl mb-4 text-white">Employee ID: <span className="font-bold">{employeeData.attendance_records[0].employee_id}</span></h2>
                <div className="overflow-auto">
                    <table className="min-w-full bg-color-dark">
                        <thead>
                            <tr className="bg-color-gray text-white">
                                <th className="py-2 px-4 w-[150px]">DATE</th>
                                <th className="py-2 px-4 w-[150px]">CLOCK IN</th>
                                <th className="py-2 px-4 w-[150px]">CLOCK OUT</th>
                                <th className="py-2 px-4 w-[150px]">STATUS</th>
                                <th className="py-2 px-4 w-[150px]">IMAGE</th>
                            </tr>
                        </thead>
                        {/* <tbody className={
                            isScrollable ? "max-h-60 overflow-y-auto block" : ""
                        }>
                            {employeeData.attendance_records.map((record) => (
                                <tr key={record.id} className="text-center text-white">
                                    <td className="py-2 px-4 border">{record.date}</td>
                                    <td className="py-2 px-4 border">{record.clock_in}</td>
                                    <td className="py-2 px-4 border">{record.clock_out || "--"}</td>
                                    <td className={`py-2 px-4 border ${record.status == "Late" ? "text-red-500" : 'text-green-500'}`}>{record.status}</td>
                                    <td className="py-2 px-4 border">
                                        {record.captured_image ? (
                                            <img src={`${imageUrl}/${record.captured_image}`} alt="Captured" className="w-12 h-12 object-cover mx-auto" />
                                        ) : "No Image"}
                                    </td>
                                </tr>
                            ))}
                        </tbody> */}
                    </table>
                    <div className="max-h-[60vh] overflow-y-auto">
                        <table className="min-w-full bg-color-dark">
                            <tbody>
                                {employeeData.attendance_records.map((record, index) => (
                                    <tr key={record.id} className={`text-white ${index % 2 === 0 ? 'border-b-2 border-color-gray' : ''}`}>
                                        <td className="py-2 px-4 w-[150px]">{record.date}</td>
                                        <td className="py-2 px-4 w-[150px]">{record.clock_in}</td>
                                        <td className="py-2 px-4 w-[150px]">{record.clock_out || "--"}</td>
                                        <td className={`py-2 px-4 w-[150px] ${record.status === "Late" ? "text-red-500" : 'text-green-500'}`}>{record.status}</td>
                                        <td className="py-2 px-4 w-[150px]">
                                            {record.captured_image ? (
                                                <img src={`${imageUrl}/${record.captured_image}`} alt="Captured" className="w-12 h-12 object-cover mx-auto" />
                                            ) : "No Image"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
                </div>
            </div>
        </div>
    );
};

export default AttendanceModal;
