// Loads the existing site behavior, then applies page-specific Nicole photo selections.
(function () {
  var core = document.createElement('script');
  core.src = '/js/main-core.js?v=20260925';
  core.onload = function () {
    var photos = document.createElement('script');
    photos.src = '/js/nicole-photo-overrides.js?v=20260925-2';
    document.head.appendChild(photos);
  };
  document.head.appendChild(core);
})();
