// Load the existing site behavior, then apply site-wide consistency updates.
(function(){
  var core=document.createElement('script');
  core.src='/js/main-core.js?v=20260925';
  core.onload=function(){
    var photos=document.createElement('script');
    photos.src='/js/nicole-photo-overrides-fixed.js?v=20260925-facecrop-3';
    document.head.appendChild(photos);

    document.querySelectorAll('.site-nav .nav-links').forEach(function(nav){
      var hasJoin=Array.prototype.some.call(nav.querySelectorAll('a'),function(a){return /join-our-team\.html(?:$|[?#])/.test(a.getAttribute('href')||'') || (a.textContent||'').trim().toLowerCase()==='join us';});
      if(!hasJoin){var li=document.createElement('li');li.className='nav-join-us';li.innerHTML='<a href="/join-our-team.html">Join Us</a>';var consult=Array.prototype.find.call(nav.children,function(item){var a=item.querySelector&&item.querySelector('a');return a && /contact\.html(?:$|[?#])/.test(a.getAttribute('href')||'');});nav.insertBefore(li,consult||null);}
    });

    if(/(^|\/)about\.html$/.test(location.pathname)||location.pathname==='/about'){
      var nicole=document.querySelector('.therapist-preview .therapist-card:first-child .therapist-avatar img');
      if(nicole){nicole.src='/images/nick%20zoomed.jpg';nicole.style.transform='none';nicole.style.objectPosition='50% 50%';}
    }

    if(/(^|\/)connie\.html$/.test(location.pathname)||location.pathname==='/connie'){
      var placeholder=document.querySelector('.therapist-photo .photo-placeholder');
      if(placeholder){var img=document.createElement('img');img.src='/images/1000002526.jpg';img.alt='Connie Wei, Associate Professional Counselor';img.className='therapist-portrait';img.style.cssText='width:100%;border-radius:15px;display:block;';placeholder.replaceWith(img);}
      var sections=document.querySelectorAll('section');
      sections.forEach(function(section){
        var heading=section.querySelector('h2');
        if(heading && /rate|payment|investment/i.test(heading.textContent||'')){
          var box=section.querySelector('.approach-section') || section.querySelector('[style*="max-width"]') || section.querySelector('.container');
          if(box){box.innerHTML='<div class="section-header"><h2>Rates & Payment</h2></div><div style="max-width:700px;margin:0 auto;text-align:center;background:white;padding:2.5rem;border-radius:20px;box-shadow:var(--shadow-soft);"><h3>$135 per session</h3><p>Connie is a private-pay clinician and does not bill insurance.</p><p><strong>Reduced-fee sessions are available from $70–$135</strong> based on financial need and availability. A limited number of sliding-scale spots are available.</p><a href="/contact.html" class="btn btn-primary">Schedule a Consultation</a></div>';}
        }
      });
    }

    if(location.pathname==='/'||/(^|\/)index\.html$/.test(location.pathname)){
      var hero=document.querySelector('.hero');
      if(hero && !document.getElementById('home-team-photo')){var section=document.createElement('section');section.id='home-team-photo';section.setAttribute('aria-label','Fern & Feather team');section.style.cssText='padding:3rem 1.25rem 3.5rem;background:var(--cream,#faf8f3);text-align:center;';section.innerHTML='<div style="max-width:1000px;margin:0 auto;"><img src="/images/26-IMG_1727.jpg" alt="Fern & Feather Counseling and Wellness team outside the Cumming, Georgia office" loading="eager" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:var(--shadow-soft,0 10px 30px rgba(0,0,0,.10));"><div style="margin-top:1.25rem;"><h2 style="margin:0 0 .35rem;font-size:clamp(1.55rem,3vw,2.1rem);">Therapy with actual humans.</h2><p style="margin:0;color:var(--sage-600,#66735d);font-size:1.05rem;">In-person in Cumming, Georgia, and online throughout Georgia.</p></div></div>';hero.insertAdjacentElement('afterend',section);}
    }
  };
  document.head.appendChild(core);
})();
