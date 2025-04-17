// import { div, h1 } from "framer-motion/client";
import React from "react";
import ImageOverlay from "./popup/ImageOverlay";
import VideoOverlay from "./popup/VideoOverlay";
const ImageViewer = ({ isVisible, imageSrc, type, onClose }) => {
  if (!isVisible) return null; // If not visible, return null to not render the modal

  if (!type) return null;

  if (type === 'web') {
    window.open(imageSrc, "_blank"); // Opens the web link in a new tab
    return null; // Return null to prevent further rendering since we already opened the tab
  }
  console.log(type)
  return (
    <>
      {type === "image" ? (
        <ImageOverlay imageSrc={imageSrc} onClose={onClose} />
      ) : type === "video" ? (
        <VideoOverlay imageSrc={imageSrc} onClose={onClose} />
      ) : null}
    </>
  );
};

export default ImageViewer;
