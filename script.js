document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Fade In Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- 2. Mobile Menu (Smooth Transition) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('is-active'); // Triggers X animation
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('is-active');
        });
    });

    // --- 3. Form Validation & Custom Alert ---
    const contactForm = document.getElementById('contactForm');
    const customAlert = document.getElementById('custom-alert');
    const alertContent = customAlert.querySelector('.alert-content');
    const alertTitle = document.getElementById('alert-title');
    const alertMsg = document.getElementById('alert-msg');
    const closeAlertBtn = document.getElementById('close-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Check if fields are empty
            if (!name || !email || !message) {
                // Show Error Alert
                alertContent.classList.add('error');
                alertTitle.innerText = 'Missing Information';
                alertMsg.innerText = 'Please fill out all fields before sending.';
                customAlert.classList.add('active');
                return; // Stop execution
            }

            // If valid, proceed to "Send"
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show Success Alert
                alertContent.classList.remove('error'); // Remove error style
                alertTitle.innerText = 'Message Sent!';
                alertMsg.innerText = 'Thanks for reaching out. I\'ll get back to you shortly.';
                customAlert.classList.add('active');
                
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Close Alert
    if (closeAlertBtn) {
        closeAlertBtn.addEventListener('click', () => {
            customAlert.classList.remove('active');
        });
    }

    // Close if clicking outside
    if (customAlert) {
        customAlert.addEventListener('click', (e) => {
            if (e.target === customAlert) {
                customAlert.classList.remove('active');
            }
        });
    }
});

/* ==========================
   TRUE INFINITE MARQUEE
========================== */
const marqueeTrack = document.querySelector('.marquee-track');

if (marqueeTrack) {
    // Duplicate content until we exceed viewport width
    const originalContent = marqueeTrack.innerHTML;

    while (marqueeTrack.scrollWidth < window.innerWidth * 2) {
        marqueeTrack.innerHTML += originalContent;
    }

    let scrollPos = 0;
    const speed = 0.5; // adjust speed here

    function animateMarquee() {
        scrollPos += speed;

        if (scrollPos >= marqueeTrack.scrollWidth / 2) {
            scrollPos = 0;
        }

        marqueeTrack.style.transform = `translateX(-${scrollPos}px)`;
        requestAnimationFrame(animateMarquee);
    }

    animateMarquee();
}