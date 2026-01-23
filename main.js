// Header Shadow on Scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Menu Toggle
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    navbar.classList.toggle('active');
}

// Dark Mode Toggle
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if(darkmode.classList.contains('bx-moon')){
        darkmode.classList.replace('bx-moon', 'bx-sun');
        document.body.classList.add('active');
    } else {
        darkmode.classList.replace('bx-sun', 'bx-moon');
        document.body.classList.remove('active');
    }
}

// Check if the form was submitted successfully
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('status') && urlParams.get('status') === 'success') {
        alert("Thank you, Tebogo has received your message! He will get back to you shortly.");
    }
}

const contactForm = document.querySelector('.contact-form form');
const statusMessage = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        // Show the success message immediately
        statusMessage.style.display = 'block';
        
        // Clear all input fields (Name, Email, Message)
        contactForm.reset(); 

        // Optional: Hide the success message again after 5 seconds
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    });
}