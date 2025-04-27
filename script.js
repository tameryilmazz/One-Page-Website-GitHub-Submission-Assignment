document.addEventListener('DOMContentLoaded', () => {
    // Initialize Hero Slider
    initHeroSlider();
    
    // Initialize Mobile Menu
    initMobileMenu();
    
    // Initialize Search Overlay
    initSearchOverlay();
    
    // Initialize Featured Products Tabs
    initTabs();
    
    // Initialize Countdown Timer
    initCountdownTimer();
    
    // Initialize Back to Top Button
    initBackToTop();
    
    // Initialize Mobile Submenu Toggles
    initMobileSubmenu();
});

// Hero Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;

    // Initialize the first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
        dots[0].classList.add('active');
    }

    // Auto slide functionality
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            moveToNextSlide();
        }, 5000);
    }

    // Start auto sliding
    startSlideInterval();

    // Functions to control slides
    function moveToSlide(slideIndex) {
        // Clear active classes
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');

        // Update current slide index
        currentSlide = slideIndex;
    }

    function moveToNextSlide() {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) {
            nextSlide = 0;
        }
        moveToSlide(nextSlide);
    }

    function moveToPrevSlide() {
        let prevSlide = currentSlide - 1;
        if (prevSlide < 0) {
            prevSlide = slides.length - 1;
        }
        moveToSlide(prevSlide);
    }

    // Event listeners for slider controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            moveToPrevSlide();
            startSlideInterval();
        });

        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            moveToNextSlide();
            startSlideInterval();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            moveToSlide(index);
            startSlideInterval();
        });
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const body = document.body;

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Search Overlay Functionality
function initSearchOverlay() {
    const searchIcons = document.querySelectorAll('.search-icon');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-form input');
    const body = document.body;

    if (searchIcons.length && searchOverlay) {
        searchIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                searchOverlay.classList.add('active');
                body.style.overflow = 'hidden';
                if (searchInput) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 100);
                }
            });
        });

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchOverlay.classList.remove('active');
                body.style.overflow = '';
            });
        }

        // Close search overlay when pressing ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Tabs Functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to current button
                btn.classList.add('active');

                // Show the corresponding tab content
                const tabId = btn.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });

        // Activate first tab by default
        if (tabBtns[0] && tabContents[0]) {
            tabBtns[0].click();
        }
    }
}

// Countdown Timer
function initCountdownTimer() {
    const countdownEl = document.querySelector('.countdown');
    
    if (!countdownEl) return;
    
    // Set the countdown date (24 hours from now)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 1);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown elements
        document.querySelector('.countdown-days .countdown-number').textContent = days;
        document.querySelector('.countdown-hours .countdown-number').textContent = hours;
        document.querySelector('.countdown-minutes .countdown-number').textContent = minutes;
        document.querySelector('.countdown-seconds .countdown-number').textContent = seconds;
        
        // If the countdown is finished, reset it to 24 hours
        if (distance < 0) {
            countdownDate.setDate(countdownDate.getDate() + 1);
        }
    }
    
    // Update the countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Mobile Submenu Toggle
function initMobileSubmenu() {
    const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
    
    if (mobileSubmenuToggles.length) {
        mobileSubmenuToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = toggle.closest('.mobile-submenu');
                
                // Close other open submenus
                document.querySelectorAll('.mobile-submenu.active').forEach(submenu => {
                    if (submenu !== parent) {
                        submenu.classList.remove('active');
                    }
                });
                
                // Toggle current submenu
                parent.classList.toggle('active');
            });
        });
    }
}

// Add to Cart Functionality
function addToCart(productId, productName, price, image) {
    // Get the current cart or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    
    if (existingProductIndex !== -1) {
        // Product exists, increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            id: productId,
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update the cart count display
    updateCartCount();
    
    // Show notification
    showNotification('Ürün sepete eklendi!');
}

// Update Cart Count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total items in cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update all cart count elements
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Show Notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.classList.add('notification');
        document.body.appendChild(notification);
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.backgroundColor = 'var(--secondary)';
        notification.style.color = 'var(--primary)';
        notification.style.borderRadius = 'var(--radius)';
        notification.style.boxShadow = 'var(--shadow)';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease';
        notification.style.zIndex = '9999';
        notification.style.fontWeight = '500';
    }
    
    // Set the message
    notification.textContent = message;
    
    // Show the notification
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
    }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Add event listeners to the add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = button.closest('.product-card');
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('.product-title').textContent;
            const price = product.querySelector('.current-price').textContent.replace(/[^\d.-]/g, '');
            const image = product.querySelector('.product-image img').getAttribute('src');
            
            addToCart(productId, productName, parseFloat(price), image);
        });
    });
}); 