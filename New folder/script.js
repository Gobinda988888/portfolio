// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll Progress Indicator
function updateScrollIndicator() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create scroll indicator if it doesn't exist
    let indicator = document.querySelector('.scroll-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        document.body.appendChild(indicator);
    }
    
    indicator.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollIndicator);

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes and observe elements
function initAnimations() {
    // Hero content animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('slide-in-left');
        observer.observe(heroContent);
    }

    // Hero image animation
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
        observer.observe(heroImage);
    }

    // Tool cards animation
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${(index % 10) * 0.1}s`; // Stagger animation within each category
        observer.observe(card);
    });

    // Category titles animation
    const categoryTitles = document.querySelectorAll('.category-title');
    categoryTitles.forEach(title => {
        title.classList.add('slide-in-left');
        observer.observe(title);
    });

    // Tools subtitle animation
    const toolsSubtitle = document.querySelector('.tools-subtitle');
    if (toolsSubtitle) {
        toolsSubtitle.classList.add('fade-in');
        observer.observe(toolsSubtitle);
    }

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Platform buttons animation
    const platformBtns = document.querySelectorAll('.platform-btn');
    platformBtns.forEach((btn, index) => {
        btn.classList.add('fade-in');
        btn.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(btn);
    });

    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('fade-in');
        observer.observe(title);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Phone mockup interactive animations
function initPhoneAnimations() {
    const toolIcons = document.querySelectorAll('.app-tools .tool-icon');
    
    toolIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
        
        // Add click effect
        icon.addEventListener('click', () => {
            icon.style.transform = 'scale(0.9)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    const phoneScreen = document.querySelector('.phone-screen');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (phoneScreen) {
            phoneScreen.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Loading animation
function showLoadingAnimation() {
    const body = document.body;
    body.style.overflow = 'hidden';
    
    // Create loading screen
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <i class="fas fa-file-pdf loader-icon"></i>
            <div class="loader-text">PDF Mobile</div>
            <div class="loader-progress">
                <div class="loader-bar"></div>
            </div>
        </div>
    `;
    
    // Add loader styles
    const loaderStyles = `
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            color: white;
        }
        
        .loader-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            animation: bounce 1s infinite;
        }
        
        .loader-text {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 30px;
        }
        
        .loader-progress {
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .loader-bar {
            width: 0%;
            height: 100%;
            background: white;
            border-radius: 2px;
            animation: loadProgress 2s ease-in-out;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes loadProgress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = loaderStyles;
    document.head.appendChild(style);
    
    body.appendChild(loader);
    
    // Hide loader after animation
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
            style.remove();
            body.style.overflow = 'auto';
        }, 500);
    }, 2500);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showLoadingAnimation();
    initAnimations();
    initPhoneAnimations();
    initParallax();
    initToolsCounter();
    addDemoIndicators();
    
    // Wait for API script to load and then setup tools
    setTimeout(() => {
        setupToolInteractions();
    }, 1000);
});

// Setup tool interactions
function setupToolInteractions() {
    document.querySelectorAll('.tool-card').forEach(card => {
        // Remove any existing event listeners
        card.replaceWith(card.cloneNode(true));
    });
    
    // Re-select cards after cloning
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', async () => {
            const toolName = card.querySelector('h4').textContent;
            console.log('Tool clicked:', toolName);
            
            try {
                // Check if backend is running
                const backendRunning = await checkBackendStatus();
                
                if (!backendRunning) {
                    showBackendNotRunningModal(toolName);
                    return;
                }
                
                // Show processing modal
                showProcessingModal(toolName);
                
            } catch (error) {
                console.error('Error clicking tool:', error);
                showSimpleModal(toolName);
            }
        });
    });
}

// Simple backend check function
async function checkBackendStatus() {
    try {
        const response = await fetch('http://localhost:3000/health');
        return response.ok;
    } catch (error) {
        console.error('Backend check failed:', error);
        return false;
    }
}

// Simple modal for when backend is not running
function showBackendNotRunningModal(toolName) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="background: rgba(0, 0, 0, 0.9); position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; display: flex; align-items: center; justify-content: center;" onclick="this.remove()">
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; text-align: center; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
                <div style="font-size: 3rem; color: #FF6B6B; margin-bottom: 20px;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">Backend Server Required</h3>
                <p style="color: #666; margin-bottom: 25px;">To use ${toolName}, please ensure the backend server is running at http://localhost:3000</p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-family: monospace; text-align: left;">
                    <div style="color: #333; margin-bottom: 5px;">npm install</div>
                    <div style="color: #333;">npm start</div>
                </div>
                <button onclick="this.closest('div').remove()" style="background: linear-gradient(135deg, #FF6B6B, #4ECDC4); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Got it!</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Show processing modal
function showProcessingModal(toolName) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="background: rgba(0, 0, 0, 0.9); position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; text-align: center; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
                <div style="font-size: 3rem; color: #FF6B6B; margin-bottom: 20px;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">${toolName}</h3>
                <p style="color: #666; margin-bottom: 25px;">Upload your file to process with ${toolName}</p>
                
                <div style="border: 2px dashed #4ECDC4; padding: 30px; border-radius: 10px; margin-bottom: 20px; cursor: pointer; transition: all 0.3s ease;" class="upload-area">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 2rem; color: #4ECDC4; margin-bottom: 10px;"></i>
                    <p style="color: #666; margin: 0;">Click here to select file or drag & drop</p>
                    <p style="color: #999; margin: 5px 0 0 0; font-size: 0.85rem;">Supported: PDF, JPG, PNG</p>
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button class="process-btn" style="background: linear-gradient(135deg, #FF6B6B, #4ECDC4); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; opacity: 0.5;" disabled>Process File</button>
                    <button onclick="this.closest('div').remove()" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Cancel</button>
                </div>
                
                <input type="file" class="file-input" style="display: none;" accept=".pdf,.jpg,.jpeg,.png">
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup file upload functionality
    const uploadArea = modal.querySelector('.upload-area');
    const processBtn = modal.querySelector('.process-btn');
    const fileInput = modal.querySelector('.file-input');
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            uploadArea.innerHTML = `
                <i class="fas fa-file-check" style="font-size: 2rem; color: #28a745; margin-bottom: 10px;"></i>
                <p style="color: #28a745; margin: 0; font-weight: 600;">${fileName}</p>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 0.9rem;">Ready for processing</p>
            `;
            processBtn.disabled = false;
            processBtn.style.opacity = '1';
        }
    });
    
    processBtn.addEventListener('click', () => {
        if (fileInput.files.length > 0) {
            processFile(modal, toolName, fileInput.files[0]);
        }
    });
}

// Process file function
async function processFile(modal, toolName, file) {
    const modalContent = modal.querySelector('div > div');
    
    // Show processing state
    modalContent.innerHTML = `
        <div style="font-size: 3rem; color: #4ECDC4; margin-bottom: 20px;">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
        <h3 style="color: #2c3e50; margin-bottom: 15px;">Processing ${toolName}...</h3>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <div style="background: linear-gradient(90deg, #FF6B6B, #4ECDC4); height: 4px; border-radius: 2px; width: 0%; animation: realProgress 3s ease-in-out forwards;"></div>
        </div>
        <p style="color: #666;">Processing your file...</p>
    `;
    
    // Add progress animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes realProgress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
    `;
    document.head.appendChild(style);
    
    try {
        // Simulate API call for now
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Show success
        modalContent.innerHTML = `
            <div style="font-size: 3rem; color: #28a745; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Processing Complete!</h3>
            <p style="color: #666; margin-bottom: 25px;">Your file has been processed successfully with ${toolName}</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="alert('Download feature coming soon!')" style="background: linear-gradient(135deg, #28a745, #20c997); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Download Result</button>
                <button onclick="this.closest('div').remove()" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
            </div>
        `;
        
    } catch (error) {
        modalContent.innerHTML = `
            <div style="font-size: 3rem; color: #dc3545; margin-bottom: 20px;">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Processing Failed</h3>
            <p style="color: #666; margin-bottom: 25px;">Error: ${error.message}</p>
            <button onclick="this.closest('div').remove()" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
        `;
    } finally {
        style.remove();
    }
}

