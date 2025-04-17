import React, { useRef, useEffect, useState } from "react";

const Camera = ({ onCapture, alreadyClockin }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera: ", error);
            }
        };

        if (cameraActive) {
            startCamera();
        } else if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }, [cameraActive]);

    const startCountdown = async (type) => {
        // alert(type)
        setCountdown(6);
        setCameraActive(true);

        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    captureImage(type);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const captureImage = (type) => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video && video.srcObject) {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/png");
            onCapture(imageData, type);
            setTimeout(() => setCameraActive(false), 1000);
        }
    };

    return (
        <div className="camera-container">
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-2 flex justify-center items-center relative h-44 desktop:h-52">
                {countdown > 0 && <div className="absolute text-6xl text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg">{countdown}</div>}
                <video ref={videoRef} autoPlay className={`w-full rounded-lg ${cameraActive ? '' : 'opacity-0'}`} />
                <span className={`absolute text-gray-400 font-bold tracking-wide ${cameraActive ? 'hidden' : 'block'}`}>Camera Deactivate</span>
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            
            <div className="flex flex-col desktop:flex-row justify-center gap-1">
                <button onClick={() => startCountdown('Clock-In')} className={`${alreadyClockin.ClockIn ? "bg-slate-400" : "bg-green-500"} px-2 text-white desktop:px-4 py-2 rounded-lg mt-2 w-full`} disabled={alreadyClockin.ClockIn}>Clock In</button>
                <button onClick={() => startCountdown('Clock-Out')} className={`${alreadyClockin.ClockOut ? "bg-slate-400" : "bg-red-500"} px-2 text-white desktop:px-4 py-2 rounded-lg mt-2 w-full`} disabled={alreadyClockin.ClockOut}>Clock Out</button>
            </div>
        </div>
    );
};

export default Camera;
