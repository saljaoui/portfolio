// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // ===== LOADING SCREEN =====
    window.addEventListener('load', () => {
      document.querySelector('.loader').classList.add('fade-out');
    });
  
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // ===== REVEAL ANIMATIONS ON SCROLL =====
    const reveals = document.querySelectorAll('.reveal');
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
          reveal.classList.add('active');
        }
      });
    });
  
    // ===== HAMBURGER MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  
    // ===== PROJECT FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projects.forEach(project => {
          project.style.display = (filter === 'all' || project.dataset.category === filter) ? 'block' : 'none';
        });
      });
    });
  
    // ===== STATS COUNTER =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsStarted = false;
    function startCount() {
      statNumbers.forEach(stat => {
        let goal = +stat.getAttribute('data-count');
        let count = 0;
        let step = Math.ceil(goal / 100);
        let interval = setInterval(() => {
          count += step;
          if (count >= goal) {
            stat.textContent = goal + '+';
            clearInterval(interval);
          } else {
            stat.textContent = count + '+';
          }
        }, 20);
      });
    }
    window.addEventListener('scroll', () => {
      const statsSection = document.querySelector('.stats-container');
      const statsTop = statsSection.getBoundingClientRect().top;
      if (statsTop < window.innerHeight && !statsStarted) {
        statsStarted = true;
        startCount();
      }
    });
  
    // ===== TYPED HERO TEXT =====
    const typedText = document.querySelector('.typed-text');
    const words = ["responsive web applications", "beautiful user interfaces", "scalable backends"];
    let wordIndex = 0;
    let charIndex = 0;
    let typing = true;
  
    function typeEffect() {
      if (typing) {
        if (charIndex < words[wordIndex].length) {
          typedText.textContent += words[wordIndex].charAt(charIndex);
          charIndex++;
          setTimeout(typeEffect, 100);
        } else {
          typing = false;
          setTimeout(typeEffect, 2000);
        }
      } else {
        if (charIndex > 0) {
          typedText.textContent = words[wordIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(typeEffect, 50);
        } else {
          typing = true;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typeEffect, 500);
        }
      }
    }
    typeEffect();
  
  });
  