// Simple modal fallback
function showSimpleModal(toolName) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="background: rgba(0, 0, 0, 0.9); position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; display: flex; align-items: center; justify-content: center;" onclick="this.remove()">
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; text-align: center; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
                <div style="font-size: 3rem; color: #FF6B6B; margin-bottom: 20px;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">${toolName}</h3>
                <p style="color: #666; margin-bottom: 20px;">Tool functionality will be available soon!</p>
                <button onclick="this.closest('div').remove()" style="background: linear-gradient(135deg, #FF6B6B, #4ECDC4); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Got it!</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Add working demo indicators to tool cards
function addDemoIndicators() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        const indicator = document.createElement('div');
        indicator.innerHTML = '<i class="fas fa-play-circle"></i> Try Demo';
        indicator.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        card.style.position = 'relative';
        card.appendChild(indicator);
        
        card.addEventListener('mouseenter', () => {
            indicator.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            indicator.style.opacity = '0';
        });
    });
}
    const categories = document.querySelectorAll('.tools-category');
    categories.forEach(category => {
        const toolCount = category.querySelectorAll('.tool-card').length;
        const categoryTitle = category.querySelector('.category-title');
        
        // Add tool count badge
        const badge = document.createElement('span');
        badge.textContent = toolCount;
        badge.style.cssText = `
            background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-left: 10px;
            min-width: 20px;
            text-align: center;
        `;
        
        categoryTitle.appendChild(badge);
    });
    
    // Add total tools count to main title
    const totalTools = document.querySelectorAll('.tool-card').length;
    const mainTitle = document.querySelector('.tools .section-title');
    if (mainTitle) {
        const totalBadge = document.createElement('span');
        totalBadge.textContent = `${totalTools} Tools`;
        totalBadge.style.cssText = `
            display: block;
            font-size: 1rem;
            font-weight: 500;
            color: #FF6B6B;
            margin-top: 10px;
        `;
        mainTitle.appendChild(totalBadge);
    }
}

