/**
 * Consultation buttons on non-Nicole pages link to contact.html
 * (the consultation page with Calendly inline widget + contact form).
 * Nicole's page has its own embedded Calendly inline widget.
 */

/**
 * Fern & Feather - Mobile Nav Fix
 * Dynamically adds hamburger button if missing, handles toggle
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Mobile nav fix loading...');
  
  // Find the nav element
  const nav = document.querySelector('.site-nav, nav');
  if (!nav) {
    console.log('No nav found');
    return;
  }
  
  // Check if hamburger already exists
  let hamburger = nav.querySelector('.mobile-menu-btn');
  
  // If no hamburger, create one
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = 'border:0;background:transparent;font-size:24px;cursor:pointer;margin-left:auto;';
    
    // Insert before nav-links
    const navLinks = nav.querySelector('.nav-links');
    if (navLinks) {
      nav.insertBefore(hamburger, navLinks);
    } else {
      nav.appendChild(hamburger);
    }
  }
  
  // Add click handler - handles BOTH dynamically created AND existing buttons
  hamburger.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Hamburger clicked');
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('mobile-open') ? 'true' : 'false');
      console.log('Mobile menu toggled, mobile-open:', navLinks.classList.contains('mobile-open'));
    } else {
      console.log('No nav-links found');
    }
  };
  
  console.log('Mobile nav fix applied, hamburger:', hamburger);
});

// Inject mobile styles
const style = document.createElement('style');
style.textContent = `
  @media(max-width:999px) {
    .nav-links { display:none !important; }
    .mobile-menu-btn { display:inline-block !important; }
    .nav-links.mobile-open { display:flex !important; flex-direction:column; position:absolute; top:60px; left:0; right:0; background:#fff; padding:20px; box-shadow:0 4px 10px rgba(0,0,0,0.2); }
        .dropdown-menu { position:static !important; box-shadow:none !important; opacity:1 !important; visibility:visible !important; transform:none !important; }
        .dropdown.active .dropdown-menu { display:block !important; }
      }
    `;
    document.head.appendChild(style);

    /**
     * Dropdown Toggle (touch/click)
     * On mobile there's no hover, so allow tapping the dropdown-toggle
     * to expand/collapse the dropdown menu.
     */
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
          var parent = this.parentElement;
          if (parent && parent.classList.contains('dropdown')) {
            e.preventDefault();
            parent.classList.toggle('active');
          }
        });
      });
    });

/**
 * FAQ Accordion Toggle
 * Click on question to expand/collapse answer
 */
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(function(question) {
    const faqItem = question.parentElement;
    const answer = faqItem ? faqItem.querySelector('.faq-answer') : null;

    if (question.tagName !== 'BUTTON') {
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');
    }

    if (answer && !answer.id) {
      answer.id = 'faq-answer-' + Math.random().toString(36).slice(2, 10);
    }

    if (answer) {
      question.setAttribute('aria-controls', answer.id);
      question.setAttribute('aria-expanded', faqItem.classList.contains('active') ? 'true' : 'false');
      answer.hidden = !faqItem.classList.contains('active');
    }

    const toggleFaq = function() {
      if (!faqItem) {
        return;
      }

      faqItem.classList.toggle('active');

      if (answer) {
        const expanded = faqItem.classList.contains('active');
        question.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        answer.hidden = !expanded;
      }
    };

    question.addEventListener('click', toggleFaq);

    if (question.tagName !== 'BUTTON') {
      question.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFaq();
        }
      });
    }
  });
});

function getSiteRootPrefix() {
  var path = window.location.pathname.replace(/\/+$/, '');
  if (!path || path === '') {
    return '';
  }

  var segments = path.split('/').filter(Boolean);
  if (!segments.length) {
    return '';
  }

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

document.addEventListener('DOMContentLoaded', function() {
  var prefix = getSiteRootPrefix();
  var serviceLinks = buildServiceLinks(prefix);

  document.querySelectorAll('.site-nav .nav-links > li > a').forEach(function(link) {
    var navLabel = link.textContent.replace(/[▾▼]/g, '').trim();
    if (navLabel !== 'Services') {
      return;
    }

    var listItem = link.parentElement;
    if (!listItem) {
      return;
    }

    listItem.classList.add('dropdown');
    link.classList.add('dropdown-toggle');
    link.setAttribute('href', serviceLinks[0].href);
    link.textContent = 'Services ▾';

    if (listItem.querySelector('.dropdown-menu')) {
      return;
    }

    var menu = document.createElement('ul');
    menu.className = 'dropdown-menu';
    menu.setAttribute('role', 'menu');

    serviceLinks.forEach(function(item, index) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      if (index === 0) {
        a.style.fontWeight = '700';
      }
      li.appendChild(a);
      menu.appendChild(li);
    });

    listItem.appendChild(menu);
  });

  document.querySelectorAll('.footer-column').forEach(function(column) {
    var heading = column.querySelector('h4');
    var list = column.querySelector('ul');
    if (!heading || !list || heading.textContent.trim() !== 'Services') {
      return;
    }

    list.innerHTML = '';

    serviceLinks.forEach(function(item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      li.appendChild(a);
      list.appendChild(li);
    });
  });
});

/**
 * Email list / consultation forms
 * Prevents the page from navigating away ("jumping") on submit and shows
 * an inline confirmation message. Works for both the MailerLite embedded
 * forms and any stub forms that still use action="#".
 */
