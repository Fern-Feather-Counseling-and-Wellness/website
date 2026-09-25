// Load the existing site behavior, then apply page-specific photo updates.
(function(){
  var core=document.createElement('script');
  core.src='/js/main-core.js?v=20260925';
  core.onload=function(){
    var photos=document.createElement('script');
    photos.src='/js/nicole-photo-overrides-fixed.js?v=20260925-facecrop-3';
    document.head.appendChild(photos);

    if(/(^|\/)about\.html$/.test(location.pathname)||location.pathname==='/about'){
      var nicole=document.querySelector('.therapist-preview .therapist-card:first-child .therapist-avatar img');
      if(nicole){nicole.src='/images/nick%20zoomed.jpg';nicole.style.transform='none';nicole.style.objectPosition='50% 50%';}
    }

    // Homepage: place the real Fern & Feather team photo directly below the hero.
    if(location.pathname==='/'||/(^|\/)index\.html$/.test(location.pathname)){
      var hero=document.querySelector('.hero');
      if(hero && !document.getElementById('home-team-photo')){
        var section=document.createElement('section');
        section.id='home-team-photo';
        section.setAttribute('aria-label','Fern & Feather team');
        section.style.cssText='padding:3rem 1.25rem 3.5rem;background:var(--cream,#faf8f3);text-align:center;';
        section.innerHTML='<div style="max-width:1000px;margin:0 auto;"><img src="/images/26-IMG_1727.jpg" alt="Fern & Feather Counseling and Wellness team outside the Cumming, Georgia office" loading="eager" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:var(--shadow-soft,0 10px 30px rgba(0,0,0,.10));"><div style="margin-top:1.25rem;"><h2 style="margin:0 0 .35rem;font-size:clamp(1.55rem,3vw,2.1rem);">Therapy with actual humans.</h2><p style="margin:0;color:var(--sage-600,#66735d);font-size:1.05rem;">In-person in Cumming, Georgia, and online throughout Georgia.</p></div></div>';
        hero.insertAdjacentElement('afterend',section);
      }
    }
  };
  document.head.appendChild(core);
})();
