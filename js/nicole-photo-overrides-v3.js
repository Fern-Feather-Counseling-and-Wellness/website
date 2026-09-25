(function () {
  function applyNicolePhotos() {
    var path = window.location.pathname;
    if (/\/about(?:\.html)?\/?$/.test(path)) {
      var aboutNicole = document.querySelector('.therapist-card img[src*="nicole-portrait"], .therapist-card img[src*="38-IMG_1797"]');
      if (aboutNicole) {
        aboutNicole.src = 'images/38-IMG_1797.jpg';
        aboutNicole.style.objectPosition = '50% 18%';
        aboutNicole.style.transform = 'scale(1.20)';
        aboutNicole.style.transformOrigin = '50% 30%';
      }
    }
    if (/\/nicole(?:\.html)?\/?$/.test(path)) {
      var nicoleHero = document.querySelector('.therapist-photo img');
      if (nicoleHero) {
        nicoleHero.src = 'images/64-IMG_2001.jpg';
        nicoleHero.style.objectPosition = '50% 18%';
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyNicolePhotos);
  else applyNicolePhotos();
})();
