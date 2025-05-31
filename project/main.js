const loader = document.getElementById('loader');
const bar = document.querySelector('.loader-bar');
const percent = document.querySelector('.loader-percent');

// Custom progress steps
const steps = [10, 50, 75, 100];
let index = 0;

const interval = setInterval(() => {
    const value = steps[index];
    bar.style.width = value + '%';
    percent.textContent = value + '%';

    index++;

    if (index >= steps.length) {
        clearInterval(interval);
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
}, 500);

// Typing animation for role
const roles = ["Full Stack Developer", "React Developer", "Node.js Developer", "JavaScript Expert"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000;

function typeRole() {
    const currentRole = roles[roleIndex];
    const typedRole = document.getElementById('typed-role');
    
    if (isDeleting) {
        // Erasing text
        typedRole.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        // Typing text
        typedRole.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }
    
    // If completed typing the word
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    }
    
    // If completed deleting the word
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    
    setTimeout(typeRole, typingDelay);
}

// Start typing animation after loader is complete
setTimeout(() => {
    typeRole();
}, 2500);


document.addEventListener('click', function (e) {
    const circle = document.createElement('div');
    circle.classList.add('click-circle');

    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;

    document.body.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 600);
});

