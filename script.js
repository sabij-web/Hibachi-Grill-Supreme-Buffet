document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        navLinks.style.right = isExpanded ? '-100%' : '0';
        
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    };

    const closeMenu = () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.style.right = '-100%';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !mobileMenuBtn.contains(e.target) && 
            !navLinks.contains(e.target)) {
            closeMenu();
        }
    });

    const navLinksArray = navLinks.querySelectorAll('a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
});