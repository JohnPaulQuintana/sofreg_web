import React, { useState } from "react";
import axios from "axios";
import AttendanceModal from "./AttendanceModal";
import ImageViewModal from "./ImageViewModal";

const AttendanceTable = ({ attendanceData, onPageChange }) => {
  const attendanceViewApi = `${
    import.meta.env.VITE_API_URL
  }/admin/view-attendance`;
  const imageUrl = `${import.meta.env.VITE_API_URL}/storage`;
  const token = JSON.parse(localStorage.getItem("authentication")) || {};

  const data = attendanceData?.employee_attendance?.data || [];
  // console.log(data)
  const currentPage = attendanceData?.employee_attendance?.current_page;
  const lastPage = attendanceData?.employee_attendance?.last_page;
  const [viewAttendance, setViewAttendance] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [imageDomain, setImageDomain] = useState(imageUrl);

  const [searchTerm, setSearchTerm] = useState("");

  const formatTime = (time) => {
    if (!time) return "N/A";
    const [hour, minute] = time.split(":");
    const hours = parseInt(hour, 10);
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;

    return `${formattedHour}:${minute} ${suffix}`;
  };

  const closeAttendanceModal = () => setViewAttendance(false);
  const closeImageModal = () => setViewImage(false);
  // viewing attendance
  const triggerAttendanceModal = async (emp_id) => {
    // alert(emp_id)

    try {
      const response = await axios.get(attendanceViewApi, {
        params: { employee_id: emp_id }, // Query params go here
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      console.log("Employee data:", response.data);
      setEmployeeData(response.data);
      setViewAttendance(true);
    } catch (error) {
      console.error("Failed to fetch employee data:", error);
    }
  };

  const triggerImageModal = (image) => {
    setImageDomain(`${imageUrl}/${image}`);
    setViewImage(true);
  };

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      // console.log(item)
      item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col w-full">
      <div className="flex justify-end mt-1">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-color-dark p-1 ps-3 rounded-sm"
        />
      </div>
      <div className="flex-grow overflow-x-scroll overflow-y-hidden w-full">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">
                Clock In
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">
                Clock Out
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">
                Captured Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((record, index) => (
                <tr
                  key={record.id}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-400" : ""
                  }`}
                >
                  <td className="p-2 whitespace-nowrap">
                    {record.employee_id}
                  </td>
                  <td className="p-2 whitespace-nowrap">{record.user.name}</td>
                  <td className="p-2 whitespace-nowrap">{record.date}</td>
                  <td className="p-2 whitespace-nowrap">
                    {formatTime(record.clock_in)}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {formatTime(record.clock_out) || "--"}
                  </td>
                  <td className={`p-2 whitespace-nowrap`}>
                    <span
                      className={`text-xs px-1 rounded-md ${
                        record.status === "On Time"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td
                    onClick={() => triggerImageModal(record.captured_image)}
                    className="p-2 whitespace-nowrap cursor-pointer"
                  >
                    {record.captured_image ? (
                      <img
                        src={`${imageUrl}/${record.captured_image}`}
                        alt="Captured"
                        className="h-7 w-7 object-cover mx-auto rounded-full border border-gray-300"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td
                    onClick={() => triggerAttendanceModal(record.employee_id)}
                    className="p-2 whitespace-nowrap cursor-pointer hover:text-color-dark"
                  >
                    {record.current_month_count || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-300">
                  No attendance records available.
                </td>
              </tr>
            )}
            {/* <div className='w-full p-2'></div> */}
          </tbody>
        </table>
      </div>
      {lastPage > 1 && (
        <div className="bg-color-gray w-full py-2">
          <div className="flex phone:flex-row justify-center">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className={`px-1 py-1 phone:px-4 phone:py-2 border rounded ${
                currentPage === 1
                  ? "text-gray-400"
                  : "text-white hover:text-color-dark"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-300 text-xs phone:text-base">
              Page {currentPage} of {lastPage}
            </span>
            <button
              disabled={currentPage === lastPage}
              onClick={() => onPageChange(currentPage + 1)}
              className={`px-1 py-1 phone:px-4 phone:py-2 border rounded ${
                currentPage === lastPage
                  ? "text-gray-400"
                  : "text-white hover:text-color-dark"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* open Attendance Record modal */}
      {viewAttendance && (
        <AttendanceModal
          employeeData={employeeData}
          onClose={closeAttendanceModal}
        />
      )}

      {/* image view */}
      {viewImage && (
        <ImageViewModal imageUrl={imageDomain} onClose={closeImageModal} />
      )}
    </div>
  );
};

export default AttendanceTable;
