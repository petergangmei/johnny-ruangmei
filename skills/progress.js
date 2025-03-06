/**
 * Progress.js - Handles the skill progress circles animation
 * For Johnny Ruangmei's Portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all progress circles
    initProgressCircles();
});

/**
 * Initialize all progress circles by setting their percentage values
 */
function initProgressCircles() {
    // Get all elements with percentage values
    const percentageElements = document.querySelectorAll('.percentage');
    
    // For each percentage element, set up the corresponding progress circle
    percentageElements.forEach(element => {
        // Get the percentage text (e.g., "75%")
        const percentageText = element.textContent;
        // Extract just the number (e.g., 75)
        const percentageValue = parseInt(percentageText);
        // Get the parent circle element
        const circleElement = element.closest('.circle-progress');
        
        // Set the CSS variable for the percentage
        circleElement.style.setProperty('--percentage', percentageValue);
        
        // Start animation after a small delay for a nicer effect
        setTimeout(() => {
            // Add class to trigger animation if needed
            circleElement.classList.add('animated');
            
            // Optional: Animate counting up the percentage
            animateCounter(element, 0, percentageValue);
        }, 300);
    });
}

/**
 * Animate counting up from start to end value
 * @param {Element} element - The DOM element to update
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 */
function animateCounter(element, start, end) {
    const duration = 1500; // Animation duration in milliseconds
    const frameDuration = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = (end - start) / totalFrames;
    
    let currentValue = start;
    let frame = 0;
    
    // Animation function
    const animate = () => {
        frame++;
        currentValue += increment;
        
        // Update the element's text
        element.textContent = `${Math.floor(currentValue)}%`;
        
        // Continue animation if not complete
        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        } else {
            // Ensure the final value is exactly the target
            element.textContent = `${end}%`;
        }
    };
    
    // Start animation
    animate();
} 