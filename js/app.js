/* ===========================
   MODERN 3D SELFMAP JAVASCRIPT
   Apple × PlayStation × Netflix Inspired
   =========================== */

// ===========================
// UTILITY FUNCTIONS
// ===========================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Enhanced easing functions for smooth animations
const easing = {
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// ===========================
// 3D PARTICLES SYSTEM
// ===========================

class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.particles = [];
    this.config = {
      count: options.count || 50,
      speed: options.speed || 0.5,
      size: options.size || 2,
      color: options.color || 'rgba(59, 130, 246, 0.6)',
      ...options
    };
    
    this.init();
    this.animate();
  }
  
  init() {
    // Create particle canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    
    this.container.appendChild(this.canvas);
    this.resize();
    
    // Create particles
    for (let i = 0; i < this.config.count; i++) {
      this.particles.push(this.createParticle());
    }
    
    // Handle resize
    window.addEventListener('resize', () => this.resize());
  }
  
  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      z: Math.random() * 100,
      vx: (Math.random() - 0.5) * this.config.speed,
      vy: (Math.random() - 0.5) * this.config.speed,
      vz: (Math.random() - 0.5) * this.config.speed * 0.1,
      size: Math.random() * this.config.size + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      life: Math.random() * 200 + 100
    };
  }
  
  resize() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;
      particle.life--;
      
      // 3D perspective effect
      const scale = 1 + particle.z * 0.01;
      const renderSize = particle.size * scale;
      const renderOpacity = particle.opacity * (1 - particle.z * 0.01);
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Reset particle if life is over
      if (particle.life <= 0) {
        this.particles[index] = this.createParticle();
        return;
      }
      
      // Draw particle
      this.ctx.globalAlpha = renderOpacity;
      this.ctx.fillStyle = this.config.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, renderSize, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ===========================
// 3D ASSESSMENT CUBES
// ===========================

class Assessment3D {
  constructor() {
    this.cubes = $$('.assessment-cube');
    this.init();
  }
  
  init() {
    this.cubes.forEach((cube, index) => {
      this.setupCube(cube, index);
    });
  }
  
  setupCube(cube, index) {
    const face = cube.querySelector('.assessment-cube__face--front');
    const backFace = cube.querySelector('.assessment-cube__face--back');
    
    // Add interactive hover effects
    cube.addEventListener('mouseenter', () => {
      cube.style.transform = `
        perspective(1000px) 
        rotateY(${5 + index * 2}deg) 
        rotateX(5deg) 
        translateZ(30px)
        scale(1.02)
      `;
    });
    
    cube.addEventListener('mouseleave', () => {
      cube.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)';
    });
    
    // Add click flip animation
    cube.addEventListener('click', () => {
      cube.classList.toggle('flipped');
      if (cube.classList.contains('flipped')) {
        cube.style.transform = 'perspective(1000px) rotateY(180deg)';
      } else {
        cube.style.transform = 'perspective(1000px) rotateY(0deg)';
      }
    });
    
    // Add random gentle animation
    const randomDelay = Math.random() * 2000;
    setTimeout(() => {
      cube.style.animation = `float ${6 + Math.random() * 4}s ease-in-out infinite`;
      cube.style.animationDelay = `${randomDelay}ms`;
    }, randomDelay);
  }
}

// ===========================
// HERO 3D SCENE
// ===========================

class Hero3DScene {
  constructor() {
    this.scene = $('.hero__3d-scene');
    this.orb = $('.hero__orb');
    this.rings = $$('.hero__ring');
    
    if (this.scene) {
      this.init();
    }
  }
  
  init() {
    this.setupMouseInteraction();
    this.setupScrollAnimation();
    this.animateRings();
  }
  
