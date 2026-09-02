/**
 * Fern & Feather shared site behavior.
 * The homepage is the visual/content source of truth for the site header and footer.
 */

function getSiteRootPrefix() {
  var path = window.location.pathname.replace(/\/+$/, '');
  var segments = path.split('/').filter(Boolean);
  if (!segments.length) return '';
  var last = segments[segments.length - 1];
  var depth = last.indexOf('.') !== -1 ? segments.length - 1 : segments.length;
  return '../'.repeat(depth);
}

function buildServiceLinks(prefix) {
  return [
    { href: prefix + 'services/', label: 'View All Services' },
    { href: prefix + 'services/anxiety-therapy/', label: 'Anxiety Therapy' },
    { href: prefix + 'services/ocd-therapy/', label: 'OCD Therapy' },
    { href: prefix + 'services/trauma-therapy/', label: 'Trauma Therapy' },
    { href: prefix + 'services/couples-therapy/', label: 'Couples Therapy' },
    { href: prefix + 'services/group-therapy/', label: 'Group Therapy' }
  ];
}

function absolutizeShellLinks(shell) {
  shell.querySelectorAll('[href]').forEach(function(el) {
    var href = el.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) return;
    el.setAttribute('href', '/' + href.replace(/^\.\//, '').replace(/^\.\.\//, ''));
  });
  shell.querySelectorAll('[src]').forEach(function(el) {
    var src = el.getAttribute('src');
    if (!src || /^(https?:|data:)/i.test(src)) return;
    el.setAttribute('src', '/' + src.replace(/^\.\//, '').replace(/^\.\.\//, ''));
  });
}

function normalizeNavigation(nav) {
  if (!nav) return;
  var prefix = getSiteRootPrefix();
  var serviceLinks = buildServiceLinks(prefix);
  var navLinks = nav.querySelector('.nav-links');
  if (!navLinks) return;

  nav.querySelectorAll('.nav-links > li > a').forEach(function(link) {
    var label = link.textContent.replace(/[▾▼]/g, '').trim();
    if (label !== 'Services') return;
    var li = link.parentElement;
    li.classList.add('dropdown');
    link.classList.add('dropdown-toggle');
    link.href = serviceLinks[0].href;
    link.textContent = 'Services ▾';
    var oldMenu = li.querySelector('.dropdown-menu');
    if (oldMenu) oldMenu.remove();
    var menu = document.createElement('ul');
    menu.className = 'dropdown-menu';
    menu.setAttribute('role', 'menu');
    serviceLinks.forEach(function(item, i) {
      var row = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      if (i === 0) a.style.fontWeight = '700';
      row.appendChild(a);
      menu.appendChild(row);
    });
    li.appendChild(menu);
  });

  var aboutToggle = Array.from(navLinks.querySelectorAll(':scope > li > a')).find(function(link) {
    return /^About/i.test(link.textContent.replace(/[▾▼]/g, '').trim());
  });
  if (aboutToggle && aboutToggle.parentElement) {
    var aboutMenu = aboutToggle.parentElement.querySelector('.dropdown-menu');
    if (aboutMenu) {
      var lydiaLink = Array.from(aboutMenu.querySelectorAll('a')).find(function(link) { return link.textContent.trim() === 'Lydia'; });
      if (!lydiaLink) {
        var kieraLink = Array.from(aboutMenu.querySelectorAll('a')).find(function(link) { return link.textContent.trim() === 'Kiera'; });
        var lydiaItem = document.createElement('li');
        var lydia = document.createElement('a');
        lydia.href = prefix + 'lydia.html';
        lydia.textContent = 'Lydia';
        lydiaItem.appendChild(lydia);
        if (kieraLink && kieraLink.parentElement) kieraLink.parentElement.insertAdjacentElement('afterend', lydiaItem);
        else aboutMenu.appendChild(lydiaItem);
      } else lydiaLink.href = prefix + 'lydia.html';
    }
  }

  var existingJoin = Array.from(navLinks.querySelectorAll(':scope > li > a')).find(function(link) { return /^(Join Our Team|Join Us)$/i.test(link.textContent.trim()); });
  if (existingJoin) {
    existingJoin.textContent = 'Join Us';
    existingJoin.href = prefix + 'join-our-team.html';
  } else {
    var consult = Array.from(navLinks.querySelectorAll(':scope > li > a')).find(function(link) { return /Schedule Consult/i.test(link.textContent); });
    var item = document.createElement('li');
    var join = document.createElement('a');
    join.href = prefix + 'join-our-team.html';
    join.textContent = 'Join Us';
    item.appendChild(join);
    if (consult && consult.parentElement) navLinks.insertBefore(item, consult.parentElement);
    else navLinks.appendChild(item);
  }

  var hamburger = nav.querySelector('.mobile-menu-btn');
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.type = 'button';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.textContent = '☰';
    nav.querySelector('.container').insertBefore(hamburger, navLinks);
  }
  hamburger.onclick = function(e) {
    e.preventDefault(); e.stopPropagation();
    navLinks.classList.toggle('mobile-open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('mobile-open') ? 'true' : 'false');
  };

  nav.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
    toggle.onclick = function(e) {
      if (window.innerWidth >= 1000) return;
      e.preventDefault(); this.parentElement.classList.toggle('active');
    };
  });
}

function normalizeFooter(footer) {
  if (!footer) return;
  var prefix = getSiteRootPrefix();
  var services = buildServiceLinks(prefix);
  footer.querySelectorAll('.footer-column').forEach(function(column) {
    var heading = column.querySelector('h4');
    var list = column.querySelector('ul');
    if (!heading || !list || heading.textContent.trim() !== 'Services') return;
    list.innerHTML = '';
    services.forEach(function(item) {
      var li = document.createElement('li'); var a = document.createElement('a');
      a.href = item.href; a.textContent = item.label; li.appendChild(a); list.appendChild(li);
    });
  });
  attachMailingListForm(footer);
}

function attachMailingListForm(scope) {
  (scope || document).querySelectorAll('form#ml-signup-form').forEach(function(form) {
    if (form.dataset.ffBound) return;
    form.dataset.ffBound = 'true';
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (email && !email.checkValidity()) { email.reportValidity(); return; }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Joining…'; }
      try {
        var payload = new FormData();
        payload.append('fields[email]', email ? email.value : '');
        payload.append('ml-submit', '1'); payload.append('anticsrf', 'true');
        fetch('https://assets.mailerlite.com/jsonp/2494357/forms/192367295992956581/subscribe', { method: 'POST', body: payload, mode: 'no-cors' }).catch(function() {});
      } catch (err) {}
      form.innerHTML = '<p style="margin:0;color:white;font-weight:600;">Thank you for subscribing!</p>';
    });
  });
}

