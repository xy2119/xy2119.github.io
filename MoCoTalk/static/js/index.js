document.addEventListener('DOMContentLoaded', function () {
  // Result carousels: one sample (one row of methods) per slide.
  if (window.bulmaCarousel) {
    bulmaCarousel.attach('.results-carousel', {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      pagination: true,
      navigation: true
    });
    // Move the arrows out of the slide area so they don't cover the first
    // and last columns of each clip.
    document.querySelectorAll('.results-carousel').forEach(function (c) {
      c.querySelectorAll('.slider-navigation-previous, .slider-navigation-next')
        .forEach(function (nav) { c.appendChild(nav); });
    });
  }

  // Only decode videos that are on screen; carousel slides outside the
  // visible one are clipped by overflow and get paused.
  var videos = document.querySelectorAll('video');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    videos.forEach(function (v) { io.observe(v); });
  }

  // Copy BibTeX.
  var btn = document.querySelector('.copy-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var text = document.getElementById('bibtex').innerText;
      var label = btn.querySelector('.copy-label');
      var done = function () {
        label.textContent = 'Copied';
        setTimeout(function () { label.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (err) {}
        document.body.removeChild(ta);
      }
    });
  }
});
