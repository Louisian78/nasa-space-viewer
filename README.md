#NASA Space Viewer

NASA Space Viewer is a react application where users can explore space related content from NASA and save selected items in categories. 

## Technologies
-React 
-JavaScript
-Vite
-NASA API
-localStorage
-Git and GitHub

## Målgrupp
-Rymdintresserade studenter (såväl som icke-studenter), som vill se och lära sig om rymden.   

## Funktioner
Applikationen är planerad att innehålla följande funktioner: 
-Visa dagens rymdbild från NASA:s API.
-Låta användaren välja ett datum bakåt i tiden och hämta NASA:s bild från det datumet.
-Visa information om bilden, till exempel titel, datum, dild och beskrivning.
-Låta användaren skapa egna kategorier, till exempel "Stjärnor", "Planeter" eller "Galaxer". 
-Låta användaren spara bilder i valda kategorier.
-Visa sparade kategorier och de bilder som hör till varje kategori.
-Låta användaren ta bort sparade bilder eller kategorier. 
-Spara användarens ketegorier och bilder lokalt i webbläsaren med localStorage.
-Ha ett responsivt gränssnitt som fungerar på mobil, surfplatta och desktop.
-Visa historik lver tidigare visade bilder.

## Tekniker

## API

## Komponentstruktur
Appen är uppdelad i mindre React-komponenter med syfte att varje del av appen ska ha sitt eget ansvar.
src/
 components/
-Header - visar sidans rubrik och introduktion
-DatePicker - hanterar datumval
-NasaImage - visar data från NASA API
-CategoryForm - formulär för att skapa kategorier
-SavedImageList - visar sparade bilder
-HistoryList - visar historik över tidigare visade bilder

services/
-nasaApi.js - samlar API-anrop
utils/
-locaStorage.js - samlar funktioner för att spara lokalt

## GitFlow

## Installation och körning

## Ramverksjämförelse

## REflektion
##Project status

Project is under development





# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
