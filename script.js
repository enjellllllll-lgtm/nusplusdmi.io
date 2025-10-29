// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('navList');

menuBtn.addEventListener('click', () => {
  navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
  menuBtn.textContent = navList.style.display === 'flex' ? '✕' : '☰';
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      if (window.innerWidth <= 980) {
        navList.style.display = 'none';
        menuBtn.textContent = '☰';
      }
    }
  });
});

// Add parallax effect to hero bottle
const heroBottle = document.querySelector('.hero .bottle');

if (heroBottle) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.3;
    heroBottle.style.transform = `translateY(${6 - parallax}px)`;
  });
}

// Add hover effect to feature cards
const features = document.querySelectorAll('.feature');

features.forEach(feature => {
  feature.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
  });
  
  feature.addEventListener('mouseleave', function() {
    this.style.zIndex = '1';
  });
});

// Add interactive effect to journey images
const journeyImages = document.querySelectorAll('.journey .card img');

journeyImages.forEach((img, index) => {
  img.addEventListener('mouseenter', function() {
    journeyImages.forEach((otherImg, otherIndex) => {
      if (otherIndex !== index) {
        otherImg.style.filter = 'brightness(0.7)';
        otherImg.style.transform = 'scale(0.95)';
      }
    });
  });
  
  img.addEventListener('mouseleave', function() {
    journeyImages.forEach(otherImg => {
      otherImg.style.filter = 'brightness(1)';
      otherImg.style.transform = 'scale(1)';
    });
  });
});

// Form validation and enhancement
const orderForm = document.querySelector('#order form');

if (orderForm) {
  const inputs = orderForm.querySelectorAll('input, select');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const nama = this.querySelector('input[type="text"]').value;
    const produk = this.querySelector('select').value;
    const jumlah = this.querySelector('input[type="number"]').value;
    
    // Show success message with animation
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, var(--accent), #0a5858);
        color: white;
        padding: 32px 48px;
        border-radius: 24px;
        box-shadow: 0 20px 60px rgba(2,63,63,0.3);
        z-index: 1000;
        text-align: center;
        animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      ">
        <div style="font-size: 48px; margin-bottom: 16px;">✓</div>
        <h3 style="margin: 0 0 12px; font-size: 24px;">Pesanan Diterima!</h3>
        <p style="margin: 0; opacity: 0.9;">Terima kasih ${nama}, pesanan Anda sedang diproses.</p>
      </div>
    `;
    
    // Add keyframe animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes popIn {
        to {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successMessage);
    
    // Remove message after 3 seconds
    setTimeout(() => {
      successMessage.style.opacity = '0';
      successMessage.style.transition = 'opacity 0.5s ease';
      setTimeout(() => successMessage.remove(), 500);
    }, 3000);
    
    // Reset form
    this.reset();
  });
}

// Add cursor trail effect (optional - modern touch)
let dots = [];
const MAX_DOTS = 15;

document.addEventListener('mousemove', (e) => {
  // Only on desktop
  if (window.innerWidth > 980) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, var(--accent), var(--teal));
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${e.clientX - 4}px;
      top: ${e.clientY - 4}px;
      opacity: 0.6;
      transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(dot);
    dots.push(dot);
    
    // Fade out and remove
    setTimeout(() => {
      dot.style.opacity = '0';
      setTimeout(() => {
        dot.remove();
        dots.shift();
      }, 500);
    }, 100);
    
    // Limit number of dots
    if (dots.length > MAX_DOTS) {
      dots[0].remove();
      dots.shift();
    }
  }
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), var(--teal));
  z-index: 9999;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px rgba(12,107,107,0.5);
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

console.log('🌊 Nusplash - Enhanced Website Loaded Successfully!');