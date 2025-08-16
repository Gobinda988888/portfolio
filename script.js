// Simple portfolio script with falling math equations
document.addEventListener('DOMContentLoaded', function() {
  console.log('Script loaded!'); // Debug line
  
  // Contact form handler
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = form.querySelector('button');
      const originalText = button.textContent;
      
      button.style.background = 'linear-gradient(135deg, #FF9933, #138808)';
      button.textContent = 'Message Sent! ✨';
      
      setTimeout(() => {
        button.style.background = 'linear-gradient(135deg, #FF9933, #138808)';
        button.textContent = originalText;
        form.reset();
      }, 2000);
    });
  }
  
  // Click trail effect
  document.addEventListener('click', function(e) {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 6px;
      height: 6px;
      background: #FF9933;
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      animation: clickFade 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
      if (trail.parentNode) {
        trail.parentNode.removeChild(trail);
      }
    }, 600);
  });

  // Cursor follower effects
  let cursorFollowers = [];
  let mouseX = 0, mouseY = 0;
  
  // Create Jai Hind and name followers
  function createCursorFollowers() {
    // Jai Hind text
    const jaihind = document.createElement('div');
    jaihind.textContent = 'JAI HIND 🇮🇳';
    jaihind.className = 'cursor-follower';
    jaihind.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 999;
      font-family: 'Inter', Arial, sans-serif;
      font-weight: 900;
      font-size: 14px;
      color: #FF9933;
      text-shadow: 
        1px 1px 0px #FFFFFF,
        -1px -1px 0px #FFFFFF,
        1px -1px 0px #FFFFFF,
        -1px 1px 0px #FFFFFF,
        0 0 8px rgba(255, 153, 51, 1),
        0 0 12px rgba(19, 136, 8, 0.6);
      transform: translateX(-50%) translateY(-50%);
      transition: all 0.05s ease-out;
      opacity: 0;
    `;
    
    document.body.appendChild(jaihind);
    
    cursorFollowers = [
      { element: jaihind, delay: 0.02, offset: { x: 0, y: -25 } }
    ];
  }
  
  // Mouse move handler
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorFollowers.forEach((follower, index) => {
      setTimeout(() => {
        follower.element.style.left = (mouseX + follower.offset.x) + 'px';
        follower.element.style.top = (mouseY + follower.offset.y) + 'px';
        follower.element.style.opacity = '1';
        
        // Add subtle rotation based on movement
        const rotation = Math.sin(Date.now() * 0.005) * 2;
        follower.element.style.transform = `translateX(-50%) translateY(-50%) rotate(${rotation}deg)`;
        
        // Lighter color animation
        if (index === 0) { // Jai Hind text
          const colorPhase = Math.sin(Date.now() * 0.003) * 0.3 + 0.7;
          follower.element.style.textShadow = `
            1px 1px 0px #FFFFFF,
            -1px -1px 0px #FFFFFF,
            1px -1px 0px #FFFFFF,
            -1px 1px 0px #FFFFFF,
            0 0 8px rgba(255, 153, 51, ${colorPhase}),
            0 0 12px rgba(19, 136, 8, ${colorPhase * 0.6})
          `;
        }
      }, follower.delay * 50);
    });
  });
  
  // Mouse enter/leave effects
  document.addEventListener('mouseenter', function() {
    cursorFollowers.forEach(follower => {
      follower.element.style.opacity = '1';
    });
  });
  
  document.addEventListener('mouseleave', function() {
    cursorFollowers.forEach(follower => {
      follower.element.style.opacity = '0';
    });
  });
  
  // Initialize cursor followers
  createCursorFollowers();
  
  // Special hover effects for different sections
  const sections = document.querySelectorAll('.section, .header');
  sections.forEach(section => {
    section.addEventListener('mouseenter', function() {
      cursorFollowers[0].element.style.fontSize = '16px';
      cursorFollowers[0].element.style.textShadow = `
        1px 1px 0px #FFFFFF,
        -1px -1px 0px #FFFFFF,
        1px -1px 0px #FFFFFF,
        -1px 1px 0px #FFFFFF,
        0 0 12px rgba(19, 136, 8, 1),
        0 0 16px rgba(255, 153, 51, 0.8)
      `;
    });
    
    section.addEventListener('mouseleave', function() {
      cursorFollowers[0].element.style.fontSize = '14px';
      cursorFollowers[0].element.style.textShadow = `
        1px 1px 0px #FFFFFF,
        -1px -1px 0px #FFFFFF,
        1px -1px 0px #FFFFFF,
        -1px 1px 0px #FFFFFF,
        0 0 8px rgba(255, 153, 51, 1),
        0 0 12px rgba(19, 136, 8, 0.6)
      `;
    });
  });
  
  // Add pulse effect on click
  document.addEventListener('click', function(e) {
    cursorFollowers.forEach(follower => {
      follower.element.style.animation = 'none';
      follower.element.style.transform = 'translateX(-50%) translateY(-50%) scale(1.3)';
      
      setTimeout(() => {
        follower.element.style.animation = 'followerFloat 2s ease-in-out infinite alternate';
        follower.element.style.transform = 'translateX(-50%) translateY(-50%) scale(1)';
      }, 200);
    });
  });
  
  // Start 3-sided snake flow and top math rain
  setTimeout(start3SidedEffects, 500);
});

// 3-sided snake flow + top math rain
function start3SidedEffects() {
  console.log('Starting 3-sided snake flow and top math rain!');
  
  const snakeChars = [
    '0', '1', 'A', 'B', 'C', 'D', 'E', 'F', 'X', 'Y', 'Z',
    'α', 'β', 'γ', 'δ', 'π', 'Σ', '∫', '∞', '√', '±', '÷',
    '→', '←', '↑', '↓', '◆', '●', '■', '▲', '▼'
  ];
  
  const mathEquations = [
    'f(x) = x² + 2x - 1', '∫ x dx = x²/2 + C', 'y = mx + b',
    'a² + b² = c²', 'E = mc²', 'sin²θ + cos²θ = 1',
    'π = 3.14159...', 'Δy/Δx = slope', '√(x² + y²)'
  ];
  
  // LEFT SIDE - Snake coming from left
  function createLeftSnake() {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      left: -150px;
      top: ${Math.random() * 70 + 15}%;
      pointer-events: none;
      z-index: -1;
    `;
    
    for (let i = 0; i < 12; i++) {
      const char = document.createElement('span');
      char.textContent = snakeChars[Math.floor(Math.random() * snakeChars.length)];
      char.style.cssText = `
        display: inline-block;
        color: rgba(255, 153, 51, ${0.8 - i * 0.06});
        font-size: ${18 - i * 0.8}px;
        font-family: 'Courier New', monospace;
        font-weight: bold;
        margin-right: 8px;
        animation: leftSnake 6s linear forwards;
        animation-delay: ${i * 0.15}s;
        text-shadow: 0 0 10px rgba(255, 153, 51, 0.5);
      `;
      container.appendChild(char);
    }
    
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 8000);
  }
  
  // RIGHT SIDE - Snake coming from right
  function createRightSnake() {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      right: -150px;
      top: ${Math.random() * 70 + 15}%;
      pointer-events: none;
      z-index: -1;
    `;
    
    for (let i = 0; i < 12; i++) {
      const char = document.createElement('span');
      char.textContent = snakeChars[Math.floor(Math.random() * snakeChars.length)];
      char.style.cssText = `
        display: inline-block;
        color: rgba(19, 136, 8, ${0.8 - i * 0.06});
        font-size: ${18 - i * 0.8}px;
        font-family: 'Courier New', monospace;
        font-weight: bold;
        margin-left: 8px;
        animation: rightSnake 6s linear forwards;
        animation-delay: ${i * 0.15}s;
        text-shadow: 0 0 10px rgba(19, 136, 8, 0.5);
      `;
      container.appendChild(char);
    }
    
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 8000);
  }
  
  // BOTTOM SIDE - Snake coming from bottom
  function createBottomSnake() {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      bottom: -50px;
      left: ${Math.random() * 80 + 10}%;
      pointer-events: none;
      z-index: -1;
      display: flex;
      flex-direction: column-reverse;
    `;
    
    for (let i = 0; i < 10; i++) {
      const char = document.createElement('div');
      char.textContent = snakeChars[Math.floor(Math.random() * snakeChars.length)];
      char.style.cssText = `
        color: rgba(255, 255, 255, ${0.8 - i * 0.08});
        font-size: ${16 - i * 0.6}px;
        font-family: 'Courier New', monospace;
        font-weight: bold;
        margin-bottom: 6px;
        text-align: center;
        animation: bottomSnake 5s linear forwards;
        animation-delay: ${i * 0.2}s;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
      `;
      container.appendChild(char);
    }
    
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 7000);
  }
  
  // TOP - Math equations falling
  function createTopMath() {
    const equation = document.createElement('div');
    equation.textContent = mathEquations[Math.floor(Math.random() * mathEquations.length)];
    equation.style.cssText = `
      position: fixed;
      left: ${Math.random() * 85 + 5}%;
      top: -30px;
      color: rgba(255, 153, 51, 0.4);
      font-size: ${14 + Math.random() * 6}px;
      font-family: 'Courier New', monospace;
      font-weight: 600;
      pointer-events: none;
      z-index: -1;
      animation: topFall 8s linear forwards;
      text-shadow: 0 0 5px rgba(255, 153, 51, 0.3);
    `;
    
    document.body.appendChild(equation);
    setTimeout(() => equation.remove(), 9000);
  }
  
  // Start all effects with different intervals
  setInterval(createLeftSnake, 3000);
  setInterval(createRightSnake, 3500);
  setInterval(createBottomSnake, 4000);
  setInterval(createTopMath, 2000);
  
  // Create initial effects
  createLeftSnake();
  setTimeout(createRightSnake, 1000);
  setTimeout(createBottomSnake, 2000);
  setTimeout(createTopMath, 500);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes clickFade {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0); }
  }
  
  @keyframes leftSnake {
    0% { transform: translateX(0px); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.3; }
    100% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
  }
  
  @keyframes rightSnake {
    0% { transform: translateX(0px); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.3; }
    100% { transform: translateX(calc(-100vw - 200px)); opacity: 0; }
  }
  
  @keyframes bottomSnake {
    0% { transform: translateY(0px); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.4; }
    100% { transform: translateY(calc(-100vh - 100px)); opacity: 0; }
  }
  
  @keyframes topFall {
    0% { top: -30px; opacity: 0; transform: rotate(0deg); }
    10% { opacity: 0.4; }
    90% { opacity: 0.2; }
    100% { top: calc(100vh + 30px); opacity: 0; transform: rotate(180deg); }
  }
`;
document.head.appendChild(style);

console.log('Script file fully loaded!');
