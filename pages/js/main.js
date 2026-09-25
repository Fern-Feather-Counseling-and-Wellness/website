/**
 * Consultation buttons on non-Nicole pages link to contact.html
 * (the consultation page with Calendly inline widget + contact form).
 * Nicole's page has its own embedded Calendly inline widget.
 */

// Site-wide deployed navigation consistency.
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.site-nav .nav-links').forEach(function(nav) {
    var about = Array.prototype.find.call(nav.querySelectorAll('.dropdown'), function(item) {
      var first = item.querySelector('a');
      return first && /about\.html(?:$|[?#])/.test(first.getAttribute('href') || '');
    });
    if (about) {
      var menu = about.querySelector('.dropdown-menu');
      if (menu) {
        var hasConnie = Array.prototype.some.call(menu.querySelectorAll('a'), function(a) {
          return /connie\.html(?:$|[?#])/.test(a.getAttribute('href') || '') || (a.textContent || '').trim().toLowerCase() === 'connie';
        });
        if (!hasConnie) {
          var connie = document.createElement('li');
          connie.innerHTML = '<a href="/connie.html">Connie</a>';
          var kiera = Array.prototype.find.call(menu.children, function(item) {
            var a = item.querySelector && item.querySelector('a');
            return a && /kiera\.html(?:$|[?#])/.test(a.getAttribute('href') || '');
          });
          if (kiera && kiera.nextSibling) menu.insertBefore(connie, kiera.nextSibling); else menu.appendChild(connie);
        }
      }
    }

    var hasJoin = Array.prototype.some.call(nav.querySelectorAll('a'), function(a) {
      return /join-our-team\.html(?:$|[?#])/.test(a.getAttribute('href') || '') || (a.textContent || '').trim().toLowerCase() === 'join us';
    });
    if (!hasJoin) {
      var join = document.createElement('li');
      join.innerHTML = '<a href="/join-our-team.html">Join Us</a>';
      var consult = Array.prototype.find.call(nav.children, function(item) {
        var a = item.querySelector && item.querySelector('a');
        return a && /contact\.html(?:$|[?#])/.test(a.getAttribute('href') || '');
      });
      nav.insertBefore(join, consult || null);
    }
  });
});

/**
 * Fern & Feather - Mobile Nav Fix
 * Dynamically adds hamburger button if missing, handles toggle
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Mobile nav fix loading...');
  const nav = document.querySelector('.site-nav, nav');
  if (!nav) return;
  let hamburger = nav.querySelector('.mobile-menu-btn');
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = 'border:0;background:transparent;font-size:24px;cursor:pointer;margin-left:auto;';
    const navLinks = nav.querySelector('.nav-links');
    if (navLinks) nav.insertBefore(hamburger, navLinks); else nav.appendChild(hamburger);
  }
  hamburger.onclick = function(e) {
    e.preventDefault(); e.stopPropagation();
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('mobile-open') ? 'true' : 'false');
    }
  };
});

const style = document.createElement('style');
style.textContent = `@media(max-width:999px){.nav-links{display:none!important}.mobile-menu-btn{display:inline-block!important}.nav-links.mobile-open{display:flex!important;flex-direction:column;position:absolute;top:60px;left:0;right:0;background:#fff;padding:20px;box-shadow:0 4px 10px rgba(0,0,0,.2)}.dropdown-menu{position:static!important;box-shadow:none!important;opacity:1!important;visibility:visible!important;transform:none!important}.dropdown.active .dropdown-menu{display:block!important}}`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      var parent=this.parentElement;if(parent&&parent.classList.contains('dropdown')){e.preventDefault();parent.classList.toggle('active');}
    });
  });
});

// FAQ accordion
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.faq-question').forEach(function(question) {
    const faqItem=question.parentElement; const answer=faqItem?faqItem.querySelector('.faq-answer'):null;
    if(question.tagName!=='BUTTON'){question.setAttribute('role','button');question.setAttribute('tabindex','0');}
    if(answer&&!answer.id) answer.id='faq-answer-'+Math.random().toString(36).slice(2,10);
    if(answer){question.setAttribute('aria-controls',answer.id);question.setAttribute('aria-expanded',faqItem.classList.contains('active')?'true':'false');answer.hidden=!faqItem.classList.contains('active');}
    const toggleFaq=function(){if(!faqItem)return;faqItem.classList.toggle('active');if(answer){const expanded=faqItem.classList.contains('active');question.setAttribute('aria-expanded',expanded?'true':'false');answer.hidden=!expanded;}};
    question.addEventListener('click',toggleFaq);if(question.tagName!=='BUTTON')question.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleFaq();}});
  });
});

function getSiteRootPrefix(){var path=window.location.pathname.replace(/\/+$/,'');if(!path)return '';var segments=path.split('/').filter(Boolean);if(!segments.length)return '';var last=segments[segments.length-1];var depth=last.indexOf('.')!==-1?segments.length-1:segments.length;return '../'.repeat(depth);}
function buildServiceLinks(prefix){return [{href:prefix+'services/',label:'View All Services'},{href:prefix+'services/anxiety-therapy/',label:'Anxiety Therapy'},{href:prefix+'services/ocd-therapy/',label:'OCD Therapy'},{href:prefix+'services/trauma-therapy/',label:'Trauma Therapy'},{href:prefix+'services/couples-therapy/',label:'Couples Therapy'},{href:prefix+'services/group-therapy/',label:'Group Therapy'}];}
document.addEventListener('DOMContentLoaded',function(){var prefix=getSiteRootPrefix(),serviceLinks=buildServiceLinks(prefix);document.querySelectorAll('.site-nav .nav-links > li > a').forEach(function(link){var navLabel=link.textContent.replace(/[▾▼]/g,'').trim();if(navLabel!=='Services')return;var listItem=link.parentElement;if(!listItem)return;listItem.classList.add('dropdown');link.classList.add('dropdown-toggle');link.setAttribute('href',serviceLinks[0].href);link.textContent='Services ▾';if(listItem.querySelector('.dropdown-menu'))return;var menu=document.createElement('ul');menu.className='dropdown-menu';menu.setAttribute('role','menu');serviceLinks.forEach(function(item,index){var li=document.createElement('li'),a=document.createElement('a');a.href=item.href;a.textContent=item.label;if(index===0)a.style.fontWeight='700';li.appendChild(a);menu.appendChild(li);});listItem.appendChild(menu);});document.querySelectorAll('.footer-column').forEach(function(column){var heading=column.querySelector('h4'),list=column.querySelector('ul');if(!heading||!list||heading.textContent.trim()!=='Services')return;list.innerHTML='';serviceLinks.forEach(function(item){var li=document.createElement('li'),a=document.createElement('a');a.href=item.href;a.textContent=item.label;li.appendChild(a);list.appendChild(li);});});});

// Preserve existing form behavior.
document.addEventListener('DOMContentLoaded',function(){function showInlineSuccess(form,headline,body){var wrapper=form.closest('.ml-form-embedWrapper');if(wrapper){var formBody=wrapper.querySelector('.ml-form-embedBody'),successBody=wrapper.querySelector('.ml-form-successBody');if(formBody&&successBody){formBody.style.display='none';successBody.style.display='block';return;}}var note=document.createElement('div');note.className='form-confirmation';note.style.cssText='padding:1.5rem;text-align:center;background:#f3f8f0;border:1px solid #cbd9c4;border-radius:12px;';note.innerHTML='<h4 style="margin:0 0 0.5rem;color:#4A6741;">'+(headline||'Thank you!')+'</h4><p style="margin:0;color:#4A6741;">'+(body||'You have successfully joined our subscriber list.')+'</p>';if(form.parentNode)form.parentNode.replaceChild(note,form);}document.querySelectorAll('form.ml-block-form, form#leadForm, form.lead-form').forEach(function(form){form.addEventListener('submit',function(e){e.preventDefault();var emailField=form.querySelector('input[type="email"]');if(emailField&&!emailField.checkValidity()){emailField.reportValidity();return;}try{if(form.action&&form.action!=='#')fetch(form.action,{method:'POST',body:new FormData(form),mode:'no-cors'}).catch(function(){});}catch(err){}showInlineSuccess(form,'Thank you!','You have successfully joined our subscriber list. Check your inbox for the Anxiety Toolkit!');});});document.querySelectorAll('form#ml-signup-form, form#ml-group-signup').forEach(function(form){form.addEventListener('submit',function(e){e.preventDefault();var emailField=form.querySelector('input[type="email"]');if(emailField&&!emailField.checkValidity()){emailField.reportValidity();return;}try{var payload=new FormData();payload.append('fields[email]',emailField?emailField.value:'');payload.append('ml-submit','1');payload.append('anticsrf','true');fetch('https://assets.mailerlite.com/jsonp/2494357/forms/192367295992956581/subscribe',{method:'POST',body:payload,mode:'no-cors'}).catch(function(){});}catch(err){}showInlineSuccess(form,'Thank you for subscribing!','You have successfully joined our mailing list. Watch your inbox for updates and resources.');});});document.querySelectorAll('form.js-consult-form').forEach(function(form){form.addEventListener('submit',function(e){e.preventDefault();var emailField=form.querySelector('input[type="email"]');if(emailField&&!emailField.checkValidity()){emailField.reportValidity();return;}var btn=form.querySelector('button[type="submit"]');if(btn){btn.disabled=true;btn.dataset.label=btn.textContent;btn.textContent='Sending…';}fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}}).then(function(res){if(res.ok)showInlineSuccess(form,'Thanks for reaching out!','We received your request and will get back to you within 1–2 business days.');else{if(btn){btn.disabled=false;btn.textContent=btn.dataset.label||'Request Consultation';}alert('Something went wrong sending your request. Please try again or email us directly.');}}).catch(function(){if(btn){btn.disabled=false;btn.textContent=btn.dataset.label||'Request Consultation';}alert('Something went wrong sending your request. Please try again or email us directly.');});});});});