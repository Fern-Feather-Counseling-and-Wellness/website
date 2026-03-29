/**
 * Fern & Feather - Mobile Nav Fix
 * Handles hamburger menu + dropdowns on mobile
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Mobile nav fix loading...');
  
  const nav = document.querySelector('.site-nav, nav');
  if (!nav) {
    console.log('No nav found');
    return;
  }
  
  // Find or create hamburger button
  let hamburger = nav.querySelector('.mobile-menu-btn');
  
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = 'border:0;background:transparent;font-size:24px;cursor:pointer;margin-left:auto;display:none;';
    
    const navLinks = nav.querySelector('.nav-links');
    if (navLinks) {
      nav.insertBefore(hamburger, navLinks);
    } else {
      nav.appendChild(hamburger);
    }
  }
  
  // Hamburger click handler
  hamburger.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      const isOpen = navLinks.classList.contains('mobile-open');
      navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      console.log('Menu toggled:', !isOpen);
    }
  };
  
  // Handle dropdowns on mobile
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(function(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', function(e) {
        // Only handle on mobile viewport
        if (window.innerWidth < 1000) {
          e.preventDefault();
          e.stopPropagation();
          
          const isOpen = menu.classList.contains('dropdown-open');
          
          // Close all other dropdowns first
          document.querySelectorAll('.dropdown-menu').forEach(function(m) {
            m.classList.remove('dropdown-open');
          });
          
          // Toggle this one
          menu.classList.toggle('dropdown-open');
          console.log('Dropdown toggled:', !isOpen);
        }
      });
    }
  });
  
  console.log('Mobile nav fix applied');
});

// Inject mobile styles
const style = document.createElement('style');
style.textContent = `
  @media(max-width:999px) {
    .nav-links { display:none !important; }
    .mobile-menu-btn { display:inline-block !important; }
    .nav-links.mobile-open { display:flex !important; flex-direction:column; position:absolute; top:60px; left:0; right:0; background:#fff; padding:20px; box-shadow:0 4px 10px rgba(0,0,0,0.2); z-index:999; }
    .nav-links.mobile-open > li { padding:10px 0; border-bottom:1px solid #eee; }
    .nav-links.mobile-open .dropdown-menu { 
      display:none; 
      padding-left:20px; 
      margin-top:10px; 
    }
    .nav-links.mobile-open .dropdown-menu.dropdown-open { 
      display:block; 
    }
    .dropdown-toggle::after {
      content: " ▼";
      font-size:12px;
    }
    .dropdown-menu.dropdown-open + .dropdown-toggle::after {
      content: " ▲";
    }
  }
`;
document.head.appendChild(style);