import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceTable from "./AttendanceTable";

const RecordTable = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAttendanceApi = `${import.meta.env.VITE_API_URL}/employee/attendance-by-all`;
    const data = JSON.parse(localStorage.getItem("authentication")) || {};

    // Fetch attendance data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(fetchAttendanceApi, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });
                setAttendanceData(response.data);
            } catch (error) {
                console.error("Failed to fetch attendance data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures it runs only on mount

    // Handle pagination
    const handlePageChange2 = async (page) => {
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

    return (
        <main className="main-bg">
            <section className="section-padding overflow-y-hidden">
                <div className="container mt-40 p-2 mobile:p-4 bg-color-gray-2 rounded-sm">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title mb-4">
                                <h2>Employee Attendance Record</h2>
                                <p>Your attendance and clocking records.</p>
                            </div>

                            <div className="py-2 rounded-sm">
                                <div className="right bg-color-gray rounded-md">
                                    {loading ? (
                                        <p>Loading...</p> // Show loading message until data is fetched
                                    ) : (
                                        <AttendanceTable 
                                            attendanceData={attendanceData} 
                                            onPageChange={handlePageChange2} 
                                            tableTitle={"Attendance Records"}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RecordTable;