// Add working demo indicators to tool cards
function addDemoIndicators() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        const indicator = document.createElement('div');
        indicator.innerHTML = '<i class="fas fa-play-circle"></i> Try Demo';
        indicator.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        card.style.position = 'relative';
        card.appendChild(indicator);
        
        card.addEventListener('mouseenter', () => {
            indicator.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            indicator.style.opacity = '0';
        });
    });
}

// Download button interactions
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        btn.style.position = 'relative';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Show download message
        const message = document.createElement('div');
        message.textContent = 'Download will start soon...';
        message.style.position = 'fixed';
        message.style.top = '100px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.background = 'rgba(0, 0, 0, 0.8)';
        message.style.color = 'white';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '5px';
        message.style.zIndex = '1000';
        message.style.fontSize = '14px';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    });
});

// Add ripple effect to buttons
const rippleStyle = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const rippleStyleElement = document.createElement('style');
rippleStyleElement.textContent = rippleStyle;
document.head.appendChild(rippleStyleElement);

// Card hover effects
document.querySelectorAll('.tool-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click functionality for tool cards
    if (card.classList.contains('tool-card')) {
        card.addEventListener('click', async () => {
            const toolName = card.querySelector('h4').textContent;
            
            // Check if backend is running
            const backendRunning = await checkBackendStatus();
            
            if (!backendRunning) {
                showBackendNotRunningModal(toolName);
                return;
            }
            
            // Get accepted file types for this tool
            const acceptedTypes = TOOL_FILE_TYPES[toolName] || ['.pdf'];
            const accept = acceptedTypes.join(',');
            
            // Create file input for real processing
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = accept;
            fileInput.multiple = toolName === 'Merge PDF' || toolName === 'JPG to PDF';
            fileInput.style.display = 'none';
            
            // Create and show real processing modal
            const modal = createProcessingModal(toolName, acceptedTypes);
            document.body.appendChild(modal);
            document.body.appendChild(fileInput);
            
            const uploadArea = modal.querySelector('.upload-area');
            const processBtn = modal.querySelector('.process-btn');
            let selectedFiles = null;
            
            // Handle file upload
            uploadArea.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    selectedFiles = Array.from(e.target.files);
                    updateUploadArea(uploadArea, selectedFiles, processBtn);
                }
            });
            
            // Handle drag and drop
            setupDragAndDrop(uploadArea, (files) => {
                selectedFiles = files;
                updateUploadArea(uploadArea, selectedFiles, processBtn);
            });
            
            // Handle process button
            processBtn.addEventListener('click', async () => {
                if (!selectedFiles || selectedFiles.length === 0) return;
                
                try {
                    await processFilesWithRealAPI(modal, toolName, selectedFiles);
                } catch (error) {
                    showErrorInModal(modal, error.message);
                }
            });
            
            // Remove modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    fileInput.remove();
                }
            });
        });
    }
});

