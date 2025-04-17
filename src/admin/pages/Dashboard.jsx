import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AccountTable from "../components/AccountTable";
import JobTable from "../components/JobsTable";
import AccountModal from "../components/AccountModal";
import JobModal from "../components/JobModal";

import Pusher from "pusher-js";
import axios from "axios";
import AttendanceTable from "../components/AttendanceTable";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AttendanceTodayTable from "../components/AttendanceTodayTable";

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState(()=>{
        return localStorage.getItem('active-session') || 'dashboard';
    });
    const [employeeAccountModal, setEmployeeAccountModal] = useState(false);
    const [jobPostingModal, setJobPostingModal] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [attendanceDataToday, setAttendanceDataToday] = useState([]);
    const [summaryReport, setSummaryReport] = useState({})
    const fetchEmployeeApi = `${import.meta.env.VITE_API_URL}/admin/employee-account`
    const fetchAttendanceApi = `${import.meta.env.VITE_API_URL}/admin/employee-attendance`
    const fetchExportAttendanceApi = `${import.meta.env.VITE_API_URL}/admin/export-attendance`
    const fetchSummaryApi = `${import.meta.env.VITE_API_URL}/admin/summary`
    const fetchJobApi = `${import.meta.env.VITE_API_URL}/admin/jobs`
    const data = JSON.parse(localStorage.getItem("authentication")) || {};

    const openAccountModal = () => setEmployeeAccountModal(true);
    const closeAccountModal = () => setEmployeeAccountModal(false);

    const openJobModal = () => setJobPostingModal(true);
    const closeJobModal = () => setJobPostingModal(false);

    useEffect(() => {
        if (!activeSection) return; // Only run when activeSection is set

        const fetchSumaryData = async () => {
            try {
                console.log('Fetching initial summary data...');
                const response = await axios.get(fetchSummaryApi, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });
                console.log('Initial summary data:', response.data);
                // setEmployeeData(response.data);
                setSummaryReport(response.data)
            } catch (error) {
                console.error(`Failed to fetch ${activeSection.toLowerCase()} data:`, error.response?.data || error.message);
            }
        };

        const fetchInitialData = async () => {
            try {
                if (activeSection === 'account') {
                    console.log('Fetching initial employee data...');
                    const response = await axios.get(fetchEmployeeApi, {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
                    console.log('Initial employee data:', response.data);
                    setEmployeeData(response.data);
                } else if (activeSection === 'attendance' || activeSection === 'dashboard') {
                    console.log('Fetching initial admin attendance data...');
                    const response = await axios.get(fetchAttendanceApi, {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
                    console.log('Initial attendance data:', response.data);
                    setAttendanceData(response.data);
                    setAttendanceDataToday(response.data);
                }
            } catch (error) {
                console.error(`Failed to fetch ${activeSection.toLowerCase()} data:`, error.response?.data || error.message);
            }
        };

        const fetchJobData = async () => {
            try {
                console.log('Fetching initial jobs data...');
                const responsejobs = await axios.get(fetchJobApi, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });
                console.log('Initial jobs data:', responsejobs.data);
                // setEmployeeData(response.data);
                setJobData(responsejobs.data)
            } catch (error) {
                console.error(`Failed to fetch ${activeSection.toLowerCase()} data:`, error.responsejobs?.data || error.message);
            }
        };

        fetchInitialData();
        fetchSumaryData();
        fetchJobData();
        // Enable pusher logging - remove this in production
        Pusher.logToConsole = true;

        const pusher = new Pusher('e353e3bea820d710bdc1', {
            cluster: 'us2',
            forceTLS: true,
            enabledTransports: ['ws', 'wss']
        });

        let channel;
        if (activeSection === 'account') {
            channel = pusher.subscribe('employee-channel');
            channel.bind('employee-event', async (event) => {
                console.log('Employee event received:', event);

                try {
                    const response = await axios.get(fetchEmployeeApi, {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
                    console.log('Updated employee data:', response.data);
                    setEmployeeData(response.data);
                } catch (error) {
                    console.error('Failed to fetch updated employee data:', error);
                }
            });
        } else if (activeSection === 'attendance' || activeSection === 'dashboard') {
            channel = pusher.subscribe('admin-attendance-channel');
            channel.bind('admin-attendance-event', async (event) => {
                console.log('Admin Attendance event received:', event);

                try {
                    const response = await axios.get(fetchAttendanceApi, {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
                    console.log('Updated Admin attendance data:', response.data);
                    setAttendanceData(response.data);
                    setAttendanceDataToday(response.data);
                } catch (error) {
                    console.error('Failed to fetch updated admin attendance data:', error);
                }
            });
        }

        return () => {
            if (channel) {
                channel.unbind_all();
                channel.unsubscribe();
            }
        };
    }, [activeSection]);

    // for employee accounts
    const handlePageChangeEmployeeAccount = async (page) => {
        try {

            const response = await axios.get(`${fetchEmployeeApi}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });
            setEmployeeData(response.data);
        } catch (error) {
            console.error('Failed to fetch paginated data:', error);
        }
    };
    // for employee attendance
    const handlePageChangeEmployeeAttendance = async (page) => {
        try {

            const response = await axios.get(`${fetchAttendanceApi}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });
            setAttendanceData(response.data);
        } catch (error) {
            console.error('Failed to fetch paginated data:', error);
        }
    };
    // for jobs 
    const handlePageChangeJobs = async (page) => {
        try {

            const response = await axios.get(`${fetchJobApi}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });
            setJobData(response.data);
        } catch (error) {
            console.error('Failed to fetch paginated data:', error);
        }
    };

    //export attendance data to excel
    const exportAttendanceToExcel = async () => {
        try {
            const response = await axios.get(fetchExportAttendanceApi, {
                headers: { 'Authorization': `Bearer ${data.token}` }
            });

            console.log('Exported attendance data:', response.data);
            const attendanceData = response.data.employee_attendance.map(item => ({
                EmployeeID: item.employee_id,
                EmployeeName: item.user.name,
                Department: item.user.department,
                Position: item.user.position,
                Date: item.date,
                ClockIn: item.clock_in,
                ClockOut: item.clock_out,
                Status: item.status,
            }));

            const worksheet = XLSX.utils.json_to_sheet(attendanceData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

            const today = new Date();
            const month = today.toLocaleString('default', { month: 'long' });
            const day = today.getDate();
            const year = today.getFullYear();

            const fileName = `EmployeeAttendance_${month}_${day}_${year}.xlsx`;
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(blob, fileName);
        } catch (error) {
            console.error('Failed to fetch and export attendance:', error);
        }
    };

    // console.log("Active Section", activeSection);
    const renderContent = () => {
        console.log("Rendering content for:", activeSection);
        switch (activeSection) {
            case "account":
                return (
                    <div className="">
                        <div className="flex flex-col tablet:flex-row tablet:items-center justify-between">
                            <div>
                                <h1 className="text-xl tablet:text-2xl font-bold">Employee Account Management</h1>
                                <p>Manage your employees account here.</p>

                            </div>
                            <div>
                                <button onClick={openAccountModal} type="button" className="border p-1">Add Employee</button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <AccountTable accountData={employeeData} onPageChange={handlePageChangeEmployeeAccount} />
                        </div>
                    </div>
                );
            case "jobs":
                return (
                    <div className="">
                        <div className="flex flex-col tablet:flex-row tablet:items-center justify-between">
                            <div>
                                <h1 className="text-xl tablet:text-2xl font-bold">Job Posting Management</h1>
                                <p>Manage your job postings here.</p>

                            </div>
                            <div>
                                <button onClick={openJobModal} type="button" className="border p-1">Create Job</button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <JobTable jobData={jobData} onPageChange={handlePageChangeJobs} />
                        </div>
                    </div>
                );
            case "attendance":
                return (
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">Attendance Tracking</h1>
                                <p>Track employee attendance based on montly.</p>
                            </div>
                            <button type="button" className="border p-1 rounded-sm" onClick={exportAttendanceToExcel}>Export Excell</button>
                        </div>
                        <AttendanceTable attendanceData={attendanceData} onPageChange={handlePageChangeEmployeeAttendance} />
                    </div>
                );
            default:
                return (
                    <div className="max-h-[90vh] overflow-y-scroll">
                        <h1 className="text-xl tablet:text-2xl font-bold">Employee Management Dashboard</h1>
                        <p>This is where your content goes!</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                            <div className="flex flex-col items-center justify-center p-2 tablet:p-4 rounded-md bg-gray-800">
                                <h1 className="font-bold text-4xl">{summaryReport.total_employees}</h1>
                                <span className="text-xs tablet:text-base">Total Employee</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2 tablet:p-4 rounded-md bg-gray-800">
                                <h1 className="font-bold text-4xl">{summaryReport.absent_employees}</h1>
                                <span className="text-xs tablet:text-base">Absent Employee</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2 tablet:p-4 rounded-md bg-gray-800">
                                <h1 className="font-bold text-xl text-red-500">{summaryReport.most_late_employee}</h1>
                                <span className="text-xs tablet:text-base">Most Late Employee</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2 tablet:p-4 rounded-md bg-gray-800">
                                <h1 className="font-bold text-4xl">{summaryReport.no_absent_record}</h1>
                                <span className="text-xs tablet:text-base">No Absent Record</span>
                            </div>
                        </div>
                        <div className="mt-2 bg-gray-800 p-4 rounded-md h-screen">
                            <h1>Today Attendance History</h1>
                            {/* for today only */}
                            <AttendanceTodayTable attendanceData={attendanceDataToday} onPageChange={handlePageChangeEmployeeAttendance} />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex">
            <Sidebar onSectionClick={setActiveSection} />
            <div className="flex-grow p-2 max-h-[90vh] w-full">
                <div key={activeSection} className="flex-1 bg-color-gray p-2 p-3 tablet:p-4 max-w-full h-[97vh]">
                    {renderContent()}
                </div>
            </div>

            {/* Add Employee Account Modal */}
            {employeeAccountModal && <AccountModal onClose={closeAccountModal} />}
            {jobPostingModal && <JobModal onClose={closeJobModal} />}
        </div>
    );
};

export default AdminDashboard;