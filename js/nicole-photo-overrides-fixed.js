(function () {
  function applyNicolePhotos() {
    var path = window.location.pathname;
    if (/\/about(?:\.html)?\/?$/.test(path)) {
      var aboutNicole = document.querySelector('.therapist-card img[src*="nicole-portrait"]');
      if (aboutNicole) {
        aboutNicole.src = 'images/38-IMG_1797.jpg';
        aboutNicole.style.objectPosition = 'center 18%';
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