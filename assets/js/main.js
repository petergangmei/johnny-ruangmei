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
    
    // Remove the previous hover effect that might conflict with CSS
    // We'll handle everything in CSS to prevent animation restart issues
    /*
    const name = document.querySelector('.hero-text h1 span:last-child');
    if (name) {
        name.addEventListener('mouseover', function() {
            this.style.color = '#ff6b00';
            this.style.transition = 'color 0.3s ease';
        });
        
        name.addEventListener('mouseout', function() {
            this.style.color = '#ccc';
            this.style.transition = 'color 0.3s ease';
        });
    }
    */
});
