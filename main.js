/* 1. HEADER SHADOW ON SCROLL */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0);
});

/* 2. MOBILE MENU TOGGLE */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    navbar.querySelectorAll('a').forEach(link => {
        link.onclick = () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        };
    });
    
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target) && navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });
}

/* 3. DARK MODE TOGGLE + PERSISTENCE */
const darkmodeBtns = document.querySelectorAll('#darkmode, #darkmode-desktop');

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('active');
    darkmodeBtns.forEach(btn => {
        if (btn) btn.classList.replace('bx-moon', 'bx-sun');
    });
}

darkmodeBtns.forEach(btn => {
    if (btn) {
        btn.onclick = () => {
            const isDark = document.body.classList.toggle('active');
            localStorage.setItem('darkMode', isDark);
            
            darkmodeBtns.forEach(b => {
                if (isDark) {
                    b.classList.replace('bx-moon', 'bx-sun');
                } else {
                    b.classList.replace('bx-sun', 'bx-moon');
                }
            });
        };
    }
});

/* 4. TYPING EFFECT */
const typingText = document.querySelector(".typing");
if (typingText) {
    const roles = ["IT Graduate", "Full Stack Developer", "Software Enthusiast", "IT Support", "Networking", "Java Developer"];
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
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
}

/* 5. SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

/* 6. ACTIVE NAV LINK ON SCROLL */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

/* 7. CONTACT FORM (AJAX SUBMISSION) */
const contactForm = document.querySelector('.contact-form form');
const statusMessage = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        statusMessage.style.display = 'block';
        statusMessage.className = '';
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