function standardizeSiteShell() {
  var currentNav = document.querySelector('.site-nav');
  var currentFooter = document.querySelector('footer.footer');
  var isHome = window.location.pathname === '/' || /\/index\.html$/.test(window.location.pathname);
  if (isHome) { normalizeNavigation(currentNav); normalizeFooter(currentFooter); return Promise.resolve(); }
  return fetch('/index.html', { cache: 'no-store' })
    .then(function(response) { if (!response.ok) throw new Error('Unable to load site shell'); return response.text(); })
    .then(function(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var masterNav = doc.querySelector('.site-nav'); var masterFooter = doc.querySelector('footer.footer');
      if (masterNav && currentNav) { absolutizeShellLinks(masterNav); currentNav.replaceWith(masterNav); normalizeNavigation(masterNav); }
      else normalizeNavigation(currentNav);
      if (masterFooter && currentFooter) { absolutizeShellLinks(masterFooter); currentFooter.replaceWith(masterFooter); normalizeFooter(masterFooter); }
      else if (masterFooter && !currentFooter) { absolutizeShellLinks(masterFooter); document.body.insertBefore(masterFooter, document.body.querySelector('script')); normalizeFooter(masterFooter); }
      else normalizeFooter(currentFooter);
    })
    .catch(function() { normalizeNavigation(currentNav); normalizeFooter(currentFooter); });
}

function fixRecruitmentSupportCard() {
  document.querySelectorAll('.benefit').forEach(function(card) {
    var heading = card.querySelector('h3'); var paragraph = card.querySelector('p');
    if (!heading || !paragraph || heading.textContent.trim() !== 'Administrative support.') return;
    heading.textContent = 'Practice tools & support.';
    paragraph.textContent = 'Access to our EHR, established practice systems, and some behind-the-scenes administrative help when you need it. You maintain control of your own practice and day-to-day client management.';
  });
}

function addLydiaContactButton() {
  if (!/\/lydia\.html$/.test(window.location.pathname)) return;
  if (document.querySelector('a[href="mailto:info@fernandfeathercounseling.com"]')) return;
  var details = document.querySelector('.administrator-hero .profile-details');
  if (!details) return;
  var button = document.createElement('a');
  button.href = 'mailto:info@fernandfeathercounseling.com'; button.className = 'btn btn-primary';
  button.textContent = 'Contact Lydia'; button.style.marginTop = '1.5rem'; details.appendChild(button);
}

