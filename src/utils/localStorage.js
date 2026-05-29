/**
 * Funktioner för att spara ner och läsa upp kategorier och bilder i localStorage.
 *    
 *    Initiellt skapad av: Martin Frick
 *                  Datum: 2026-05-28
 *       Senast Ändrad/Av: 2026-05-29/Martin Frick
 * Beskrivning av ändring: Ändrade "createNewCategory" till att basera sin return på strängar hellre än hela objekt. 
 *                         Detta för att inte öppna för två olika sätt att populera en visualisering av en kategori.
 *                         Med det menas: Man måste *alltid* leta upp en given kategori via dess namn och sen populera 
 *                         med info i frontend baserat på detta. Inte ett sätt utöver det där man tar en hel nyskapad
 *                         kategori och displayar den direkt via en framgångrik return.
 */


/*
------------------------------------------------
--         EXPORTERADE FUNKTIONER NEDAN       --
------------------------------------------------
*/

/**
 * EXPORTERAD FUNKTION
 * Returnerar ett efterfrågat kategori-objekt.
 * Om det inte finns, returneras en tom array.
 * 
 * categoryToLoad = Kategorin som ska hämtas.
 */
export function getCategory(categoryToLoad) {

    //Hämta hela storage
    const categoryStorage = retrieveCatStorage();
    
    //Kolla om kategorin finns eller inte
    const resultOfCatCheck = categoryExists(categoryStorage, categoryToLoad);

    if(null === resultOfCatCheck) {
        
        //Om null, gör ingenting
        return []; //Returnerar tom array om ingen träff hittades.


    } else {
        return resultOfCatCheck;
    }
}

/**
 * EXPORTERAD FUNKTION
 * Skapar och sparar ett nytt kategori-objekt i localStorage.
 * 
 * Om en dubblett finns returneras en tom array. Annars returneras det nya objektet.
 * 
 * newCategoryToCreate = Kategorin som ska skapas.
 * 
 * ÄNDRAD 260529 av Martin Frick: Returnerar strängar istället för arrays och/eller skapade objekt.
 */
export function createNewCategory(newCategoryToCreate) {

    //Hämta hela storage
    let categoryStorage = retrieveCatStorage();
    
    //Kolla om kategorin redan finns
    const resultOfCatCheck = categoryExists(categoryStorage, newCategoryToCreate);

    //Om ingen kategori med det namnet finns -> skapa den.
    if(resultOfCatCheck === null) {

        const cat = createCat(newCategoryToCreate, categoryStorage);
        return cat.catName;

    }//If-sats slut


    return "";
}

/**
 * EXPORTERAD FUNKTION
 * Letar upp och returnerar en specifik bild, matchad på url.
 * Returnerar null om bilden inte hittades.
 * 
 * picUrl = Urlen på bilden som söks.
 */
export function getPic(picUrl){

    const categoryStorage = retrieveCatStorage();

    for(let i = 0; i < categoryStorage.length; i++){
        for(let j = 0; j < categoryStorage[i].listOfPics.length; j++){
            if(categoryStorage[i].listOfPics[j].url === picUrl){
                return categoryStorage[i].listOfPics[j];
            }
        }
    }

    return null; //Hittades inte.
}

/*
------------------------------------------------
--         INTERNA FUNKTIONER NEDAN           --
------------------------------------------------
*/

/**
 * INTERN FUNKTION
 * "createCat" skapar och sparar en ny kategori.
 * 
 * Förutsätter att kontroll av befintliga kategorier gjorts innan anrop.
 * Förutsätter att storage redan hämtats och parsats.
 * 
 * newCategoryToCreate = Kategorin som ska skapas.
 * categoryStorage     = Hela storage-arrayen.
 */
function createCat(newCategoryToCreate, categoryStorage) {

    //Initiera ny kategori
    let freshCategory = { 
        catName: newCategoryToCreate.categoryName,
        listOfPics: [] //Init-array, fylls på efteråt.
    };
    
    //Kolla om den föreslagna kategorin kom med bilder. Om ja -> lägg till dem.
    if( newCategoryToCreate.listOfPics && newCategoryToCreate.listOfPics.length > 0 ) {
    
        appendArrOfPics(freshCategory, newCategoryToCreate);        
    }
               
    categoryStorage.push( freshCategory );
    
    localStorage.setItem( "saved_categories", JSON.stringify(categoryStorage) );    
    
    return freshCategory;
}

/**
 * INTERN FUNKTION
 * "appendArrOfPics" lägger till en array av bilder till en befintlig bildarray.
 * 
 * catPicDest   = Array att lägga till bilder i.
 * catPicSource = Källarray med bilder som ska läggas till.
 */ 
function appendArrOfPics(catPicDest, catPicSource){

    //Hämta längden på befintlig bildarray så vi är säkra på att lägga till bilder sist.
    const destPicLength = catPicDest.listOfPics.length;

    //Iterera och lägg till
    for(let i = 0; i < catPicSource.listOfPics.length; i++) {
        catPicDest.listOfPics[destPicLength + i] = catPicSource.listOfPics[i];    
    };
    return
}

/**
 * INTERN FUNKTION
 * "retrieveCatStorage" hämtar alla sparade kategorier, parsar och returnerar dem.
 */ 
function retrieveCatStorage(){

    let storage = localStorage.getItem("saved_categories");

    if(storage === null) {
        storage = initializeStorage();
    } else { 
        //Om vi initierar storage behöver vi inte parsa det.
        storage = JSON.parse(storage); 
    }
    return storage;
}

/*
 * INTERN FUNKTION
 * Initierar localStorage med standardkategorin "Favoriter".
 * Körs bara en gång, första gången appen används.
 */
function initializeStorage(){

    const defaultCategory = { 
        catName: "Favoriter",
        listOfPics: [] 
    };

    const defaultStorage = [ defaultCategory ];

    localStorage.setItem("saved_categories", JSON.stringify(defaultStorage));
    
    return defaultStorage;
}


/**
 * INTERN FUNKTION
 * Kontrollerar - med hjälp av kategorinamnet - om en kategori finns i storage eller inte.
 * 
 * categoryStorage = Arrayen med alla kategorier i storage.
 * categoryToCheck = Kategorin som ska kontrolleras.
 */
function categoryExists(categoryStorage, categoryToCheck){

    console.log("Kollar om föreslagen kategori är unik..")

    for(let i = 0; i < categoryStorage.length; i++){
        
        if(categoryStorage[i].catName === categoryToCheck.catName){

            console.log("Kategori:"+categoryToCheck.catName+" är unik.")
            return categoryStorage[i];
        }
    }

    return null;
}