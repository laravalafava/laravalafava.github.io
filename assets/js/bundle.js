// menu.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('/menu.json')
    .then(response => response.json())
    .then(data => {
      const currentPath = window.location.pathname;
      //const menuContainerDesktop = document.getElementById('menuDesktop');
      const menuContainerMobile = document.getElementById('menuMobile');

      let openMenu = null;

      const generateMenu = (menuData) => {
        const ul = document.createElement('ul');
        ul.className = 'nav-links';

        menuData.forEach(item => {
          const li = document.createElement('li');
          if (currentPath.includes(item.href)) {
            li.className = 'active';
          }

          if (item.href) {
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            li.appendChild(a);
          } else {
            li.textContent = item.label;
            const submenuDiv = document.createElement('div');
            submenuDiv.className = 'submenu';
            const submenuUl = document.createElement('ul');

            item.submenu.forEach(subitem => {
              const subLi = document.createElement('li');
              const subA = document.createElement('a');
              subA.href = subitem.href;
              subA.textContent = subitem.label;
              subLi.appendChild(subA);
              submenuUl.appendChild(subLi);
            });

            submenuDiv.appendChild(submenuUl);
            li.appendChild(submenuDiv);

            li.addEventListener('click', (event) => {
              event.stopPropagation();
              if (openMenu && openMenu !== submenuDiv) {
                openMenu.style.display = 'none';
              }
              submenuDiv.style.display = submenuDiv.style.display === 'block' ? 'none' : 'block';
              openMenu = submenuDiv.style.display === 'block' ? submenuDiv : null;
            });
          }

          ul.appendChild(li);
        });

        return ul;
      };

      //menuContainerDesktop.appendChild(generateMenu(data.menu));
      menuContainerMobile.appendChild(generateMenu(data.menu));

      document.addEventListener('click', (event) => {
        if (openMenu) {
          openMenu.style.display = 'none';
          openMenu = null;
        }
      });
    })
    .catch(error => console.error('Error loading menu:', error));
});

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
/*= = = = offcanvas = = = = */
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
