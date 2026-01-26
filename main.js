/* 1. HEADER SHADOW ON SCROLL */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0);
});

/* 2. DARK MODE TOGGLE */
const darkmode = document.querySelector('#darkmode');
if (darkmode) {
    darkmode.onclick = () => {
        if(darkmode.classList.contains('bx-moon')){
            darkmode.classList.replace('bx-moon', 'bx-sun');
            document.body.classList.add('active');
        } else {
            darkmode.classList.replace('bx-sun', 'bx-moon');
            document.body.classList.remove('active');
        }
    };
}

/* 3. TYPING EFFECT */
const typingText = document.querySelector(".typing");
if (typingText) {
    const roles = ["IT Graduate", "Full Stack Developer", "Software Enthusiast", "IT Support", "Networking"];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        typingText.textContent = isDeleting 
            ? currentRole.substring(0, charIndex - 1) 
            : currentRole.substring(0, charIndex + 1);
        
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    document.addEventListener("DOMContentLoaded", typeEffect);
}

/* 4. SMOOTH SCROLL FOR BUTTONS & NAV LINKS */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

/* 5. CONTACT FORM (AJAX SUBMISSION) */
const contactForm = document.querySelector('.contact-form form');
const statusMessage = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        statusMessage.style.display = 'block';
        statusMessage.innerText = "Sending...";

        fetch(event.target.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                statusMessage.className = "status-success";
                statusMessage.innerText = "Message sent successfully! Tebogo will get back to you soon.";
                contactForm.reset(); 
                setTimeout(() => { statusMessage.style.display = 'none'; }, 5000);
            } else {
                statusMessage.className = "status-error";
                statusMessage.innerText = "Oops! There was a problem submitting your form.";
            }
        }).catch(() => {
            statusMessage.className = "status-error";
            statusMessage.innerText = "Error: Could not connect to the server.";
        });
    });
}