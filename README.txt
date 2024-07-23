struttura

project-root/
│
├── assets/
│   ├── css/
│   │   ├── components/
│   │   │   ├── _header.scss
│   │   │   ├── _footer.scss
│   │   │   ├── _sidebar.scss
│   │   │   ├── _slider.scss
│   │   ├── main.scss
│   │   └── main.css (generato automaticamente)
│   ├── img/
│   │   ├── bg/
│   │   └── icons/
│   └── js/
│       └── main.js
└── index.html


### Compilazione di SCSS in CSS
Per avviare la compilazione automatica di Sass, esegui il seguente comando nel terminale:

npm run sass

Questo comando monitorerà il file main.scss e compilerà il file main.css ogni volta che ci sono modifiche.


### Esecuzione dei JavaScript
Per concatenare i file JavaScript, esegui il comando:

npm run js

Ora, ogni volta che esegui npm run js, i tuoi file JavaScript saranno concatenati in bundle.js, che è collegato nel tuo index.html.


###media query

    @media (min-width: $mobile) {
        background-color: red;
    }

    @media (min-width: $tablet) {
        background-color: yellow;
    }

    @media (min-width: $desktop) {
        background-color: green;
    }


###FONT

// <uniquifier>: Use a unique and descriptive class name
// <weight>: Use a value from 100 to 900

.roboto-condensed-<uniquifier> {
  font-family: "Roboto Condensed", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}


<section>
  <h1>Campionato</h1>
  <div class="row">
    <div class="col-50"></div>
    <div class="col-50"></div>
  </div>
  <div class="row">
    <div class="col-50"></div>
    <div class="col-50"></div>
  </div>
</section>