// Platform button interactions
document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add click animation
        btn.style.transform = 'translateY(-5px) scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'translateY(-5px) scale(1)';
        }, 150);
        
        // Show platform message
        const platform = btn.querySelector('span').textContent;
        const message = document.createElement('div');
        message.textContent = `${platform} version coming soon!`;
        message.style.position = 'fixed';
        message.style.top = '100px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.background = 'rgba(76, 175, 80, 0.9)';
        message.style.color = 'white';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '5px';
        message.style.zIndex = '1000';
        message.style.fontSize = '14px';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2500);
    });
});

// Social media link interactions
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add rotation animation
        link.style.transform = 'translateY(-2px) rotate(360deg)';
        setTimeout(() => {
            link.style.transform = 'translateY(-2px) rotate(0deg)';
        }, 300);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        }
    }, 3000);
});

// Performance optimization - Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(updateScrollIndicator, 10));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Accessibility improvements
document.querySelectorAll('button, a, .tool-card, .feature-card').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #FF6B6B';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

console.log('🎉 PDF Mobile website loaded successfully!');

// Helper Functions for Real API Integration

function showBackendNotRunningModal(toolName) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="background: rgba(0, 0, 0, 0.9); position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; text-align: center; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
                <div style="font-size: 3rem; color: #FF6B6B; margin-bottom: 20px;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">Backend Server Required</h3>
                <p style="color: #666; margin-bottom: 25px;">To use ${toolName}, please start the backend server:</p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-family: monospace; text-align: left;">
                    <div style="color: #333; margin-bottom: 5px;">npm install</div>
                    <div style="color: #333;">npm start</div>
                </div>
                <button onclick="this.closest('div').remove()" style="background: linear-gradient(135deg, #FF6B6B, #4ECDC4); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Got it!</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function createProcessingModal(toolName, acceptedTypes) {
    const modal = document.createElement('div');
    const typesList = acceptedTypes.map(type => type.toUpperCase().replace('.', '')).join(', ');
    
    modal.innerHTML = `
        <div style="background: rgba(0, 0, 0, 0.9); position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%; text-align: center; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
                <div style="font-size: 3rem; color: #FF6B6B; margin-bottom: 20px;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">${toolName}</h3>
                <p style="color: #666; margin-bottom: 25px;">Upload your ${typesList} file(s) to process</p>
                
                <div style="border: 2px dashed #4ECDC4; padding: 30px; border-radius: 10px; margin-bottom: 20px; cursor: pointer; transition: all 0.3s ease;" class="upload-area">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 2rem; color: #4ECDC4; margin-bottom: 10px;"></i>
                    <p style="color: #666; margin: 0;">Click here to select file or drag & drop</p>
                    <p style="color: #999; margin: 5px 0 0 0; font-size: 0.85rem;">Supported: ${typesList}</p>
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button class="process-btn" style="background: linear-gradient(135deg, #FF6B6B, #4ECDC4); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; opacity: 0.5;" disabled>Process File</button>
                    <button onclick="this.closest('div').remove()" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function updateUploadArea(uploadArea, files, processBtn) {
    const fileCount = files.length;
    const fileName = fileCount === 1 ? files[0].name : `${fileCount} files selected`;
    
    uploadArea.innerHTML = `
        <i class="fas fa-file-check" style="font-size: 2rem; color: #28a745; margin-bottom: 10px;"></i>
        <p style="color: #28a745; margin: 0; font-weight: 600;">${fileName}</p>
        <p style="color: #666; margin: 5px 0 0 0; font-size: 0.9rem;">Ready for processing</p>
    `;
    processBtn.disabled = false;
    processBtn.style.opacity = '1';
}

function setupDragAndDrop(uploadArea, onFilesSelected) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#FF6B6B';
        uploadArea.style.backgroundColor = '#f8f9fa';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#4ECDC4';
        uploadArea.style.backgroundColor = 'white';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#4ECDC4';
        uploadArea.style.backgroundColor = 'white';
        
        if (e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);
            onFilesSelected(files);
        }
    });
}

async function processFilesWithRealAPI(modal, toolName, files) {
    const modalContent = modal.querySelector('div > div');
    
    // Show processing state
    modalContent.innerHTML = `
        <div style="font-size: 3rem; color: #4ECDC4; margin-bottom: 20px;">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
        <h3 style="color: #2c3e50; margin-bottom: 15px;">Processing ${toolName}...</h3>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <div style="background: linear-gradient(90deg, #FF6B6B, #4ECDC4); height: 4px; border-radius: 2px; width: 0%; animation: realProgress 2s ease-in-out forwards;"></div>
        </div>
        <p style="color: #666;">Processing your file with real PDF tools...</p>
    `;
    
    // Add progress animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes realProgress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
    `;
    document.head.appendChild(style);
    
    try {
        // Call real API
        const result = await processFileWithAPI(toolName, files.length === 1 ? files[0] : files);
        
        // Show success state
        showSuccessResult(modalContent, toolName, result);
        
    } catch (error) {
        showErrorInModal(modal, error.message);
    } finally {
        style.remove();
    }
}

