(function () {
  function applyNicolePhotos() {
    var path = window.location.pathname;
    if (/\/about(?:\.html)?\/?$/.test(path)) {
      var aboutNicole = document.querySelector('.therapist-card img[src*="nicole-portrait"], .therapist-card img[src*="38-IMG_1797"]');
      if (aboutNicole) {
        aboutNicole.src = 'images/38-IMG_1797.jpg?v=20260925-facecrop';
        aboutNicole.style.setProperty('object-position', '50% 20%', 'important');
        aboutNicole.style.setProperty('transform', 'scale(1.32)', 'important');
        aboutNicole.style.setProperty('transform-origin', '50% 28%', 'important');
      }
    }
    if (/\/nicole(?:\.html)?\/?$/.test(path)) {
      var nicoleHero = document.querySelector('.therapist-photo img');
      if (nicoleHero) nicoleHero.src = 'images/64-IMG_2001.jpg';
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyNicolePhotos);
  else applyNicolePhotos();
})();