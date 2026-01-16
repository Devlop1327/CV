// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
    AOS.init({
        duration: 1000,
        once: true,
    });
}

// Typing effect for tagline (safe: only if element exists)
const tagline = document.querySelector('.tagline');
if (tagline) {
    const text = tagline.textContent || '';
    tagline.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// Smooth scrolling for navigation (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.05)';
    });
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1)';
    });
});

// Modal para certificaciones (si existe la página)
(function() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-title');
    const modalText = modal.querySelector('.modal-text');

    function openModal(card) {
        const img = card.querySelector('img');
        const title = card.querySelector('h3');
        const text = card.querySelector('p');
        if (modalImg && img) modalImg.src = img.src || '';
        if (modalImg) modalImg.alt = (img && img.alt) ? img.alt : (title ? title.textContent : 'Certificado');
        if (modalTitle && title) modalTitle.textContent = title.textContent || '';
        if (modalText && text) modalText.textContent = text.textContent || '';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        if (modalImg) modalImg.src = '';
        document.body.style.overflow = '';
    }

    // Attach click handlers to cert cards only if they exist
    const cards = document.querySelectorAll('.cert-card');
    if (cards && cards.length) {
        cards.forEach(card => {
            card.addEventListener('click', () => openModal(card));
        });
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();