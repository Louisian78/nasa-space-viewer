## NASA Space Viewer

## NASA Space Viewer is a react application where users can explore space related content from NASA and save selected items in categories. 

## Technologies
- React 
- JavaScript
- Vite
- NASA API
- localStorage
- Git and GitHub


## Målgrupp
-Rymdintresserade studenter (såväl som icke-studenter), som vill se och lära sig om rymden.   

## Funktioner
Applikationen är planerad att innehålla följande funktioner: 

- Visa dagens rymdbild från NASA:s API.
- Låta användaren välja ett datum bakåt i tiden och hämta NASA:s bild från det datumet.
- Visa information om bilden, till exempel titel, datum, dild och beskrivning.
- Låta användaren skapa egna kategorier, till exempel "Stjärnor", "Planeter" eller "Galaxer". 
- Låta användaren spara bilder i valda kategorier.
- Visa sparade kategorier och de bilder som hör till varje kategori.
- Låta användaren ta bort sparade bilder eller kategorier. 
- Spara användarens ketegorier och bilder lokalt i webbläsaren med localStorage.
- Ha ett responsivt gränssnitt som fungerar på mobil, surfplatta och desktop.
- Visa historik lver tidigare visade bilder.


## Tekniker
Projektet använder följande tekniker
-React
-JavaScript
-Vite
-NASA APOD API
-localStorage
-HTML
-CSS
-Git och GitHub
## API
Applikationen använder sig av [NASA:s APOD API (Astronomy Picture of the Day)](https://api.nasa.gov/). Detta API tillhandahåller dagligen en ny bild eller video relaterad till rymden, tillsammans med en förklaring skriven av en professionell astronom.

* **Endpoint:** `https://api.nasa.gov/planetary/apod`

* **Användning:** Appen skickar anrop (inklusive eventuellt valt datum) till API:et för att hämta bildens titel, URL, mediatyp (bild/video) och en beskrivande text.

* **API-nyckel:** Appen använder som standard `"DEMO_KEY"`. För att undvika API-spärrar (rate limits) vid många anrop rekommenderas det att man genererar en egen gratis nyckel hos NASA och skapar en `.env`-fil i root mappen med en variabel `VITE_NASA_API_KEY` och lägger in nyckeln däri.

## Komponentstruktur
Appen är uppdelad i mindre React-komponenter med syfte att varje del av appen ska ha sitt eget ansvar.

```text
nasa-space-viewer/
├── src/                            #All källkod för applikationen
│   ├── components/                 #Återanvändbara React-komponenter
│   │   ├── CategoryForm/           #Formulär för att skapa kategorier
│   │   │   ├── CategoryForm.jsx    
│   │   │   └── CategoryForm.css    #Komponentspecifik styling
│   │   ├── CategoryList/           #Visar alla skapade kategorier
│   │   │   ├── CategoryList.jsx    
│   │   │   └── CategoryList.css
│   │   ├── DatePicker/             #Hanterar datumval
│   │   │   ├── DatePicker.jsx      
│   │   │   └── DatePicker.css
│   │   ├── Header/                 #Visar sidans rubrik och introduktion
│   │   │   └── Header.jsx          
│   │   ├── HistoryList/            #Visar historik för tidigare bilder
│   │   │   ├── HistoryList.jsx     
│   │   │   └── HistoryList.css
│   │   ├── NasaImage/              #Visar data från NASA API
│   │   │   ├── NasaImage.jsx       
│   │   │   └── NasaImage.css
│   │   ├── SavedImages/            #Visar sparade bilder från vald kategori
│   │   │   ├── SavedImages.jsx     
│   │   │   └── SavedImages.css  
│   │   └── SaveImageButton/        #Knapp för att spara bilder
│   │       ├── SaveImageButton.jsx 
│   │       └── SveImageButton.css
│   ├── services/                   #API-anrop och extern kommunikation
│   │   └── nasaApi.js              #Kör NASA API-anrop
│   ├── utils/                      #Hjälpfunktioner
│   │   └── localStorage.js         #Hanterar lagring i localStorage
│   ├── App.css                     #Huvudstyling (layout, variabler etc)
│   ├── App.jsx                     #Huvudkomponent som knyter ihop appen
│   ├── index.css                   
│   └── main.jsx                    #Startpunkt för applikationen
└── README.md                       #Denna Readme fil
```

## GitFlow
I projektet har vi använt Git och Github för versionshantering och vi har arbetat enligt ett GitFlow liknande arbetssätt.
-main används som huvudbranch
-develop används av alla projektmedlemmar som utvecklingsbranch
-nya funktioner utvecklas i separata feature-branches
-när en funktion är klar skapas en pull request till develop
-efter granskning och testning mergas ändringen in i develop


## Installation och körning
Följ dessa steg för att installera och köra applikationen lokalt:

1. **Klona repot** (eller ladda ner källkoden och öppna mappen i din terminal):
   ```bash
   git clone https://github.com/Louisian78/nasa-space-viewer.git
   cd nasa-space-viewer
   ```
2. **Installera beroenden**:
   Se till att du har [Node.js](https://nodejs.org/) installerat. Kör sedan följande kommando:
   ```bash
   npm install
   ```

3. **Lägg till API nyckeln:**
    För att appen ska kunna hämta bilder behöver du en API-nyckel från NASA [Nyckel kan hämtas gratis här](https://api.nasa.gov/).
    
    - Skapa en ny fil i projektets rotmapp och döp den till `.env`.
    - Klistra in följande i filen och byt ut mot din nyckel:
    ```code
    VITE_NASA_API_KEY=din_faktiska_api_nyckel_här
    ```

4. **Starta utvecklingsservern**:
   ```bash
   npm run dev
   ```
   Öppna därefter länken (oftast `http://localhost:5173`) som visas i terminalen för att se applikationen i din webbläsare.


## Ramverksjämförelse
React: Det passar vårt projekt eftersom vi kan skapa separata komponenter med egna ansvarsområden. Det fungerar bra med Vite, vilket gör utvecklingsmiljö snabb och enkel att komma igång med. Vi kunde också dela upp gränssnittet i mindre återanvändbara komponenter. 


Vue: Är också ett populärt JavaScript-ramverk men gruppens erfarenhet av Vue upplevdes som en brantare inlärningskurva, tydlig struktur men också mer komplext att arbeta med jämfört med React.


Angular: Ett större och mer omfattande ramverk och för vårt projekt hade Angular blivit mer omfattande än nödvändigt och gruppens erfarenhet av Angular visade att det skulle bli för komplext för projektet.


Efterforskningar gjordes även på till exempel Geeks for Geeks för att få en idé om lämpligt ramverk. Resultaten visade att det fanns många likheter mellan ramverken så som men att React passade bäst. Det gjordes även övningsexempel med React på FreeCodeCamp som till stor del lade vissa fundament i arbetet med detta projekt och gav gruppen en bra grund att stå på redan från start.  
https://www.geeksforgeeks.org/reactjs/angular-vs-reactjs/
https://v2.vuejs.org/v2/guide/comparison.html?redirect=true


## Reflektion
Arbetetet med projektet har gett oss en bra förståelse för hur en React-applikation kan byggas med komponenter och att sammankoppla dessa komponenter så att data kan skickas mellan dem.
En annan lärdom var att GitFlow kräver god kommunikation i gruppen samt en viss noggrannhet eftersom kod annars kan hamna i fel branch och det kan bli extraarbete att städa upp efter ett misstag.
Struktur och organisation för såväl kodning som för mötesprotokoll och mötesframförande har spelat en stor roll under projektets gång och har möjliggjort en smidig arbetsperiod och flöde. Vissa i gruppen har tagit lärdom av övriga gruppmedlemmars arbetssätt och tar med sig detta till framtiden. 




