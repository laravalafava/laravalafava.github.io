/*= = = = = = = = = = = = = */
/*= = = = =HEADER = = = = = */
/*= = = = = = = = = = = = = */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const stickyThreshold = 30; // Altezza in pixel oltre la quale applicare la classe sticky

    function handleScroll() {
        if (window.scrollY > stickyThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Chiamata iniziale per gestire il caso in cui l'utente carica la pagina già scrollata
    handleScroll();
});

/*= = = = = = = = = = = = = */
/*= = = = COPYRIGHT = = = = */
/*= = = = = = = = = = = = = */

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = `&copy; ${currentYear} LaRavaLaFava Team. Tutti i diritti riservati.`;
    document.getElementById('copyright').innerHTML = `<p>${copyrightText}</p>`;
});

/*= = = = = = = = = = = = = */
/*= = = = =FOOTER = = = = = */
/*= = = = = = = = = = = = = */

/*= = = = = = = = = = = = = */
/*= = = = =SIDEBAR= = = = = */
/*= = = = = = = = = = = = = */

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menuIcon');
    const offcanvasMenu = document.getElementById('offcanvasMenu');
    const closeIcon = document.getElementById('closeIcon');
    const overlay = document.createElement('div');
    overlay.className = 'offcanvas-overlay';
    document.body.appendChild(overlay);

    function toggleOffcanvas() {
        offcanvasMenu.classList.toggle('open');
        overlay.classList.toggle('open');
    }

    function closeOffcanvas() {
        offcanvasMenu.classList.remove('open');
        overlay.classList.remove('open');
    }

    menuIcon.addEventListener('click', toggleOffcanvas);
    closeIcon.addEventListener('click', closeOffcanvas);
    overlay.addEventListener('click', closeOffcanvas);

    // Aggiungi event listener per ciascun link del menu
    const menuLinks = offcanvasMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeOffcanvas);
    });
});

/*= = = = = = = = = = = = = */
/*= = = = =SLIDER = = = = = */
/*= = = = = = = = = = = = = */

// assets/js/components/scroll-sections.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let currentSectionIndex = 0;
    let isScrolling = false;

    const mediaQuery = window.matchMedia('(min-width: 992px)');

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

    function initializeScrollFeatures() {
        if (mediaQuery.matches) {
            navLinks.forEach(link => {
                link.addEventListener('click', handleNavLinkClick);
            });

            window.addEventListener('wheel', handleScroll);
            window.addEventListener('keydown', handleKeydown);

            // Initialize the first section as active
            activateSection(currentSectionIndex);
        } else {
            navLinks.forEach(link => {
                link.removeEventListener('click', handleNavLinkClick);
            });

            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('keydown', handleKeydown);
        }
    }

    // Initial check
    initializeScrollFeatures();

    // Listen for changes in screen size
    mediaQuery.addEventListener('change', initializeScrollFeatures);
});

/*= = = = = = = = = = = = = */
/*= = BACKGROUND-CHANGER= = */
/*= = = = = = = = = = = = = */

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    // Lista di tutte le immagini disponibili per desktop e mobile
    const desktopImages = Array.from({ length: 10 }, (_, i) => `./assets/img/bg/bg-${String(i + 1).padStart(3, '0')}.jpg`);
    const mobileImages = Array.from({ length: 10 }, (_, i) => `./assets/img/bg/bg-mobile-${String(i + 1).padStart(3, '0')}.jpg`);

    // Mescola un array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Funzione per ottenere un'immagine casuale senza ripetizioni
    function getRandomImages() {
        const screenSize = window.innerWidth;
        let imageArray;
        
        if (screenSize >= 992) { // Desktop
            imageArray = shuffleArray([...desktopImages]);
        } else { // Mobile and Tablet (same images)
            imageArray = shuffleArray([...mobileImages]);
        }
        
        return imageArray;
    }

    // Funzione per impostare un'immagine di sfondo casuale
    function setRandomBackground(section, images) {
        if (images.length > 0) {
            const imagePath = images.pop(); // Rimuove e restituisce l'ultima immagine dall'array
            section.style.backgroundImage = `url('${imagePath}')`;
        }
    }

    // Imposta le immagini casuali per tutte le sezioni al caricamento della pagina
    let imageArray = getRandomImages();
    sections.forEach(section => setRandomBackground(section, imageArray));

    // Funzione per aggiornare l'immagine di sfondo della sezione attiva
    function updateActiveSectionImage(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                if (section.classList.contains('active')) {
                    const images = getRandomImages();
                    setRandomBackground(section, images);
                }
            }
        });
    }

    // Crea un observer per le sezioni
    const observer = new IntersectionObserver(updateActiveSectionImage, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0 // Intersecta quando la sezione è completamente visibile
    });

    // Aggiungi tutte le sezioni all'observer
    sections.forEach(section => observer.observe(section));

    // Riapplica immagini casuali su resize
    window.addEventListener('resize', () => {
        imageArray = getRandomImages();
        sections.forEach(section => setRandomBackground(section, imageArray));
    });
});
