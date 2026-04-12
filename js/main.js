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
  }
`;
document.head.appendChild(style);
