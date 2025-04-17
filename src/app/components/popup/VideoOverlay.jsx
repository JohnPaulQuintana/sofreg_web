import React from "react";

const VideoOverlay = ({ imageSrc, onClose }) => {
    // console.log(imageSrc)
    return (
        <>
            <div id="video-overlay"></div>
            <div id="video-dialog">
                <span id="video-dialog-close" onClick={onClose}>✖</span>
                <iframe id="video-iframe" src={imageSrc} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                <div id="label-text" className="hidden h-[80vh] flex items-center flex-col justify-center gap-2">
                    <i className="fa-light fa-circle-exclamation text-5xl text-red-500"></i>
                    <span className="text-white">The video is currently unavailable. Please try again later.</span>

                </div>
            </div>
        </>
    )
}

export default VideoOverlay 