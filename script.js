// script.js

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your interest! I will get back to you soon with photography tips and workshop information.');
  this.reset();
});

// Add fade-in animation to sections when they come into view
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Auto-hide header on scroll
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 100; // Minimum scroll before hiding header

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  // Show/hide scroll-to-top button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (currentScroll > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }

  // Auto-hide header logic
  if (currentScroll > scrollThreshold) {
    if (currentScroll > lastScrollTop) {
      // Scrolling down
      header.classList.add('hide');
    } else {
      // Scrolling up
      header.classList.remove('hide');
    }
  } else {
    // At the top of the page
    header.classList.remove('hide');
  }
  
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });

// Scroll to top functionality
document.getElementById('scrollToTop').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.querySelector('.gallery-grid');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const dropdownBtn = document.querySelector('.category-dropdown-btn');
  const dropdown = document.querySelector('.category-dropdown');
  
  // Toggle dropdown
  dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  // Update dropdown button text
  function updateDropdownText(text) {
    dropdownBtn.querySelector('span').textContent = text;
  }

  // Gallery items data
  const galleryItems = [

    // {
    //   image: 'image file path ',
    //   title: '',
    //   description: '',
    //   category: 'items category'
    // },

    {
      image: '/images/wedding-01.jpg',
      title: '',
      description: '',
      category: 'wedding'
    },
    {
      image: '/images/wedding-02.jpg',
      title: '',
      description: '',
      category: 'wedding'
    },
    {
      image: '/images/wedding-03.jpg',
      title: '',
      description: '',
      category: 'wedding'
    },

    {
      image: '/images/product-01.jpg',
      title: '',
      description: '',
      category: 'product'
    },
    {
      image: '/images/product-02.jpg',
      title: '',
      description: '',
      category: 'product'
    },
    {
      image: '/images/product-03.jpg',
      title: '',
      description: '',
      category: 'product'
    },


    {
      image: '/images/landscape-01.jpg',
      title: '',
      description: '',
      category: 'landscape'
    },
    {
      image: '/images/landscape-02.jpg',
      title: '',
      description: '',
      category: 'landscape'
    },
    {
      image: '/images/landscape-03.jpg',
      title: '',
      description: '',
      category: 'landscape'
    }
  ];

  // Create gallery items
  function createGalleryItems(items) {
    galleryGrid.innerHTML = '';
    
    items.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.dataset.category = item.category;
      
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      img.loading = 'lazy';
      
      const itemInfo = document.createElement('div');
      itemInfo.className = 'gallery-item-info';
      
      const title = document.createElement('h3');
      title.textContent = item.title;
      
      const description = document.createElement('p');
      description.textContent = item.description;
      
      const category = document.createElement('span');
      category.className = 'category';
      category.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
      
      itemInfo.appendChild(title);
      itemInfo.appendChild(description);
      itemInfo.appendChild(category);
      
      galleryItem.appendChild(img);
      galleryItem.appendChild(itemInfo);
      
      galleryGrid.appendChild(galleryItem);
    });
  }

  // Filter gallery items by category
  function filterGallery(category) {
    const items = category === 'all' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === category);
    
    createGalleryItems(items);
  }

  // Add click event listeners to category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update dropdown text
      updateDropdownText(button.textContent);
      
      // Close dropdown
      dropdown.classList.remove('active');
      
      // Filter gallery
      filterGallery(button.dataset.category);
    });
  });

  // Initialize gallery with all items
  createGalleryItems(galleryItems);
});
  