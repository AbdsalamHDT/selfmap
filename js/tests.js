/* ===========================
   SELFMAP TESTS LIBRARY JS
   Interactive Constellation & Mobile Menu
   =========================== */

// ===========================
// MAIN APPLICATION CLASS
// ===========================

class TestsLibrary {
  constructor() {
    this.mobileMenuOpen = false;
    this.animationFrameId = null;
    this.particles = [];
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupMobileMenu();
    this.setupConstellation();
    this.setupParticles();
    this.setupAccessibility();
    this.setupStaggeredAnimations();
    
    // Respect reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.startAnimationLoop();
    }
  }

  // ===========================
  // EVENT LISTENERS
  // ===========================

  setupEventListeners() {
    // Constellation node interactions
    const constellationNodes = document.querySelectorAll('.constellation__node');
    constellationNodes.forEach(node => {
      node.addEventListener('click', this.handleNodeClick.bind(this));
      node.addEventListener('keydown', this.handleNodeKeydown.bind(this));
      node.addEventListener('mouseenter', this.handleNodeHover.bind(this));
      node.addEventListener('mouseleave', this.handleNodeLeave.bind(this));
    });

    // Timeline item interactions
    const timelineItems = document.querySelectorAll('.timeline__item');
    timelineItems.forEach(item => {
      const cta = item.querySelector('.timeline__cta');
      if (cta) {
        cta.addEventListener('click', this.handleTimelineClick.bind(this));
      }
    });

    // Test card interactions (Desktop Grid)
    const testCards = document.querySelectorAll('.test-card');
    testCards.forEach(card => {
      card.addEventListener('click', this.handleCardClick.bind(this));
      card.addEventListener('keydown', this.handleCardKeydown.bind(this));
      
      const cta = card.querySelector('.test-card__cta');
      if (cta) {
        cta.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleCardClick(e);
        });
      }
    });



    // Family callout CTA
    const familyCTA = document.querySelector('.family-callout__cta');
    if (familyCTA) {
      familyCTA.addEventListener('click', this.handleFamilyClick.bind(this));
    }

    // Navbar CTAs
    const navbarCTAs = document.querySelectorAll('.navbar__cta, .navbar__mobile-cta');
    navbarCTAs.forEach(cta => {
      cta.addEventListener('click', this.handleNavbarCTA.bind(this));
    });

    // Window resize for responsive handling
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Intersection Observer for animations
    this.setupIntersectionObserver();
  }

  // ===========================
  // MOBILE MENU
  // ===========================

  setupMobileMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', this.toggleMobileMenu.bind(this));
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.mobileMenuOpen && 
          !mobileMenu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    
    this.mobileMenuOpen = true;
    mobileMenu.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.classList.add('mobile-menu-open');
    
    // Animate hamburger to X
    this.animateHamburger(true);
  }

  closeMobileMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileMenu = document.querySelector('.navbar__mobile-menu');
    
    this.mobileMenuOpen = false;
    mobileMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.classList.remove('mobile-menu-open');
    
    // Animate hamburger back to normal
    this.animateHamburger(false);
  }

  animateHamburger(isOpen) {
    const lines = document.querySelectorAll('.navbar__hamburger-line');
    
    if (isOpen) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      lines[0].style.transform = 'none';
      lines[1].style.opacity = '1';
      lines[2].style.transform = 'none';
    }
  }

  // ===========================
  // CONSTELLATION INTERACTIONS
  // ===========================

  setupConstellation() {
    // Add enhanced hover effects to connectors
    const nodes = document.querySelectorAll('.constellation__node');
    nodes.forEach(node => {
      const connector = node.querySelector('.constellation__connector');
      if (connector) {
        node.addEventListener('mouseenter', () => {
          connector.style.background = 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.8), transparent)';
          connector.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.6)';
        });
        
        node.addEventListener('mouseleave', () => {
          connector.style.background = 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.4), transparent)';
          connector.style.boxShadow = 'none';
        });
      }
    });
  }

  handleNodeClick(event) {
    const node = event.currentTarget;
    const testType = node.getAttribute('data-test');
    
    this.startTest(testType, node);
  }

  handleNodeKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleNodeClick(event);
    }
  }

  handleNodeHover(event) {
    const node = event.currentTarget;
    const hub = document.querySelector('.constellation__hub-core');
    
    // Enhance hub glow when hovering over nodes
    if (hub) {
      hub.style.boxShadow = `
        0 0 60px rgba(59, 130, 246, 0.8),
        inset 0 0 40px rgba(255, 255, 255, 0.2)
      `;
    }
  }

  handleNodeLeave(event) {
    const hub = document.querySelector('.constellation__hub-core');
    
    // Restore normal hub glow
    if (hub) {
      hub.style.boxShadow = `
        0 0 40px rgba(59, 130, 246, 0.6),
        inset 0 0 40px rgba(255, 255, 255, 0.1)
      `;
    }
  }

  handleTimelineClick(event) {
    const timelineItem = event.target.closest('.timeline__item');
    const testType = timelineItem.getAttribute('data-test');
    
    this.startTest(testType, timelineItem);
  }

  handleCardClick(event) {
    // Only handle click if it's not on the CTA button
    if (event.target.closest('.test-card__cta')) {
      return;
    }
    
    const card = event.currentTarget;
    const testType = card.getAttribute('data-test');
    
    this.startTest(testType, card);
  }

  handleCardKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleCardClick(event);
    }
  }

  handleCardCTAClick(event) {
    event.stopPropagation(); // Prevent card click handler
    
    const card = event.target.closest('.test-card');
    const testType = card.getAttribute('data-test');
    
    this.startTest(testType, card);
  }

  startTest(testType, element) {
    // Create zoom transition effect
    this.createZoomTransition(element, () => {
      // Navigate to test runner with test ID
      window.location.href = `test.html?id=${testType}`;
    });
  }

  createZoomTransition(element, callback) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle, transparent 0%, rgba(15, 23, 42, 0.9) 100%);
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.5s ease;
    `;
    document.body.appendChild(overlay);

    // Animate element
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    element.style.transformOrigin = `${centerX}px ${centerY}px`;
    element.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Trigger animation
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      element.style.transform = 'scale(1.2)';
      
      setTimeout(() => {
        element.style.transform = 'scale(20)';
        
        setTimeout(() => {
          callback();
          
          // Cleanup
          overlay.style.opacity = '0';
          element.style.transform = '';
          element.style.transition = '';
          element.style.transformOrigin = '';
          
          setTimeout(() => {
            document.body.removeChild(overlay);
          }, 500);
        }, 400);
      }, 100);
    });
  }

  showTestAlert(testType) {
    const testNames = {
      iq: 'IQ Test',
      adhd: 'ADHD & Focus Assessment',
      eq: 'Emotional Intelligence Test',
      stress: 'Stress Assessment',
      relationships: 'Relationships Test',
      motivation: 'Motivation Assessment',
      personality: 'Personality Test',
      kids: 'Kids Assessment'
    };
    
    const testName = testNames[testType] || 'Unknown Test';
    
    // Create custom modal
    this.showCustomModal(
      `Starting ${testName}`,
      'This would normally navigate to the test page. For this demo, we\'re showing this message instead.',
      'Continue to Test'
    );
  }

  // ===========================
  // PARTICLES SYSTEM
  // ===========================

  setupParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        size: Math.random() * 2 + 1
      });
    }
    
    this.createParticleCanvas();
  }

  createParticleCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.6;
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.body.appendChild(canvas);
    this.particleCanvas = canvas;
    this.particleCtx = canvas.getContext('2d');
  }

  updateParticles() {
    if (!this.particleCanvas || !this.particleCtx) return;
    
    this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
    
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = this.particleCanvas.width;
      if (particle.x > this.particleCanvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.particleCanvas.height;
      if (particle.y > this.particleCanvas.height) particle.y = 0;
      
      // Draw particle
      this.particleCtx.save();
      this.particleCtx.globalAlpha = particle.opacity;
      this.particleCtx.fillStyle = '#3b82f6';
      this.particleCtx.beginPath();
      this.particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.particleCtx.fill();
      this.particleCtx.restore();
    });
  }

  startAnimationLoop() {
    const animate = () => {
      this.updateParticles();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }

  // ===========================
  // ACCESSIBILITY
  // ===========================

  setupAccessibility() {
    // Add screen reader announcements for test selection
    const nodes = document.querySelectorAll('.constellation__node');
    nodes.forEach(node => {
      node.addEventListener('focus', () => {
        const testType = node.getAttribute('data-test');
        const announcement = `${testType} test selected. Press Enter or Space to start.`;
        this.announceToScreenReader(announcement);
      });
    });
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // ===========================
  // STAGGERED ANIMATIONS
  // ===========================

  setupStaggeredAnimations() {
    // Animate constellation nodes on load
    const nodes = document.querySelectorAll('.constellation__node');
    nodes.forEach((node, index) => {
      node.style.opacity = '0';
      node.style.transform = 'scale(0.5)';
      node.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      setTimeout(() => {
        node.style.opacity = '1';
        node.style.transform = 'scale(1)';
      }, 200 + index * 100);
    });
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    // Observe family callout and other elements
    const observeElements = document.querySelectorAll(
      '.family-callout__content, .timeline__item'
    );
    
    observeElements.forEach(el => observer.observe(el));
  }

  // ===========================
  // EVENT HANDLERS
  // ===========================

  handleFamilyClick(event) {
    event.preventDefault();
    
    this.showCustomModal(
      'Family Plan',
      'Unlock family assessments and track growth together. Add up to 4 family members with comprehensive reporting and insights.',
      'Learn More'
    );
  }

  handleNavbarCTA(event) {
    event.preventDefault();
    
    this.showCustomModal(
      'Get Started with SelfMap',
      'Begin your growth journey today. Choose from 8 professional assessments and unlock personalized insights.',
      'Start Free Trial'
    );
  }

  handleResize() {
    // Update particle canvas size
    if (this.particleCanvas) {
      this.particleCanvas.width = window.innerWidth;
      this.particleCanvas.height = window.innerHeight;
    }

    // Close mobile menu if window becomes large
    if (window.innerWidth > 768 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // ===========================
  // CUSTOM MODAL
  // ===========================

  showCustomModal(title, message, buttonText = 'OK') {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      z-index: 20000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 1rem;
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      text-align: center;
      transform: scale(0.8);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    `;

    modalContent.innerHTML = `
      <h3 style="
        font-family: var(--font-display);
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #ffffff 0%, #3b82f6 50%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      ">${title}</h3>
      <p style="
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 2rem;
        line-height: 1.6;
      ">${message}</p>
      <button class="modal-button" style="
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        color: #ffffff;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
      ">${buttonText}</button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Animate in
    requestAnimationFrame(() => {
      modalOverlay.style.opacity = '1';
      modalContent.style.transform = 'scale(1)';
    });

    // Handle close
    const closeModal = () => {
      modalOverlay.style.opacity = '0';
      modalContent.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        document.body.removeChild(modalOverlay);
      }, 300);
    };

    // Event listeners
    const button = modalContent.querySelector('.modal-button');
    button.addEventListener('click', closeModal);
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.4)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // ===========================
  // CLEANUP
  // ===========================

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    if (this.particleCanvas) {
      document.body.removeChild(this.particleCanvas);
    }
  }
}

// ===========================
// INITIALIZATION
// ===========================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TestsLibrary();
  });
} else {
  new TestsLibrary();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is hidden
    if (window.testsLibrary && window.testsLibrary.animationFrameId) {
      cancelAnimationFrame(window.testsLibrary.animationFrameId);
    }
  } else {
    // Resume animations when page is visible
    if (window.testsLibrary && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.testsLibrary.startAnimationLoop();
    }
  }
});