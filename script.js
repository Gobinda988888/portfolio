// Modern portfolio script with iLovePDF-like interactions
document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scroll for navigation (if added later)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Contact form handler with modern feedback
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = form.querySelector('button');
      const originalText = button.textContent;
      
      // Loading state
      button.textContent = 'Sending...';
      button.style.background = 'linear-gradient(135deg, #4ecdc4, #ff6b6b)';
      button.disabled = true;
      
      // Simulate sending (replace with actual form submission)
      setTimeout(() => {
        button.textContent = 'Message Sent! ✨';
        button.style.background = 'linear-gradient(135deg, #96ceb4, #4ecdc4)';
        
        // Reset after delay
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = 'linear-gradient(135deg, #ff6b6b, #4ecdc4)';
          button.disabled = false;
          form.reset();
        }, 2000);
      }, 1500);
    });
  }

  // Interactive particles on mouse move
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create subtle particle effect
    if (Math.random() > 0.95) {
      createParticle(mouseX, mouseY);
    }
  });

  function createParticle(x, y) {
    const particle = document.createElement('div');
    const colors = ['#FFD700', '#32CD32', '#FFA500', '#228B22'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      opacity: 0.7;
      animation: particleFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1000);
  }

  // Add particle animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFade {
      0% {
        opacity: 0.7;
        transform: scale(1) translateY(0);
      }
      100% {
        opacity: 0;
        transform: scale(0.3) translateY(-20px);
      }
    }
  `;
  document.head.appendChild(style);
  // Scroll animations for sections
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

  // Observe all sections for scroll animations
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Skill cards hover effect enhancement
  document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Project cards click effect
  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', function() {
      // Add a pulse effect
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'pulse 0.3s ease';
      }, 10);
    });
  });

  // Add pulse animation to CSS
  const pulseStyle = document.createElement('style');
  pulseStyle.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(pulseStyle);

  // Typing effect for tagline
  const tagline = document.querySelector('.tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          tagline.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Parallax effect for background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.body.style.backgroundPosition = `0 ${rate}px`;
    
    // Hide header video on scroll
    const headerVideo = document.querySelector('.header-video');
    if (headerVideo) {
      if (scrolled > 150) {
        headerVideo.style.opacity = '0';
        headerVideo.style.transform = 'translateX(100px) scale(0.8)';
        headerVideo.style.pointerEvents = 'none';
      } else {
        headerVideo.style.opacity = '1';
        headerVideo.style.transform = 'translateX(0) scale(1)';
        headerVideo.style.pointerEvents = 'auto';
      }
    }
  });

  // Create scrolling Indian money animation
  function createScrollingMoney() {
    const moneyContainer = document.createElement('div');
    moneyContainer.className = 'money-scroll';
    document.body.appendChild(moneyContainer);

    function createRupeeNote() {
      const note = document.createElement('div');
      note.className = 'rupee-note';
      
      // Add random variants for different rupee notes
      const variants = ['', 'rupee-note-variant1', 'rupee-note-variant2', 'rupee-note-variant3'];
      const randomVariant = variants[Math.floor(Math.random() * variants.length)];
      if (randomVariant) {
        note.classList.add(randomVariant);
      }
      
      // Random starting positions
      const startX = Math.random() * -200 - 150;
      const startY = Math.random() * window.innerHeight;
      
      // Random animation duration and pattern
      const duration = 20 + Math.random() * 15;
      const animations = ['scrollMoney', 'scrollMoneyAlt'];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      
      note.style.left = startX + 'px';
      note.style.top = startY + 'px';
      note.style.animationName = randomAnimation;
      note.style.animationDuration = duration + 's';
      note.style.animationDelay = Math.random() * 5 + 's';
      note.style.animationTimingFunction = 'ease-in-out';
      note.style.animationIterationCount = '1';
      note.style.animationFillMode = 'forwards';
      
      moneyContainer.appendChild(note);
      
      // Remove note after animation
      setTimeout(() => {
        if (note.parentNode) {
          note.parentNode.removeChild(note);
        }
      }, (duration + 5) * 1000);
    }

    // Create notes at intervals
    setInterval(createRupeeNote, 2500);
    
    // Create initial notes with staggered timing
    for (let i = 0; i < 8; i++) {
      setTimeout(createRupeeNote, i * 800);
    }
  }

  // Start money animation
  createScrollingMoney();

  console.log('Modern portfolio with Indian money animation initialized! 🚀💰');
});

// Video Control Function
function toggleVideo() {
  const video = document.getElementById('headerVideo');
  const button = document.querySelector('.video-toggle');
  
  if (video.paused) {
    video.play();
    button.textContent = '⏸️';
  } else {
    video.pause();
    button.textContent = '▶️';
  }
}

// Popup Video Controls
function togglePopupVideo() {
  const video = document.getElementById('popupVideo');
  const button = document.querySelector('.popup-toggle');
  
  if (video.paused) {
    video.play();
    button.textContent = '⏸️';
  } else {
    video.pause();
    button.textContent = '▶️';
  }
}

function closePopupVideo() {
  const container = document.querySelector('.popup-video-container');
  container.style.transform = 'scale(0)';
  setTimeout(() => {
    container.style.display = 'none';
  }, 300);
}

// Auto-hide video controls after some time
document.addEventListener('DOMContentLoaded', function() {
  const videoContainer = document.querySelector('.header-video');
  const overlay = document.querySelector('.video-overlay');
  
  if (videoContainer) {
    let hideTimeout;
    
    videoContainer.addEventListener('mouseenter', function() {
      clearTimeout(hideTimeout);
      overlay.style.opacity = '1';
    });
    
    videoContainer.addEventListener('mouseleave', function() {
      hideTimeout = setTimeout(() => {
        overlay.style.opacity = '0';
      }, 2000);
    });
  }

  // Popup video entrance animation
  const popupContainer = document.querySelector('.popup-video-container');
  if (popupContainer) {
    setTimeout(() => {
      popupContainer.style.transform = 'scale(1)';
    }, 2000); // Show popup after 2 seconds
  }
});