  setupMouseInteraction() {
    let isInteracting = false;
    
    document.addEventListener('mousemove', (e) => {
      if (isInteracting) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const mouseX = (clientX / innerWidth - 0.5) * 30;
      const mouseY = (clientY / innerHeight - 0.5) * 30;
      
      if (this.scene) {
        this.scene.style.transform = `
          rotateY(${mouseX * 0.5}deg) 
          rotateX(${-mouseY * 0.5}deg)
        `;
      }
      
      if (this.orb) {
        this.orb.style.transform = `
          translate(-50%, -50%) 
          rotateX(${15 + mouseY * 0.3}deg) 
          rotateY(${25 + mouseX * 0.3}deg)
        `;
      }
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
      if (this.scene) {
        this.scene.style.transform = 'rotateY(0deg) rotateX(0deg)';
      }
      if (this.orb) {
        this.orb.style.transform = 'translate(-50%, -50%) rotateX(15deg) rotateY(25deg)';
      }
    });
  }
  
  setupScrollAnimation() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercent = Math.min(scrollY / windowHeight, 1);
      
      if (this.scene) {
        this.scene.style.transform = `
          translateY(${scrollPercent * 100}px) 
          rotateY(${scrollPercent * 360}deg)
          scale(${1 - scrollPercent * 0.2})
        `;
      }
    });
  }
  
  animateRings() {
    this.rings.forEach((ring, index) => {
      const duration = 8000 + index * 2000;
      const rotate = () => {
        ring.style.transform = `
          rotateX(${70 + index * 35}deg) 
          rotateY(${index * 35}deg) 
          rotateZ(${Date.now() / duration * 360}deg)
        `;
        requestAnimationFrame(rotate);
      };
      rotate();
    });
  }
}

// ===========================
// SMOOTH SCROLLING & NAVIGATION
// ===========================

class SmoothNavigation {
  constructor() {
    this.navbar = $('.navbar');
    this.links = $$('.navbar__link');
    this.mobileToggle = $('.navbar__mobile-toggle');
    
    this.init();
  }
  
  init() {
    this.setupScrollEffects();
    this.setupSmoothScrolling();
    this.setupMobileMenu();
    this.setupActiveLinks();
  }
  
  setupScrollEffects() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      // Navbar background opacity
      if (currentScroll > 50) {
        this.navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        this.navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
      } else {
        this.navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        this.navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
      
      // Auto-hide navbar on scroll down
      if (currentScroll > lastScroll && currentScroll > 200) {
        this.navbar.style.transform = 'translateY(-100%)';
      } else {
        this.navbar.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }
  
  setupSmoothScrolling() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = $(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
  
  setupMobileMenu() {
    if (this.mobileToggle) {
      const mobileMenu = $('.navbar__mobile-menu');
      
      this.mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (mobileMenu) {
          mobileMenu.classList.toggle('active');
          this.mobileToggle.classList.toggle('active');
          document.body.classList.toggle('mobile-menu-open');
        }
      });
      
      // Close mobile menu when clicking on links
      const mobileLinks = $$('.navbar__mobile-link');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          this.mobileToggle.classList.remove('active');
          document.body.classList.remove('mobile-menu-open');
        });
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          this.mobileToggle.classList.remove('active');
          document.body.classList.remove('mobile-menu-open');
        }
      });
    }
  }
  
  setupActiveLinks() {
    const sections = $$('section[id]');
    
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          this.links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
}

// ===========================
// INTERSECTION OBSERVER ANIMATIONS
// ===========================

class ScrollAnimations {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    this.init();
  }
  
  init() {
    // Animate elements on scroll
    const animatedElements = $$('[data-animate]');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      this.observer.observe(el);
    });
    
    // Animate assessment cubes
    const cubes = $$('.assessment-cube');
    cubes.forEach((cube, index) => {
      cube.style.opacity = '0';
      cube.style.transform = 'translateY(50px) rotateY(-15deg)';
      cube.setAttribute('data-animate', 'fadeInUp');
      cube.style.transitionDelay = `${index * 150}ms`;
      this.observer.observe(cube);
    });
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.getAttribute('data-animate');
        
        element.style.opacity = '1';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        switch (animationType) {
          case 'fadeInUp':
            element.style.transform = 'translateY(0) rotateY(0deg)';
            break;
          case 'fadeInLeft':
            element.style.transform = 'translateX(0)';
            break;
          case 'fadeInRight':
            element.style.transform = 'translateX(0)';
            break;
          default:
            element.style.transform = 'translateY(0)';
        }
        
        this.observer.unobserve(element);
      }
    });
  }
}

