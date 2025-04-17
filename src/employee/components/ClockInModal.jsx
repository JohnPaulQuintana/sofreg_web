// components/ClockInModal.js
import React from "react";

const ClockInModal = ({ capturedImage, timeIn, dateToday, status, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
        <div className="bg-white p-6 rounded-lg w-3/12">
            <h2 className="text-xl font-bold mb-4">Clock-In Confirmation</h2>
            <img src={capturedImage} alt="Captured" className="w-full border rounded-lg mb-4" />
            <p><strong>Time In:</strong> {timeIn}</p>
            <p><strong>Date:</strong> {dateToday}</p>
            <p><strong>Status:</strong> {status}</p>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">Close</button>
        </div>
    </div>
);

export default ClockInModal;