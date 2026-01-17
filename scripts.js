// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // ===== MENÚ MÓVIL =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== ANIMACIÓN DE CONTADORES =====
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // ===== OBSERVER PARA ANIMACIONES AL SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animar contadores cuando sean visibles
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.featured-card, .about-text, .about-image');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // ===== ANIMACIÓN DE TARJETAS AL HOVER =====
    const cards = document.querySelectorAll('.featured-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // ===== SMOOTH SCROLL PARA ENLACES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMACIÓN DE PARTÍCULAS PARA EL HERO =====
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            hero.appendChild(particle);
            
            // Animar partículas
            animateParticle(particle);
        }
    }
    
    function animateParticle(particle) {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let xSpeed = (Math.random() - 0.5) * 0.3;
        let ySpeed = (Math.random() - 0.5) * 0.3;
        
        function move() {
            x += xSpeed;
            y += ySpeed;
            
            // Rebotar en los bordes
            if (x <= 0 || x >= 100) xSpeed *= -1;
            if (y <= 0 || y >= 100) ySpeed *= -1;
            
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            
            requestAnimationFrame(move);
        }
        
        move();
    }
    
    // Crear partículas después de cargar la página
    setTimeout(createParticles, 1000);
    
    // ===== EFECTO DE TYPING PARA EL HERO =====
    function typeWriterEffect() {
        const heroTitle = document.querySelector('.hero h1');
        if (!heroTitle) return;
        
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function type() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        
    }
    
    // Iniciar efecto de typing después de un delay
    setTimeout(typeWriterEffect, 500);
});