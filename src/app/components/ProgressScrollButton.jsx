import React, { useEffect } from "react";

const ProgressScrollButton = () => {

  useEffect(() => {
    "use strict";

    const progressPath = document.querySelector('.progress-wrap path');
    const pathLength = progressPath ? progressPath.getTotalLength() : 0;
    
    if (pathLength !== 0) {
      progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
      progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
      
      const updateProgress = () => {
        const scroll = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
      };

      updateProgress();
      $(window).scroll(updateProgress);

      const offset = 150;
      const duration = 550;
      $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {
          $('.progress-wrap').addClass('active-progress');
        } else {
          $('.progress-wrap').removeClass('active-progress');
        }
      });

      $('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, duration);
        return false;
      });
    }
    
  }, []); // empty dependency array means this effect runs once after component mounts


  return (
    <div className="progress-wrap cursor-pointer">
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
};

export default ProgressScrollButton;