// ===========================
// ASSESSMENT DATA & FUNCTIONALITY
// ===========================

const assessmentData = {
  iq: {
    title: "IQ Assessment",
    description: "Measure your cognitive abilities and problem-solving skills with our comprehensive intelligence test.",
    duration: "45 minutes",
    questions: 40,
    image: "assets/img/tests/IQ.png"
  },
  eq: {
    title: "EQ Assessment", 
    description: "Discover your emotional intelligence and learn how you understand and manage emotions.",
    duration: "30 minutes",
    questions: 35,
    image: "assets/img/tests/EQ.png"
  },
  personality: {
    title: "Personality Test",
    description: "Uncover your unique personality traits and behavioral patterns with our detailed analysis.",
    duration: "35 minutes", 
    questions: 50,
    image: "assets/img/tests/Personality.png"
  },
  adhd: {
    title: "ADHD Screening",
    description: "Get insights into attention patterns and executive function with our ADHD assessment.",
    duration: "25 minutes",
    questions: 30,
    image: "assets/img/tests/ADHD.png"
  },
  stress: {
    title: "Stress Analysis",
    description: "Understand your stress levels and learn personalized coping strategies.",
    duration: "20 minutes",
    questions: 25,
    image: "assets/img/tests/Stress.png"
  },
  motivation: {
    title: "Motivation Profile",
    description: "Discover what drives you and how to maintain peak motivation in different areas of life.",
    duration: "30 minutes",
    questions: 35,
    image: "assets/img/tests/motivation.png"
  },
  relationships: {
    title: "Relationship Skills",
    description: "Explore your relationship patterns and communication style with comprehensive insights.",
    duration: "40 minutes",
    questions: 45,
    image: "assets/img/tests/relationships.png"
  },
  kids: {
    title: "Kids Assessment",
    description: "Special assessments designed for children to understand their learning and social development.",
    duration: "25 minutes",
    questions: 20,
    image: "assets/img/tests/Kids.png"
  }
};

// ===========================
// PERFORMANCE OPTIMIZATIONS
// ===========================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// ===========================
// INITIALIZE APPLICATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize core systems
  new SmoothNavigation();
  new ScrollAnimations();
  new Assessment3D();
  new Hero3DScene();
  
  // Initialize particle systems
  const heroParticles = $('.hero__particles');
  if (heroParticles) {
    new ParticleSystem(heroParticles, {
      count: 80,
      speed: 0.3,
      size: 1.5,
      color: 'rgba(59, 130, 246, 0.4)'
    });
  }
  
  // Add loading animation
  document.body.classList.add('loaded');
  
  // Performance optimizations
  const debouncedResize = debounce(() => {
    // Handle resize events
    window.dispatchEvent(new Event('optimizedResize'));
  }, 250);
  
  window.addEventListener('resize', debouncedResize);
  
  console.log('🚀 SelfMap 3D Experience Initialized');
});

// ===========================
// ASSESSMENT INTERACTIONS
// ===========================

// Handle assessment cube hover animations
document.addEventListener('mouseenter', (e) => {
  const cube = e.target.closest('.assessment-cube');
  if (cube) {
    cube.style.transform = 'translateY(-10px) rotateX(15deg)';
  }
}, true);

document.addEventListener('mouseleave', (e) => {
  const cube = e.target.closest('.assessment-cube');
  if (cube) {
    cube.style.transform = '';
  }
}, true);

// Handle CTA button animations
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn-primary, .hero__cta-primary, .assessment-cube__cta')) {
    // Add ripple effect
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Add focus management for better keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}