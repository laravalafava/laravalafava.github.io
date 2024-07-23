/*= = = = = = = = = = = = = */
/*= = = = COPYRIGHT = = = = */
/*= = = = = = = = = = = = = */

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = `&copy; ${currentYear} LaRavaLaFava Team. Tutti i diritti riservati.`;
    document.getElementById('copyright').innerHTML = `<p>${copyrightText}</p>`;
});
