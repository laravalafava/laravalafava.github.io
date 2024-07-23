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
