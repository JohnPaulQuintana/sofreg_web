import React, {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditAccountModal from "./EditAccountModal";
const AccountTable = ({ accountData, onPageChange }) => {
    console.log(accountData)
    const data = accountData?.users?.data || [];
    const currentPage = accountData?.users?.current_page;
    const lastPage = accountData?.users?.last_page;

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [employee, setEmployeeData] = useState({})
    const [editModal, setEditModal] = useState(false)
    const closeEditAccountModal = () => setEditModal(false);

    const [searchTerm, setSearchTerm] = useState("");

    const editEmployeeUrlAPi = `${import.meta.env.VITE_API_URL}/admin/edit-employee`
    const deleteEmployeeApi = `${import.meta.env.VITE_API_URL}/admin/delete-employee`;

    const editEmployee = async (emp_id) => {
        // alert(emp_id)
        try {
            const data = JSON.parse(localStorage.getItem("authentication")) || {};
            const response = await axios.post(editEmployeeUrlAPi, {employeeId: emp_id}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
            });
            console.log("Employee data:", response.data);
            setEmployeeData(response.data)
            setEditModal(true)
            // onClose();
        } catch (error) {
            console.error("Error adding employee:", error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            // setLoading(false);
           
        }

        // console.log(employee)
    }

    const handleDelete = async (emp_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1E1D1D",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const authData = JSON.parse(localStorage.getItem("authentication")) || {};
                    await axios.post(deleteEmployeeApi,{'employee_id':emp_id}, {
                        headers: {
                            Authorization: `Bearer ${authData.token}`,
                        },
                    });
                    Swal.fire(
                        "Deleted!",
                        "Employee account has been deleted.",
                        "success"
                    ).then(() => {
                        // window.location.reload();
                        console.log('success!')
                    });
                } catch (error) {
                    console.error("Error deleting employee:", error);
                    Swal.fire(
                        "Error!",
                        "Failed to delete employee account.",
                        "error"
                    );
                }
            }
        });
    };

    // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      // console.log(item)
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            <div className="flex-grow overflow-x-scroll overflow-y-hidden w-full bg-gray">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Employee ID</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Address</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Contact No.</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Department</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Position</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-color-dark uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((record, index) => (
                                <tr key={record.id} className={`text-center ${index % 2 === 0 ? 'bg-gray-400' : ''}`}>
                                    <td className="p-2 whitespace-nowrap font-bold">{record.employee_id}</td>
                                    <td className="p-2 whitespace-nowrap">{record.name}</td>
                                    <td className="p-2 whitespace-nowrap">{record.address}</td>
                                    <td className="p-2 whitespace-nowrap">{record.contact_no}</td>
                                    <td className="p-2 whitespace-nowrap">{record.department}</td>
                                    <td className="p-2 whitespace-nowrap">{record.position}</td>
                                    <td className="flex gap-2 items-center justify-center p-2 whitespace-nowrap">
                                        <button onClick={()=>editEmployee(record.employee_id)} type="button" className="text-xs bg-color-dark rounded-sm p-1">Edit</button>
                                        <button onClick={()=>handleDelete(record.employee_id)} type="button" className="text-xs bg-red-500 rounded-sm p-1">Delete</button>
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
                            className={`px-1 py-1 phone:px-4 phone:py-2 border rounded ${currentPage === 1 ? 'text-gray-400' : 'text-white hover:text-color-dark'}`}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-gray-300 text-xs phone:text-base">Page {currentPage} of {lastPage}</span>
                        <button
                            disabled={currentPage === lastPage}
                            onClick={() => onPageChange(currentPage + 1)}
                            className={`px-1 py-1 phone:px-4 phone:py-2 border rounded ${currentPage === lastPage ? 'text-gray-400' : 'text-white hover:text-color-dark'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* edit modal */}
            {editModal && (
                <EditAccountModal data={employee} onClose={closeEditAccountModal}/>
            )}
        </div>
    )
}

export default AccountTable;