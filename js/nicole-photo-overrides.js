document.addEventListener('DOMContentLoaded', function () {
  var path = window.location.pathname;

  if (/\/about\.html$/.test(path)) {
    var aboutNicole = document.querySelector('.therapist-card img[src*="nicole-portrait"]');
    if (aboutNicole) aboutNicole.src = 'images/38-IMG_1797.jpg';
  }

  if (/\/nicole\.html$/.test(path)) {
    var nicoleHero = document.querySelector('.therapist-photo img');
    if (nicoleHero) nicoleHero.src = 'images/64-IMG_2001.jpg';

    var ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.content = 'https://fernandfeathercounseling.com/images/64-IMG_2001.jpg';
  }
});
