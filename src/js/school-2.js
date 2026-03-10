
// NAVBAR SCROLL
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

// HAMBURGER
document.getElementById('hamburger').addEventListener('click', () => document.getElementById('mobNav').classList.add('open'));
document.getElementById('mobClose').addEventListener('click', () => document.getElementById('mobNav').classList.remove('open'));
function closeMob() { document.getElementById('mobNav').classList.remove('open'); }

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => ro.observe(el));

// TESTIMONIALS
const track = document.getElementById('testiTrack');
const dotsWrap = document.getElementById('testiDots');
const cards = track.querySelectorAll('.testi-card');
let cur = 0;

const visCount = () => window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
const totalSlides = () => Math.ceil(cards.length / visCount());

function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
        const d = document.createElement('div');
        d.className = 't-dot' + (i === cur ? ' active' : '');
        d.onclick = () => { cur = i; update(); };
        dotsWrap.appendChild(d);
    }
}

function update() {
    const w = cards[0].offsetWidth + 22;
    track.style.transform = `translateX(-${cur * visCount() * w}px)`;
    buildDots();
}

document.getElementById('testiNext').onclick = () => { cur = (cur + 1) % totalSlides(); update(); };
document.getElementById('testiPrev').onclick = () => { cur = (cur - 1 + totalSlides()) % totalSlides(); update(); };
buildDots();
window.addEventListener('resize', () => { cur = 0; update(); });
setInterval(() => { cur = (cur + 1) % totalSlides(); update(); }, 5500);

// COUNTER ANIMATION
function animateCounters() {
    document.querySelectorAll('.hstat-num').forEach(el => {
        const raw = el.textContent;
        const num = parseInt(raw.replace(/\D/g, ''));
        const sup = el.querySelector('sup') ? el.querySelector('sup').outerHTML : '';
        const suffix = raw.replace(/[0-9,]/g, '').replace(/<[^>]+>/g, '');
        let n = 0, step = num / 60;
        const t = setInterval(() => {
            n = Math.min(n + step, num);
            el.innerHTML = Math.floor(n).toLocaleString() + sup;
            if (n >= num) clearInterval(t);
        }, 24);
    });
}

new IntersectionObserver(e => { if (e[0].isIntersecting) { animateCounters(); } }, { threshold: 0.5 })
    .observe(document.querySelector('.hero-stats'));
