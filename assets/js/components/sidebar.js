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
