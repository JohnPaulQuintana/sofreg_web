import React from "react";

const BouncingText = ({ text }) => {
    return (
      <div className="bouncing-text">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="bouncing-letter text-2xl font-semibold tracking-wider"
            style={{ animationDelay: `${index * 0.1}s` }} // Add delay for each letter
          >
            {char}
          </span>
        ))}
      </div>
    );
  };

  export default BouncingText;