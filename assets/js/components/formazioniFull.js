/*= = = = = = = = = = = = = */
/*= = = formazioni = = = */
/*= = = = = = = = = = = = = */

document.addEventListener("DOMContentLoaded", function() {
    // Recupera l'anno dal DOM
    const anno = document.getElementById('folderAnno').textContent.trim();
    console.log('Campionato ' + anno);
    // Costruisci l'URL dinamicamente
    const url = `../assets/data/${anno}/formazioni.json`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
          const formazioniDiv = document.getElementById('fullFormazioni');
          
          data.squadre.forEach(squadra => {
              // Crea il div per la squadra
              const squadraDiv = document.createElement('div');
              squadraDiv.classList.add('squadra');
              
              // Crea e aggiungi il nome della squadra
              const nomeSquadraDiv = document.createElement('div');
              nomeSquadraDiv.classList.add('nomeSquadra');
              nomeSquadraDiv.textContent = squadra.nome;
              squadraDiv.appendChild(nomeSquadraDiv);
              
              // Filtra e ordina i giocatori per ruolo e costo
              const ruoli = ['P', 'D', 'C', 'A'];
              ruoli.forEach(ruolo => {
                  const giocatoriPerRuolo = squadra.giocatori
                      .filter(giocatore => giocatore.ruolo === ruolo)
                      .sort((a, b) => b.costo - a.costo);
                  
                  giocatoriPerRuolo.forEach(giocatore => {
                      const giocatoreDiv = document.createElement('div');
                      giocatoreDiv.classList.add('giocatore');
                      
                      const nomeDiv = document.createElement('div');
                      nomeDiv.classList.add('nome');
                      nomeDiv.textContent = giocatore.calciatore;
                      giocatoreDiv.appendChild(nomeDiv);
                      
                      const costoDiv = document.createElement('div');
                      costoDiv.classList.add('costo');
                      costoDiv.textContent = giocatore.costo;
                      giocatoreDiv.appendChild(costoDiv);
                      
                      squadraDiv.appendChild(giocatoreDiv);
                  });
              });
              
              // Aggiungi la squadra al div principale
              formazioniDiv.appendChild(squadraDiv);
          });
      })
      .catch(error => console.error('Errore nel recupero dei dati:', error));
  });
  