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
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
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
  });

  console.log('Modern portfolio initialized! 🚀');
});
