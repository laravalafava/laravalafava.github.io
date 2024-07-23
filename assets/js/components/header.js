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
