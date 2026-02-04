  
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('hidden')) {
        icon.className = 'fas fa-bars';
      } else {
        icon.className = 'fas fa-times';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = 'fas fa-bars';
      }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          mobileMenu.classList.add('hidden');
          const icon = mobileMenuBtn.querySelector('i');
          icon.className = 'fas fa-bars';

          // Smooth scroll
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Typing Animation
    class TypingAnimation {
      constructor(elementId, texts, options = {}) {
        this.element = document.querySelector(elementId);
        this.texts = texts;
        this.options = {
          typingSpeed: 100,
          deletingSpeed: 50,
          pauseTime: 2000,
          ...options
        };
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;

        this.init();
      }

      init() {
        this.type();
      }

      type() {
        const currentText = this.texts[this.currentTextIndex];

        if (!this.isDeleting && this.currentCharIndex <= currentText.length) {
          this.element.textContent = currentText.substring(0, this.currentCharIndex);
          this.currentCharIndex++;
          setTimeout(() => this.type(), this.options.typingSpeed);
        } else if (this.isDeleting && this.currentCharIndex >= 0) {
          this.element.textContent = currentText.substring(0, this.currentCharIndex);
          this.currentCharIndex--;
          setTimeout(() => this.type(), this.options.deletingSpeed);
        } else if (!this.isDeleting && this.currentCharIndex > currentText.length) {
          this.isPaused = true;
          setTimeout(() => {
            this.isPaused = false;
            this.isDeleting = true;
            setTimeout(() => this.type(), 500);
          }, this.options.pauseTime);
        } else if (this.isDeleting && this.currentCharIndex < 0) {
          this.isDeleting = false;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
          setTimeout(() => this.type(), 500);
        }
      }
    }

    // View More Projects Functionality
    const viewMoreBtn = document.getElementById('view-more-btn');
    const moreProjects = document.getElementById('more-projects');
    const btnText = document.getElementById('btn-text');

    if (viewMoreBtn && moreProjects) {
      viewMoreBtn.addEventListener('click', () => {
        if (moreProjects.classList.contains('hidden-projects')) {
          // Show more projects
          moreProjects.classList.remove('hidden-projects');
          moreProjects.classList.add('show-projects');
          btnText.textContent = 'Show Less Projects';
          viewMoreBtn.querySelector('i').className = 'fas fa-minus mr-2';
          
          // Scroll to the newly shown projects
          moreProjects.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          // Hide projects
          moreProjects.classList.add('hidden-projects');
          moreProjects.classList.remove('show-projects');
          btnText.textContent = 'View More Projects';
          viewMoreBtn.querySelector('i').className = 'fas fa-plus mr-2';
          
          // Scroll to projects section
          document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Initialize typing animation when page loads
    document.addEventListener('DOMContentLoaded', () => {
      const typingTexts = [
        "Data Analyst",
        "Frontend Developer",
        "Problem Solver",
        "Data Enthusiast"
      ];

      new TypingAnimation('.typing-text', typingTexts);

      // Add initial animation to hero content
      const heroContent = document.querySelector('#home > div > div');
      if (heroContent) {
        heroContent.classList.add('animate-fade-in-up');
      }
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('nav-active');
        }
      });
    });

    // Form submission feedback
    const contactForm = document.querySelector('form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitBtn.disabled = true;

        // Revert after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          // Show success message
          alert('Thank you for your message! I will get back to you soon.');
        }, 3000);
      });
    }
