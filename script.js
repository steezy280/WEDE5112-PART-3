/**
 * The Green Canopy Initiative - Main JavaScript File
 * Handles global interactions and form validations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE NAVIGATION MENU TOGGLE
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        // Open/Close menu on button click
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling up
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked (useful for single-page anchors)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // ==========================================
    // 2. CONTACT FORM VALIDATION & AJAX SIMULATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page from reloading
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;

            // Hide all errors initially
            document.querySelectorAll('.error-msg').forEach(el => {
                el.style.display = 'none';
            });

            // Validate Name
            if (name === '') {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }

            // Validate Email (basic regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }

            // Validate Message
            if (message.length < 10) {
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }

            // If everything is valid, simulate AJAX submission
            if (isValid) {
                const responseDiv = document.getElementById('formResponse');
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                
                // UI Feedback: Loading state
                responseDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
                responseDiv.style.color = 'var(--leaf)';
                submitBtn.disabled = true;

                // Simulate network request (1.5 seconds delay)
                setTimeout(() => {
                    responseDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
                    responseDiv.style.color = 'green';
                    
                    // Reset form and button
                    contactForm.reset();
                    submitBtn.disabled = false;

                    // Optional: Clear success message after 5 seconds
                    setTimeout(() => { responseDiv.innerHTML = ''; }, 5000);
                }, 1500);
            }
        });
    }
});