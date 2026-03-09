
/* ─── CURSOR ─── */
const CUR = document.getElementById('CUR'), RING = document.getElementById('RING');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    CUR.style.left = mx + 'px'; CUR.style.top = my + 'px';
});
(function loop() {
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    RING.style.left = rx + 'px'; RING.style.top = ry + 'px';
    requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.tc,.stat-box,.ps,.tc2').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hover'));
});

/* ─── NAV SCROLL ─── */
const NAV = document.getElementById('NAV');
window.addEventListener('scroll', () => NAV.classList.toggle('scrolled', scrollY > 60));

/* ─── CATEGORY TABS ─── */
function switchTab(id, btn) {
    document.querySelectorAll('.tpanel').forEach(p => p.classList.remove('on'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
    const panel = document.getElementById('tp-' + id);
    panel.classList.add('on');
    btn.classList.add('on');
    // Animate cards in
    panel.querySelectorAll('.rv').forEach((el, i) => {
        el.classList.remove('in');
        setTimeout(() => el.classList.add('in'), 60 + i * 70);
    });
}

/* ─── SCROLL REVEAL ─── */
const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
}), { threshold: .1 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* ─── 3D TILT ON THEME CARDS ─── */
document.querySelectorAll('.tc').forEach(c => {
    c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
    });
    c.addEventListener('mouseleave', () => {
        c.style.transform = 'perspective(700px) rotateY(0) rotateX(0) translateY(0)';
    });
});

/* ─── OTHERS DROPDOWN right-align fix ─── */
const lastNI = document.querySelector('.nav-mid .ni:last-child .ndrop');
if (lastNI) { lastNI.style.left = 'auto'; lastNI.style.right = '0'; lastNI.style.transform = 'translateY(6px)'; }
document.querySelector('.nav-mid .ni:last-child').addEventListener('mouseenter', () => {
    lastNI.style.transform = 'translateY(0)';
});
document.querySelector('.nav-mid .ni:last-child').addEventListener('mouseleave', () => {
    lastNI.style.transform = 'translateY(6px)';
});
