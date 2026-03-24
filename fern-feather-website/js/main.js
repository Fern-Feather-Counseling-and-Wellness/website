/**
 * Fern & Feather Wellness Center
 * Main JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Ensure dropdown markup exists (fixes cases where deployed HTML lacks the .dropdown structure)
  (function ensureDropdown() {
    try {
      const nav = document.querySelector('.nav-links');
      if (!nav) return;
      const aboutAnchor = Array.from(nav.querySelectorAll('a')).find(a => /\babout\b/i.test(a.textContent));
      if (!aboutAnchor) return;
      const parent = aboutAnchor.parentElement;
      if (parent && parent.classList.contains('dropdown')) return; // already dropdown

      const li = document.createElement('li');
      li.className = 'dropdown';
      li.innerHTML = `
        <a href="#" class="dropdown-toggle">${aboutAnchor.textContent.trim()}</a>
        <ul class="dropdown-menu">
          <li><a href="about.html">About Our Practice</a></li>
          <li><a href="nicole.html">Nicole</a></li>
          <li><a href="kiera.html">Kiera</a></li>
          <li><a href="faqs.html">FAQs</a></li>
        </ul>`;

      nav.replaceChild(li, parent);
    } catch (e) {
      console.warn('ensureDropdown failed', e);
    }
  })();

  // --- Navigation Dropdown Functionality ---
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    toggle.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      e.stopPropagation(); // Prevent event from bubbling up to the document
      // Toggle active class
      dropdown.classList.toggle('active');

      // Defensive fallback: force display if CSS is overridden or not applied
      try {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (dropdown.classList.contains('active')) {
          menu.style.display = 'block';
        } else {
          menu.style.display = '';
        }
      } catch (err) {
        console.warn('Dropdown fallback failed', err);
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
        try {
          const menu = dropdown.querySelector('.dropdown-menu');
          menu.style.display = '';
        } catch (err) { /* ignore */ }
      }
    });
  });
  // --- End Navigation Dropdown Functionality ---

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Lead form handling
  const leadForm = document.getElementById('leadForm');
  
  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(leadForm);
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Store in localStorage for now (replace with actual backend integration)
      const leads = JSON.parse(localStorage.getItem('ff_leads') || '[]');
      leads.push({
        name: name,
        email: email,
        date: new Date().toISOString(),
        source: 'homepage_lead_magnet'
      });
      localStorage.setItem('ff_leads', JSON.stringify(leads));
      
      // Show success message
      leadForm.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
          <h3 style="color: var(--sage-700); margin-bottom: 1rem;">You're In!</h3>
          <p style="color: var(--sage-600);">Check your email for your free Anxiety Toolkit. Welcome to the Fern & Feather community!</p>
        </div>
      `;
      
      // Track conversion (placeholder for analytics)
      console.log('Lead captured:', { name, email });
    });
  }
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(107, 127, 90, 0.15)';
    } else {
      navbar.style.boxShadow = '0 4px 20px rgba(107, 127, 90, 0.08)';
    }
    
    lastScroll = currentScroll;
  });
  
  // Animate elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe service cards
  document.querySelectorAll('.service-card, .feature-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
  
  // Mobile menu toggle (placeholder for future implementation)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('mobile-open');
    });
  }
  
  // Lazy load images (placeholder for when images are added)
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Analytics placeholder (replace with actual analytics)
function trackEvent(eventName, properties = {}) {
  console.log('Event tracked:', eventName, properties);
  // Example: gtag('event', eventName, properties);
}

// Booking widget integration placeholder
function openBookingModal() {
  // Integration with SimplePractice, TherapyNotes, etc.
  console.log('Booking modal opened');
  alert('Booking system integration coming soon! For now, please email us at hello@fernfeatherwellness.com');
}

// Export for global access
window.FernFeather = {
  trackEvent,
  openBookingModal,
  debounce,
  throttle
};