function showSuccessResult(modalContent, toolName, result) {
    if (result.files && result.files.length > 1) {
        // Multiple files result (like split PDF)
        modalContent.innerHTML = `
            <div style="font-size: 3rem; color: #28a745; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Processing Complete!</h3>
            <p style="color: #666; margin-bottom: 25px;">${result.message}</p>
            <div style="max-height: 200px; overflow-y: auto; margin-bottom: 20px;">
                ${result.files.map((file, index) => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee;">
                        <span style="color: #666;">Page ${file.page || index + 1}</span>
                        <button onclick="downloadFile('${file.downloadUrl}', 'page-${file.page || index + 1}.pdf')" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 0.85rem;">Download</button>
                    </div>
                `).join('')}
            </div>
            <button onclick="this.closest('div').remove()" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
        `;
    } else {
        // Single file result
        modalContent.innerHTML = `
            <div style="font-size: 3rem; color: #28a745; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Processing Complete!</h3>
            <p style="color: #666; margin-bottom: 25px;">${result.message}</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="downloadFile('${result.downloadUrl}', 'processed-file.pdf')" style="background: linear-gradient(135deg, #28a745, #20c997); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Download Result</button>
                <button onclick="this.closest('div').remove()" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
            </div>
        `;
    }
}

function showErrorInModal(modal, errorMessage) {
    const modalContent = modal.querySelector('div > div');
    modalContent.innerHTML = `
        <div style="font-size: 3rem; color: #dc3545; margin-bottom: 20px;">
            <i class="fas fa-exclamation-circle"></i>
        </div>
        <h3 style="color: #2c3e50; margin-bottom: 15px;">Processing Failed</h3>
        <p style="color: #666; margin-bottom: 25px;">${errorMessage}</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button onclick="location.reload()" style="background: linear-gradient(135deg, #FF6B6B, #4ECDC4); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Try Again</button>
            <button onclick="this.closest('div').remove()" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
        </div>
    `;
}