function addNicoleTennesseeTelehealth() {
  if (!/\/nicole\.html$/.test(window.location.pathname)) return;

  document.title = 'Nicole, PhD, LPC | Georgia & Tennessee Telehealth Therapist | Fern & Feather';
  var description = document.querySelector('meta[name="description"]');
  if (description) description.content = 'Meet Nicole, PhD, LPC, co-founder of Fern & Feather Counseling and Wellness. In-person and telehealth therapy in Georgia, plus private-pay telehealth for clients located in Tennessee through the Counseling Compact.';

  var heroInfo = document.querySelector('.therapist-hero .therapist-info');
  if (heroInfo && !document.getElementById('nicole-service-area')) {
    var note = document.createElement('div');
    note.id = 'nicole-service-area';
    note.style.cssText = 'margin:1.25rem 0;padding:1rem 1.25rem;background:var(--sage-50);border-radius:14px;color:var(--sage-700);line-height:1.6;';
    note.innerHTML = '<strong>Now serving clients in Georgia + Tennessee</strong><br>In-person and telehealth therapy in Georgia · Private-pay telehealth for clients located in Tennessee through the Counseling Compact.';
    var workButton = heroInfo.querySelector('a.btn');
    if (workButton) heroInfo.insertBefore(note, workButton); else heroInfo.appendChild(note);
  }

  Array.from(document.querySelectorAll('h3')).forEach(function(heading) {
    if (heading.textContent.trim() !== 'Licensure') return;
    var list = heading.parentElement && heading.parentElement.querySelector('ul');
    if (!list || list.textContent.indexOf('Tennessee') !== -1) return;
    var li = document.createElement('li');
    li.style.cssText = 'padding:0.75rem 0;';
    li.innerHTML = '<strong>Counseling Compact Privilege — Tennessee</strong><br><span style="color:var(--sage-600);">Authorized for telehealth with clients located in Tennessee · Privilege LPC-TN-2636</span>';
    list.appendChild(li);
  });

  var investment = Array.from(document.querySelectorAll('section')).find(function(section) {
    var h2 = section.querySelector('h2'); return h2 && h2.textContent.trim() === 'Investment';
  });
  if (investment && !document.getElementById('tn-private-pay-note')) {
    var container = investment.querySelector('.container');
    if (container) {
      var payNote = document.createElement('p');
      payNote.id = 'tn-private-pay-note';
      payNote.style.cssText = 'max-width:760px;margin:2rem auto 0;text-align:center;color:var(--sage-700);line-height:1.7;';
      payNote.innerHTML = '<strong>Tennessee clients:</strong> Telehealth sessions are currently available on a private-pay basis while insurance options are being established.';
      container.appendChild(payNote);
    }
  }
}

function bindFaqs() {
  document.querySelectorAll('.faq-question').forEach(function(question) {
    if (question.dataset.ffBound) return;
    question.dataset.ffBound = 'true';
    var item = question.parentElement; var answer = item ? item.querySelector('.faq-answer') : null;
    if (question.tagName !== 'BUTTON') { question.setAttribute('role', 'button'); question.setAttribute('tabindex', '0'); }
    function toggle() { if (!item) return; item.classList.toggle('active'); if (answer) answer.hidden = !item.classList.contains('active'); }
    question.addEventListener('click', toggle);
    if (question.tagName !== 'BUTTON') question.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
}

var sharedStyle = document.createElement('style');
sharedStyle.textContent = `
  @media(min-width:1000px) {
    .site-nav .container { max-width: 1200px !important; padding-left: 2rem !important; padding-right: 2rem !important; }
    .site-nav .nav-links { gap: 2.5rem !important; flex-wrap: nowrap !important; }
    .site-nav .nav-links > li { flex: 0 0 auto; }
    .site-nav .nav-links > li > a { white-space: nowrap; }
    .site-nav .logo { white-space: nowrap; flex: 0 0 auto; }
  }
  @media(max-width:1350px) and (min-width:1000px) { .site-nav .nav-links { gap: 1.35rem !important; } }
  @media(max-width:999px) {
    .nav-links { display:none !important; }
    .mobile-menu-btn { display:inline-block !important; }
    .nav-links.mobile-open { display:flex !important; flex-direction:column; position:absolute; top:60px; left:0; right:0; background:#fff; padding:20px; box-shadow:0 4px 10px rgba(0,0,0,.2); z-index:1000; }
    .dropdown-menu { position:static !important; box-shadow:none !important; opacity:1 !important; visibility:visible !important; transform:none !important; }
    .dropdown.active .dropdown-menu { display:block !important; }
  }
`;
document.head.appendChild(sharedStyle);

document.addEventListener('DOMContentLoaded', function() {
  fixRecruitmentSupportCard();
  addLydiaContactButton();
  addNicoleTennesseeTelehealth();
  bindFaqs();
  standardizeSiteShell();
});
