/*= = = = = = = = = = = = = */
/*= = =CLASSIFICA 2023= = = */
/*= = = = = = = = = = = = = */

let previousClassifica = []; 
document.addEventListener("DOMContentLoaded", function() {
  let previousClassifica = []; 
  fetch('./assets/data/2023/classifica-campionato-2023.json')
    .then(response => response.json())
    .then(data => {
      data.giornate.forEach((giornata, index) => {
        generateTable(giornata, index + 1, data.giornate);
      });

      // Aggiungi event listeners per gestire l'accordion
      document.querySelectorAll('.table-container h2').forEach(heading => {
        heading.addEventListener('click', function() {
          toggleAccordion(this);
        });
      });
    })
    .catch(error => console.error('Errore nel recupero dei dati:', error));
});

function generateTable(giornata, giornataIndex, tutteGiornate) {
  const calendarDiv = document.getElementById('classificaCampionato2023');
  
  const tableContainer = document.createElement('div');
  tableContainer.classList.add('table-container');
  
  const heading = document.createElement('h2');
  heading.textContent = `Giornata ${giornata.giornata}`;
  tableContainer.appendChild(heading);
  
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');
  
  const partiteTable = createPartiteTable(giornata);
  const classificaTable = createClassificaTable(tutteGiornate.slice(0, giornataIndex), previousClassifica);
  
  tableWrapper.appendChild(partiteTable);
  tableWrapper.appendChild(classificaTable);
  
  tableContainer.appendChild(tableWrapper);
  calendarDiv.appendChild(tableContainer);
  
  // Aggiorna la classifica precedente
  previousClassifica = calculateClassifica(tutteGiornate.slice(0, giornataIndex));
}

function toggleAccordion(heading) {
  const tableContainer = heading.parentElement;
  const tableWrapper = tableContainer.querySelector('.table-wrapper');

  // Chiudi tutte le altre tabelle
  document.querySelectorAll('.table-container .table-wrapper').forEach(wrapper => {
    if (wrapper !== tableWrapper) {
      wrapper.classList.remove('active');
    }
  });

  // Mostra/nascondi la tabella cliccata
  tableWrapper.classList.toggle('active');
}

function createPartiteTable(giornata) {
  const table = document.createElement('table');
  
  const headerRow = document.createElement('tr');
  const headers = ['Sq. Casa', 'Pt.', 'Gol Casa', 'Gol Trasf.', 'Pt.', 'Sq. Trasf.'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);
  
  giornata.partite.forEach(partita => {
    const row = document.createElement('tr');
    
    const cellSquadraCasa = document.createElement('td');
    cellSquadraCasa.textContent = partita.squadra_casa;
    row.appendChild(cellSquadraCasa);
    
    const cellPuntiCasa = document.createElement('td');
    cellPuntiCasa.textContent = partita.punti_casa;
    row.appendChild(cellPuntiCasa);
    
    const cellGolCasa = document.createElement('td');
    cellGolCasa.textContent = partita.gol_casa;
    row.appendChild(cellGolCasa);
    
    const cellGolTrasferta = document.createElement('td');
    cellGolTrasferta.textContent = partita.gol_trasferta;
    row.appendChild(cellGolTrasferta);
    
    const cellPuntiTrasferta = document.createElement('td');
    cellPuntiTrasferta.textContent = partita.punti_trasferta;
    row.appendChild(cellPuntiTrasferta);
    
    const cellSquadraTrasferta = document.createElement('td');
    cellSquadraTrasferta.textContent = partita.squadra_trasferta;
    row.appendChild(cellSquadraTrasferta);
    
    table.appendChild(row);
  });
  
  return table;
}

