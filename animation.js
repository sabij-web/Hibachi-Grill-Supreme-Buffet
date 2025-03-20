// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            const animation = element.dataset.animation || 'slide-in-left';
            element.classList.add(animation, 'visible');
            animateOnScroll.unobserve(element);
        }
    });
}, observerOptions);

// Apply animations to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to sections
    const sections = document.querySelectorAll('.services, .menu-section, .gallery, .locations');
    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        section.dataset.animation = index % 2 === 0 ? 'slide-in-left' : 'slide-in-right';
        animateOnScroll.observe(section);
    });

    // Add zoom animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.classList.add('animate-on-scroll');
        item.dataset.animation = 'zoom-in';
        animateOnScroll.observe(item);
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading');
        img.addEventListener('load', () => {
            img.classList.remove('loading');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});