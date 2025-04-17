import React from "react";

const ImageOverlay = ({ imageSrc, onClose }) => {
    return (
        <div
            id="image-viewer"
            className="fixed overflow-x-hidden inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center zoomout"
        >
            <div className="relative p-4 pl-6 rounded-lg">
                <span
                    id="preview-close"
                    className="absolute top-2 right-2 md:top-10 md:right-10 lg:top-15 lg:right-20 text-white text-5xl cursor-pointer hover:text-red-500"
                    onClick={onClose}
                >
                    &times;
                </span>
                <img
                    id="full-image"
                    src={imageSrc}
                    className="w-full h-auto rounded-lg object-cover"
                    alt="Full Image"
                />
            </div>
        </div>
    )
}

export default ImageOverlay