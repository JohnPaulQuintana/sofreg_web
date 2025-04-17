import React, { useState, useEffect } from "react";
import Camera from "./Camera";
import ClockInModal from "./ClockInModal";
import Swal from "sweetalert2";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import AttendanceTable from "./AttendanceTable";

const EmployeeHeader = () => {
    const [capturedImage, setCapturedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [timeIn, setTimeIn] = useState("");
    const [timeOut, setTimeOut] = useState("");
    const [dateToday, setDateToday] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [attendanceData, setAttendanceData] = useState([]);

    // api url
    const insertAttendanceApi = `${import.meta.env.VITE_API_URL}/employee/clockin`;
    const updateAttendanceApi = `${import.meta.env.VITE_API_URL}/employee/clockout`;
    const fetchAttendanceApi = `${import.meta.env.VITE_API_URL}/employee/attendance-by-week`;

    const data = JSON.parse(localStorage.getItem("authentication")) || {};
    const alreadyClockin = JSON.parse(localStorage.getItem('attendance-save')) || {};

    console.log(alreadyClockin)
    useEffect(() => {
        const fetchInitialAttendance = async () => {
            console.log('Fetching initial attendance data...');
            try {
                const response = await axios.get(fetchAttendanceApi, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });
                console.log('Initial attendance data:', response.data);
                setAttendanceData(response.data);
            } catch (error) {
                console.error('Failed to fetch initial attendance:', error.response?.data || error.message);
            }
        };

        fetchInitialAttendance();
        // Enable pusher logging - remove this in production
        Pusher.logToConsole = true;

        const pusher = new Pusher('e353e3bea820d710bdc1', {
            cluster: 'us2',
            forceTLS: true,
            enabledTransports: ['ws', 'wss']
        });

        const channel = pusher.subscribe('attendance-channel');
        channel.bind('attendance-event', async (event) => {
            console.log('Attendance event received:', event);

            try {
                const response = await axios.get(fetchAttendanceApi, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });
                console.log('Updated attendance data:', response.data);
                setAttendanceData(response.data);
            } catch (error) {
                console.error('Failed to fetch updated attendance:', error);
            }

        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const handlePageChange = async (page) => {
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


    const handleCapture = async (imageData, type) => {
        setIsLoading(true);
        Swal.fire({
            title: `Submitting ${type === 'clockIn' ? 'Clock In' : 'Clock Out'} attendance...`,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const now = new Date();
        const time = now.toTimeString().split(' ')[0]; // Formats as HH:MM:SS
        const date = now.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
        const timeOfDutyStart = data.user.time_of_duty_start

        console.log(timeOfDutyStart)
        if (type === 'Clock-In') {
            setCapturedImage(imageData);
            setTimeIn(time);
            setDateToday(date);

            // const morningShiftEnd = new Date();
            // morningShiftEnd.setHours(9, 0, 0);
            // const currentStatus = now <= morningShiftEnd ? 'On Time' : 'Late';
            // Convert times to Date objects for comparison
            const dutyStart = new Date(`${date}T${timeOfDutyStart}`);
            const currentTime = new Date(`${date}T${time}`);

            const currentStatus = currentTime <= dutyStart ? 'On Time' : 'Late';

            setStatus(currentStatus);
        } else if (type === 'Clock-Out') {
            setTimeOut(time);
            setDateToday(date);
        }

        // Convert base64 image to file
        const byteString = atob(imageData.split(',')[1]);
        const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        const imageFile = new Blob([uint8Array], { type: mimeString });

        const formData = new FormData();
        formData.append('date', date);
        formData.append(type === 'Clock-In' ? 'time_in' : 'time_out', time);
        if (type === 'Clock-In') formData.append('status', status);
        formData.append('captured_image', imageFile, 'captured_image.png');

        try {
            const typeOfApi = type === 'Clock-In' ? insertAttendanceApi : updateAttendanceApi;
            const response = await axios.post(typeOfApi, formData, {
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire('Success', response.data.message, 'success');
            const clockInUpdates = {
                'ClockIn': type === 'Clock-In',
                'ClockOut': type === 'Clock-Out'
            };
            localStorage.setItem('attendance-save', JSON.stringify(clockInUpdates)); // Mark clock-in after capture
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
            console.log(error);
            // localStorage.setItem('attendance-save', false);
        } finally {
            setIsLoading(false); // Reset loading state
           
        }
    };


    return (
        <main className="main-bg">
            <section className="section-padding overflow-y-hidden">
                <div className="container mt-40 p-2 mobile:p-4 bg-color-gray-2 rounded-sm">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title mb-4">
                                <h2>Employee Dashboard</h2>
                                <p>Manage your attendance and clocking here</p>
                            </div>

                            <div className="py-2 rounded-sm grid grid-cols-1 desktop:grid-cols-4 desktop:gap-4">
                                <div className="left flex flex-col justify-start items-center col-span-1 p-4 w-full mb-2">
                                    <h1 className="desktop:text-xl font-bold">Clock-In | Clock-Out</h1>
                                    {/* <Camera onCapture={handleCapture} alreadyClockin={alreadyClockin}/>
                                     */}
                                    <Camera onCapture={(imageData, type) => {
                                        handleCapture(imageData, type);
                                        // if (!alreadyClockin) {
                                        //     localStorage.setItem('attendance-save', JSON.stringify(true)); // Mark clock-in after capture
                                        // }
                                    }} alreadyClockin={alreadyClockin} />


                                    <div className="p-2 w-full mt-1 flex flex-row desktop:flex-col gap-2 justify-start items-center">
                                        <span className="text-color-dark text-xs">Employee ID: <span className="text-base font-semibold text-white">{data.user?.employee_id}</span></span>
                                        <span className="text-color-dark text-sm">Name: <span className="text-base font-semibold text-white">{data.user?.name}</span></span>
                                        {/* <span>Name: {data.user?.name}</span> */}
                                    </div>

                                </div>
                                <div className="right bg-color-gray col-span-3 rounded-md">
                                    <AttendanceTable attendanceData={attendanceData} onPageChange={handlePageChange} tableTitle={"Weekly Attendance"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EmployeeHeader;
