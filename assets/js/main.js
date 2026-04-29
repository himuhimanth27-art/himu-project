document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up').forEach((el) => {
        observer.observe(el);
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Dynamic Typing Effect (Only on home page)
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const textArray = ["Software Developer", "Creative Problem Solver", "Tech Enthusiast"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typingSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typingSpeed = 500; // Pause before starting new word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1000); // Initial delay
    }
});
