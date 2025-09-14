// Modern Creative UI JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
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

    // Parallax effect for sphere
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sphere = document.querySelector('.glass-sphere');
        const floatingElements = document.querySelectorAll('.element');
        
        if (sphere) {
            const rate = scrolled * 0.5;
            sphere.style.transform = `translateY(${rate}px) rotateY(${scrolled * 0.1}deg)`;
        }
        
        // Floating elements parallax
        floatingElements.forEach((element, index) => {
            const rate = scrolled * (0.2 + index * 0.1);
            element.style.transform = `translateY(${rate}px)`;
        });
    });

    // Interactive sphere rotation on mouse move
    const sphereContainer = document.querySelector('.sphere-container');
    const sphere = document.querySelector('.glass-sphere');
    
    if (sphereContainer && sphere) {
        sphereContainer.addEventListener('mousemove', (e) => {
            const rect = sphereContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (x - centerX) / 10;
            
            sphere.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        sphereContainer.addEventListener('mouseleave', () => {
            sphere.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // Navigation arrows functionality
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const colors = [
        'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 255, 255, 0.2) 50%, rgba(255, 0, 255, 0.3) 100%)',
        'linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(255, 255, 0, 0.2) 50%, rgba(0, 255, 255, 0.3) 100%)',
        'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.2) 50%, rgba(255, 255, 255, 0.3) 100%)'
    ];

    if (prevBtn && nextBtn && sphere) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + colors.length) % colors.length;
            sphere.style.background = colors[currentIndex];
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % colors.length;
            sphere.style.background = colors[currentIndex];
        });
    }

    // Animated data points
    const dataPoints = document.querySelectorAll('.data-point');
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
    
    dataPoints.forEach((point, index) => {
        if (fibonacci[index]) {
            point.textContent = fibonacci[index];
            
            // Add click animation
            point.addEventListener('click', () => {
                point.style.animation = 'none';
                setTimeout(() => {
                    point.style.animation = 'dataFloat 4s ease-in-out infinite';
                }, 100);
            });
        }
    });

    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Intersection Observer for scroll animations
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

    // Observe sections
    document.querySelectorAll('.about-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Particle system on cursor movement
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create particles occasionally
        if (Math.random() > 0.98) {
            createParticle(mouseX, mouseY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        const colors = ['#00ffff', '#ff00ff', '#ffff00'];
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
            z-index: 9999;
            opacity: 0.8;
            animation: particleFade 2s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }

    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFade {
            0% {
                opacity: 0.8;
                transform: scale(1) translateY(0);
            }
            100% {
                opacity: 0;
                transform: scale(0.3) translateY(-30px);
            }
        }
    `;
    document.head.appendChild(style);

    // Enhanced scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.about-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Dynamic background based on scroll
    window.addEventListener('scroll', () => {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const hue = scrollPercent * 360;
        
        document.body.style.background = `linear-gradient(135deg, 
            hsl(${hue}, 70%, 5%) 0%, 
            hsl(${hue + 60}, 60%, 10%) 50%, 
            hsl(${hue + 120}, 50%, 15%) 100%)`;
    });

    console.log('🚀 Creative UI Loaded Successfully!');
});

// Performance optimization
window.addEventListener('load', () => {
    // Preload critical animations
    const sphere = document.querySelector('.glass-sphere');
    if (sphere) {
        sphere.style.willChange = 'transform';
    }
    
    // Optimize floating elements
    document.querySelectorAll('.element').forEach(el => {
        el.style.willChange = 'transform';
    });
});