function createClassificaTable(giornate, previousClassifica = []) {
  const classifica = calculateClassifica(giornate);
  
  const table = document.createElement('table');
  
  const headerRow = document.createElement('tr');
  const headers = ['Posizione', 'Squadra', 'G', 'V', 'N', 'P', 'Gf', 'Gs', 'Dr', 'Pt.', 'Pt. Totali'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);
  
  classifica.forEach((squadra, index) => {
    const row = document.createElement('tr');
    
    const cellPosizione = document.createElement('td');
    cellPosizione.textContent = index + 1;
    row.appendChild(cellPosizione);
    
    const cellSquadra = document.createElement('td');
    cellSquadra.textContent = squadra.nome;
    row.appendChild(cellSquadra);
    
    const cellG = document.createElement('td');
    cellG.textContent = squadra.giocate;
    row.appendChild(cellG);
    
    const cellV = document.createElement('td');
    cellV.textContent = squadra.vinte;
    row.appendChild(cellV);
    
    const cellN = document.createElement('td');
    cellN.textContent = squadra.pareggiate;
    row.appendChild(cellN);
    
    const cellP = document.createElement('td');
    cellP.textContent = squadra.perse;
    row.appendChild(cellP);
    
    const cellGf = document.createElement('td');
    cellGf.textContent = squadra.gol_fatti;
    row.appendChild(cellGf);
    
    const cellGs = document.createElement('td');
    cellGs.textContent = squadra.gol_subiti;
    row.appendChild(cellGs);
    
    const cellDr = document.createElement('td');
    cellDr.textContent = squadra.differenza_reti;
    row.appendChild(cellDr);
    
    const cellPt = document.createElement('td');
    cellPt.textContent = squadra.punti;
    row.appendChild(cellPt);
    
    const cellPtTotali = document.createElement('td');
    cellPtTotali.textContent = squadra.punti_totali;
    row.appendChild(cellPtTotali);
    
    if (previousClassifica.length > 0) {
      const previousIndex = previousClassifica.findIndex(prevSquadra => prevSquadra.nome === squadra.nome);
      if (previousIndex !== -1) {
        if (previousIndex < index) {
          row.style.backgroundColor = 'rgb(240 128 128 / 50%)'; // Discesa
          row.classList.add('growDown');
        } else if (previousIndex > index) {
          row.style.backgroundColor = 'rgb(144 238 144 / 50%)'; // Salita
          row.classList.add('growUp');
        }
      }
    }
    
    
    table.appendChild(row);
  });
  
  return table;
}

function calculateClassifica(giornate) {
  const squadre = {};
  
  giornate.forEach(giornata => {
    giornata.partite.forEach(partita => {
      if (!squadre[partita.squadra_casa]) {
        squadre[partita.squadra_casa] = createEmptyTeam(partita.squadra_casa);
      }
      if (!squadre[partita.squadra_trasferta]) {
        squadre[partita.squadra_trasferta] = createEmptyTeam(partita.squadra_trasferta);
      }
      
      updateTeamStats(squadre[partita.squadra_casa], partita.punti_casa, partita.gol_casa, partita.gol_trasferta);
      updateTeamStats(squadre[partita.squadra_trasferta], partita.punti_trasferta, partita.gol_trasferta, partita.gol_casa);
      
      if (partita.gol_casa > partita.gol_trasferta) {
        squadre[partita.squadra_casa].vinte++;
        squadre[partita.squadra_casa].punti += 3;
        squadre[partita.squadra_trasferta].perse++;
      } else if (partita.gol_casa < partita.gol_trasferta) {
        squadre[partita.squadra_trasferta].vinte++;
        squadre[partita.squadra_trasferta].punti += 3;
        squadre[partita.squadra_casa].perse++;
      } else {
        squadre[partita.squadra_casa].pareggiate++;
        squadre[partita.squadra_trasferta].pareggiate++;
        squadre[partita.squadra_casa].punti += 1;
        squadre[partita.squadra_trasferta].punti += 1;
      }
    });
  });
  
  return Object.values(squadre).sort((a, b) => b.punti - a.punti || b.differenza_reti - a.differenza_reti || b.gol_fatti - a.gol_fatti);
}

function createEmptyTeam(nome) {
  return {
    nome,
    giocate: 0,
    vinte: 0,
    pareggiate: 0,
    perse: 0,
    gol_fatti: 0,
    gol_subiti: 0,
    differenza_reti: 0,
    punti: 0,
    punti_totali: 0
  };
}

function updateTeamStats(team, punti, golFatti, golSubiti) {
  team.giocate++;
  team.gol_fatti += golFatti;
  team.gol_subiti += golSubiti;
  team.differenza_reti = team.gol_fatti - team.gol_subiti;
  team.punti_totali += punti;
}
