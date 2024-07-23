// assets/js/components/scroll-sections.js

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let currentSectionIndex = 0;
    let isScrolling = false;

    function activateSection(index) {
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        activateSection(index);
        currentSectionIndex = index;
        setTimeout(() => isScrolling = false, 1000); // Debounce to avoid rapid triggering
    }

    function handleNavLinkClick(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').slice(1);
        const targetIndex = Array.from(sections).indexOf(document.getElementById(targetId));
        scrollToSection(targetIndex);
    }

    function handleScroll(event) {
        if (isScrolling) return;
        if (event.deltaY > 0) {
            scrollToSection(currentSectionIndex + 1);
        } else if (event.deltaY < 0) {
            scrollToSection(currentSectionIndex - 1);
        }
    }

    function handleKeydown(event) {
        if (isScrolling) return;
        if (event.key === 'PageDown' || event.key === 'ArrowDown') {
            scrollToSection(currentSectionIndex + 1);
        } else if (event.key === 'PageUp' || event.key === 'ArrowUp') {
            scrollToSection(currentSectionIndex - 1);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeydown);

    // Initialize the first section as active
    activateSection(currentSectionIndex);
});
