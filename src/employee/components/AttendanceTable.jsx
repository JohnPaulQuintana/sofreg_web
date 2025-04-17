import React, {useState} from "react";

const AttendanceTable = ({ attendanceData, onPageChange,tableTitle }) => {
  const data = attendanceData?.attendance?.data || [];
  const currentPage = attendanceData?.attendance?.current_page;
  const lastPage = attendanceData?.attendance?.last_page;
  const [searchTerm, setSearchTerm] = useState("");

  const formatTime = (time) => {
    if (!time) return "N/A";

    const [hour, minute] = time.split(":");
    const hours = parseInt(hour, 10);
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;

    return `${formattedHour}:${minute} ${suffix}`;
  };

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      // console.log(item)
    //   item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col w-full">
      <div className="flex flex-col phone:flex-row justify-between mt-1 p-2 px-4">
        <h1>{tableTitle}</h1>
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
                  <td className="p-2 whitespace-nowrap">{record.date}</td>
                  <td className="p-2 whitespace-nowrap">
                    {formatTime(record.clock_in)}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {formatTime(record.clock_out) || "N/A"}
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
                  <td className="p-2 whitespace-nowrap">
                    {record.captured_image ? (
                      <img
                        src={`http://127.0.0.1:8001/api/storage/${record.captured_image}`}
                        alt="Captured"
                        className="h-7 w-7 object-cover mx-auto rounded-full border border-gray-300"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
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
            {/* <div className="w-full p-2"></div> */}
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
    </div>
  );
};

export default AttendanceTable;
