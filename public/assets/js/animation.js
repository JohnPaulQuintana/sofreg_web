$(document).ready(function () {
  function fitElementToParent(el, padding) {
    let timeout = null;
    const minScale = 0.8; // Set a minimum scale to prevent the element from being too small

    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, { scale: 1 }); // Reset the scale to calculate the ratio
      const pad = padding || 0;
      const parentEl = el.parentNode;
      const elOffsetWidth = el.offsetWidth - pad;
      const parentOffsetWidth = parentEl.offsetWidth;
      const ratio = Math.max(parentOffsetWidth / elOffsetWidth, minScale); // Ensure the scale is at least minScale
      timeout = setTimeout(() => anime.set(el, { scale: ratio }), 10);
    }

    resize();
    window.addEventListener("resize", resize);
  }


  var sphereAnimation = (function () {

    try {
      // const elements = document.querySelectorAll('.some-class');
      var sphereEl = document.querySelector('.sphere-animation');
      var spherePathEls = sphereEl.querySelectorAll('.sphere path');
      var pathLength = spherePathEls.length;

      var hasStarted = false;
      var aimations = [];

      fitElementToParent(sphereEl);

      var breathAnimation = anime({
        begin: function () {
          for (var i = 0; i < pathLength; i++) {
            aimations.push(anime({
              targets: spherePathEls[i],
              stroke: { value: ['rgba(0, 0, 255, 1)', 'rgba(80,80,80,.35)'], duration: 500 },
              translateX: [2, -4],
              translateY: [2, -4],
              easing: 'easeOutQuad',
              autoplay: false
            }));
          }
        },
        update: function (ins) {
          aimations.forEach(function (animation, i) {
            var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
            animation.seek(animation.duration * percent);
          });
        },
        duration: Infinity,
        autoplay: false
      });

      var introAnimation = anime.timeline({
        autoplay: false
      })
        .add({
          targets: spherePathEls,
          strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 3900,
            easing: 'easeInOutCirc',
            delay: anime.stagger(190, { direction: 'reverse' })
          },
          duration: 2000,
          delay: anime.stagger(60, { direction: 'reverse' }),
          easing: 'linear'
        }, 0);

      var shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false
      }, 0);

      function init() {
        introAnimation.play();
        breathAnimation.play();
        shadowAnimation.play();
      }

      init();
      // Your logic here to work with the elements
    } catch (error) {
      // console.log("Sphere: ", error.message);
      // Optionally, handle the error (e.g., show a message to the user or log it)
    }



  })();
})