document.addEventListener('DOMContentLoaded', () => {
    // 1. Floating Hearts Background
    const particlesContainer = document.getElementById('particles-container');
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💓'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        // Random horizontal position
        const startLeft = Math.random() * 100;
        heart.style.left = startLeft + 'vw';

        // Random size and speed properties
        const scale = 0.5 + Math.random() * 1.5;
        const duration = 10 + Math.random() * 15;
        const rotation = (Math.random() - 0.5) * 100;

        heart.style.setProperty('--scale', scale);
        heart.style.setProperty('--duration', duration + 's');
        heart.style.setProperty('--rotation', rotation + 'deg');

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);

        particlesContainer.appendChild(heart);
    }

    // Spawn hearts periodically
    setInterval(createHeart, 800);
    // Initial batch
    for (let i = 0; i < 10; i++) setTimeout(createHeart, Math.random() * 2000);

    // 2. Scroll Reveal Animation
    const revealSections = document.querySelectorAll('.reveal-section');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15
    });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    // 3. Music Control
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-control');
    const statusIcon = document.getElementById('play-status-icon');
    const statusText = document.getElementById('play-status-text');
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            music.pause();
            statusIcon.innerHTML = '▶';
            statusText.innerHTML = 'Play Our Song';
        } else {
            music.play().catch(e => console.log("Müzik çalma hatası:", e));
            statusIcon.innerHTML = '❚❚';
            statusText.innerHTML = 'Playing Now';
        }
        isPlaying = !isPlaying;
    }

    musicBtn.addEventListener('click', toggleMusic);

    // Prompt user on first click anywhere to start music (Standard autoplay bypass)
    const handleFirstInteraction = () => {
        if (!isPlaying) {
            toggleMusic();
        }
        document.removeEventListener('click', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);

    // 4. Smooth Navigation Fade
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 5. Hero Text Entry Animation
    const heroText = document.querySelector('.glitter-text');
    setTimeout(() => {
        heroText.style.opacity = '1';
    }, 500);

    // 6. Cursor Trail Effect
    document.addEventListener('mousemove', (e) => {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';

        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    });

    // 7. Rose Petal Rain
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'rose-petal';
        petal.style.left = Math.random() * 100 + 'vw';

        const duration = 15 + Math.random() * 10;
        petal.style.setProperty('--duration', duration + 's');

        document.getElementById('particles-container').appendChild(petal);
        setTimeout(() => petal.remove(), duration * 1000);
    }

    setInterval(createPetal, 1500);

    // 8. Scroll Progress Logic
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    });

    // 9. Together Timer Logic
    const startDate = new Date('2025-12-27T06:00:00');

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('together-timer').innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // 10. Make a Wish Logic (Multi-step Flow)
    const steps = {
        1: document.getElementById('wish-step-1'),
        2: document.getElementById('wish-step-2'),
        3: document.getElementById('wish-step-3'),
        4: document.getElementById('wish-step-4'),
        5: document.getElementById('wish-step-5')
    };

    function showStep(stepNum) {
        Object.values(steps).forEach(step => step.classList.remove('active-step'));
        if (steps[stepNum]) steps[stepNum].classList.add('active-step');
    }

    // Step 1 -> 2
    document.getElementById('start-wish')?.addEventListener('click', () => showStep(2));

    // Step 2 Decisions
    document.getElementById('btn-yes-know')?.addEventListener('click', () => showStep(5));
    document.getElementById('btn-no-know')?.addEventListener('click', () => showStep(3));

    // Step 3 Decisions (Are u sure?)
    document.getElementById('btn-yes-sure')?.addEventListener('click', () => showStep(4));
    document.getElementById('btn-no-sure')?.addEventListener('click', () => showStep(5));

    // Step 5 (Final Envelope)
    const envelope = document.getElementById('envelope-trigger');
    const finalMsg = document.getElementById('final-wish-message');
    envelope?.addEventListener('click', () => {
        envelope.style.display = 'none';
        finalMsg.style.display = 'block';
    });
});
