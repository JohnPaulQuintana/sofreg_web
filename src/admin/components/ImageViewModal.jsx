import React from "react";

const ImageViewModal = ({imageUrl, onClose}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-color-dark p-4 rounded-lg max-w-[80%] max-h-screen relative">
                <img src={imageUrl} alt="Captured" className="max-w-full max-h-[70vh]" />
                <div className="text-right mt-4 absolute top-0 right-6">
                    <button onClick={onClose} className=" text-red-500 px-4 py-2 rounded-md font-bold text-xl">X</button>
                </div>
            </div>
        </div>
    );
}

export default ImageViewModal