
// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
function closeMob() { mobileMenu.classList.remove('open'); }

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// TESTIMONIALS CAROUSEL
const track = document.getElementById('testiTrack');
const dotsContainer = document.getElementById('testiDots');
const cards = track.querySelectorAll('.testi-card');
let current = 0;

function getVisible() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
}

function totalSlides() { return Math.ceil(cards.length / getVisible()); }

function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
        const d = document.createElement('div');
        d.className = 'testi-dot' + (i === current ? ' active' : '');
        d.addEventListener('click', () => { current = i; updateCarousel(); });
        dotsContainer.appendChild(d);
    }
}

function updateCarousel() {
    const vis = getVisible();
    const cardW = cards[0].offsetWidth + 24;
    const offset = current * vis * cardW;
    track.style.transform = `translateX(-${offset}px)`;
    buildDots();
}

document.getElementById('testiNext').addEventListener('click', () => {
    current = (current + 1) % totalSlides();
    updateCarousel();
});

document.getElementById('testiPrev').addEventListener('click', () => {
    current = (current - 1 + totalSlides()) % totalSlides();
    updateCarousel();
});

buildDots();
window.addEventListener('resize', () => { current = 0; updateCarousel(); });

// AUTO-PLAY
setInterval(() => {
    current = (current + 1) % totalSlides();
    updateCarousel();
}, 5000);

// SMOOTH COUNTER ANIMATION
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = stat.textContent;
        const num = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9,]/g, '');
        let current = 0;
        const step = num / 60;
        const timer = setInterval(() => {
            current += step;
            if (current >= num) {
                clearInterval(timer);
                stat.textContent = num.toLocaleString() + suffix;
            } else {
                stat.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, 25);
    });
}

const heroObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); heroObs.disconnect(); }
}, { threshold: 0.5 });
heroObs.observe(document.querySelector('.hero-stats'));