document.addEventListener('DOMContentLoaded', function() {
  function showInlineSuccess(form, headline, body) {
    // MailerLite embeds ship their own success/markup; reuse it if present.
    var wrapper = form.closest('.ml-form-embedWrapper');
    if (wrapper) {
      var formBody = wrapper.querySelector('.ml-form-embedBody');
      var successBody = wrapper.querySelector('.ml-form-successBody');
      if (formBody && successBody) {
        formBody.style.display = 'none';
        successBody.style.display = 'block';
        return;
      }
    }

    // Generic fallback: replace the form with a confirmation block.
    var note = document.createElement('div');
    note.className = 'form-confirmation';
    note.style.cssText = 'padding:1.5rem;text-align:center;background:#f3f8f0;border:1px solid #cbd9c4;border-radius:12px;';
    note.innerHTML =
      '<h4 style="margin:0 0 0.5rem;color:#4A6741;">' + (headline || 'Thank you!') + '</h4>' +
      '<p style="margin:0;color:#4A6741;">' + (body || 'You have successfully joined our subscriber list.') + '</p>';
    if (form.parentNode) {
      form.parentNode.replaceChild(note, form);
    }
  }

  // MailerLite embedded signup forms (homepage).
  document.querySelectorAll('form.ml-block-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // never let the browser navigate away / open a new tab
      var emailField = form.querySelector('input[type="email"]');
      if (emailField && !emailField.value) {
        emailField.focus();
        return;
      }
      // Best-effort submission so the address actually reaches MailerLite.
      try {
        var data = new FormData(form);
        fetch(form.action, { method: 'POST', body: data, mode: 'no-cors' }).catch(function() {});
      } catch (err) { /* MailerLite's own script handles it when available */ }
      showInlineSuccess(form, 'Thank you!', 'You have successfully joined our subscriber list. Check your inbox for the Anxiety Toolkit!');
    });
  });

  // Stub lead forms (e.g. pages/index.html) that previously posted to "#".
  document.querySelectorAll('form#leadForm, form.lead-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var emailField = form.querySelector('input[type="email"]');
      if (emailField && !emailField.checkValidity()) {
        emailField.reportValidity();
        return;
      }
      showInlineSuccess(form, 'Thank you!', 'You have successfully joined our subscriber list. Check your inbox for the Anxiety Toolkit!');
    });
  });

    // Footer "Join our mailing list" signup (#ml-signup-form) used across pages.
    // Submits the address to the same MailerLite endpoint as the hero form so
    // subscriptions actually register, then confirms inline.
    document.querySelectorAll('form#ml-signup-form').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var emailField = form.querySelector('input[type="email"]');
        if (emailField && !emailField.checkValidity()) {
          emailField.reportValidity();
          return;
        }
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Joining…'; }

        var mlEndpoint = 'https://assets.mailerlite.com/jsonp/2494357/forms/192367295992956581/subscribe';
        try {
          var payload = new FormData();
          payload.append('fields[email]', emailField ? emailField.value : '');
          payload.append('ml-submit', '1');
          payload.append('anticsrf', 'true');
          fetch(mlEndpoint, { method: 'POST', body: payload, mode: 'no-cors' }).catch(function() {});
        } catch (err) { /* network blocked — still confirm to the user */ }

        showInlineSuccess(form, 'Thank you for subscribing!', 'You have successfully joined our mailing list. Watch your inbox for updates and resources.');
      });
    });

            // Group therapy mailing list signup (#ml-group-signup) — same MailerLite endpoint.
            document.querySelectorAll('form#ml-group-signup').forEach(function(form) {
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                var emailField = form.querySelector('input[type="email"]');
                if (emailField && !emailField.checkValidity()) {
                  emailField.reportValidity();
                  return;
                }
                var btn = form.querySelector('button[type="submit"]');
                if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Joining…'; }

                var mlEndpoint = 'https://assets.mailerlite.com/jsonp/2494357/forms/192367295992956581/subscribe';
                try {
                  var payload = new FormData();
                  payload.append('fields[email]', emailField ? emailField.value : '');
                  payload.append('ml-submit', '1');
                  payload.append('anticsrf', 'true');
                  fetch(mlEndpoint, { method: 'POST', body: payload, mode: 'no-cors' }).catch(function() {});
                } catch (err) { /* network blocked — still confirm to the user */ }

                form.style.display = 'none';
                var confirm = form.parentElement.parentElement.querySelector('.ml-group-confirmation');
                if (confirm) { confirm.style.display = 'block'; }
                else { showInlineSuccess(form, 'You\'re on the list!', 'We\'ll keep you posted on upcoming groups.'); }
              });
            });

          // Contact / consultation form (Formspree) — submit via AJAX and confirm inline.
  document.querySelectorAll('form.js-consult-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var emailField = form.querySelector('input[type="email"]');
      if (emailField && !emailField.checkValidity()) {
        emailField.reportValidity();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function(res) {
        if (res.ok) {
          showInlineSuccess(form, 'Thanks for reaching out!', 'We received your request and will get back to you within 1–2 business days.');
        } else {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Request Consultation'; }
          alert('Something went wrong sending your request. Please try again or email us directly.');
        }
      }).catch(function() {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Request Consultation'; }
        alert('Something went wrong sending your request. Please try again or email us directly.');
      });
    });
  });
});
