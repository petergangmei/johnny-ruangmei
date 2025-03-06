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
});
