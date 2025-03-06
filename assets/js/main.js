// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Split the subtitle into individual words
    const subtitle = document.querySelector('.hero-text h4');
    if (subtitle) {
        // Store the original text
        const originalText = subtitle.textContent;
        
        // Split the text into words and wrap each in a span
        const words = originalText.split(' ');
        subtitle.innerHTML = '';
        
        // Add each word with animation delay
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' '; // Space after each word
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.animation = `fadeInBlur 0.6s ease forwards ${1 + (index * 0.1)}s`;
            
            // Add extra margin to create more space between words
            span.style.marginRight = '0.4em';
            
            subtitle.appendChild(span);
        });
    }
    
    // No need to add a gradient-visible class anymore as
    // the gradient is applied from the start of the animation

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const sidebar = document.querySelector('.sidebar');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = sidebar.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close mobile menu when window is resized to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
