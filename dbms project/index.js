// Smooth Scroll for Navigation
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Search Bar Interaction
  const searchBar = document.querySelector('.search-bar input');
  searchBar.addEventListener('focus', () => {
    searchBar.placeholder = 'Type to search...';
  });
  searchBar.addEventListener('blur', () => {
    searchBar.placeholder = 'Search...';
  });
  
  // Testimonial Slider
  let currentSlide = 0;
  const slides = document.querySelectorAll('.testimonial-item');
  const totalSlides = slides.length;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
  
  // Auto-slide every 5 seconds
  setInterval(nextSlide, 5000);
  
  // Initialize first slide
  showSlide(currentSlide);
  // Logo Hover Effect
  const logo = document.querySelector('.logo');
  logo.addEventListener('mouseenter', () => {
      logo.classList.add('hover-effect');
  });
  logo.addEventListener('mouseleave', () => {
      logo.classList.remove('hover-effect');
  });
  
  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
  });
  
  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelector(link.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
  
  // About Section - Fade-in on Scroll
  const aboutSection = document.querySelector('.about');
  window.addEventListener('scroll', () => {
      const sectionPosition = aboutSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.5;
      if (sectionPosition < screenPosition) {
          aboutSection.classList.add('visible');
      }
  });
  
  // Footer - Dynamic Year
  const yearSpan = document.querySelector('.year');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;