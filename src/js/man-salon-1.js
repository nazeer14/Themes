
// ─── SCISSORS CURSOR ───
const sc = document.getElementById('scissorsCursor');
let scx = 0, scy = 0, angle = -35;

document.addEventListener('mousemove', e => {
  const dx = e.clientX - scx;
  const dy = e.clientY - scy;
  scx = e.clientX;
  scy = e.clientY;
  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    angle = Math.atan2(dy, dx) * (180 / Math.PI);
  }
  sc.style.left = scx + 'px';
  sc.style.top  = scy + 'px';
  sc.style.transform = `translate(-4px,-4px) rotate(${angle}deg)`;
  sc.style.filter = `drop-shadow(0 2px 10px rgba(184,145,42,0.5))`;
});

// Snip animation on click & on hovering interactive elements
document.addEventListener('click', () => {
  sc.classList.add('snip');
  setTimeout(() => sc.classList.remove('snip'), 220);
});

document.querySelectorAll('a, button, .service-card, .testimonial-card, .team-card, .nav-cta, .btn-primary, .btn-book').forEach(el => {
  el.addEventListener('mouseenter', () => {
    sc.classList.add('snip');
    setTimeout(() => sc.classList.remove('snip'), 220);
    sc.style.filter = 'drop-shadow(0 2px 18px rgba(184,145,42,0.85))';
  });
  el.addEventListener('mouseleave', () => {
    sc.style.filter = 'drop-shadow(0 2px 10px rgba(184,145,42,0.5))';
  });
});


// Scroll behaviors
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scroll / totalHeight) * 100;
  scrollProgress.style.width = progress + '%';
  navbar.classList.toggle('scrolled', scroll > 60);
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// ─── SHOP FILTER ───
function filterSC(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.sc').forEach(card => {
    const match = cat === 'all' || card.dataset.sc === cat;
    card.style.opacity = match ? '1' : '0.3';
    card.style.pointerEvents = match ? 'auto' : 'none';
  });
}

// Quick book shortcut — scrolls to booking and pre-selects service
function quickSC(svc) {
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const sel = document.getElementById('serviceInput');
    if (sel) {
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.toLowerCase().includes(svc.toLowerCase())) {
          sel.selectedIndex = i; break;
        }
      }
    }
  }, 700);
}

// Wishlist heart toggle
function toggleWish(el) {
  el.classList.toggle('liked');
  el.textContent = el.classList.contains('liked') ? '♥' : '♡';
}

// Time slot selection
function selectTime(el) {
  document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// Set min date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('dateInput').setAttribute('min', today);

// Booking form submission
function submitBooking() {
  const name = document.getElementById('nameInput').value.trim();
  const phone = document.getElementById('phoneInput').value.trim();
  const service = document.getElementById('serviceInput').value;
  const date = document.getElementById('dateInput').value;
  const time = document.querySelector('.time-slot.active');

  if (!name || !phone || !service || !date || !time) {
    const form = document.querySelector('.booking-form');
    form.style.border = '1px solid rgba(255,80,80,0.4)';
    setTimeout(() => { form.style.border = '1px solid rgba(184,145,42,0.15)'; }, 1200);
    return;
  }

  const id = 'NOIR-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('bookingId').textContent = id;
  document.getElementById('bookingSuccess').classList.add('show');
}

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
