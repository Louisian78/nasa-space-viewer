/**
 * Funktioner för att spara ner och läsa upp kategorier och bilder i localStorage.
 *    
 *    Initiellt skapad av: Martin Frick
 *                  Datum: 2026-05-28
 *       Senast Ändrad/Av: 2026-05-29/Martin Frick
 * Beskrivning av ändring: 1. Ändrade från att nyttja termen "Pic"/"Pics" till "Image"/"Images" för enhetlighet i projektet. 
 *                         2. Lade till funktion för att söka/hämta individuellt bild via datum. 
 *                         3. Ändrade befintlig exporterade funktions benämning "getImage" (f.d."getPic") till -> "getImageByURL"
 *                         3. Lade till default “history” kategori. 
 *                         4. Lade till "addImage" funktion.
 *                         5. Lade till "appendHistory"
 *                         6. Varierande justeringar i flera funktioner för att fungera korrekt enligt ovan ändringar.
 *                         7. Lade till getAllCategories för CategoryList.jsx ska funka.
 *
 * 
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
     
    //Kolla om kategorin finns eller inte
    const resultOfCatCheck = categoryExists(categoryToLoad);

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
    const resultOfCatCheck = categoryExists(newCategoryToCreate);

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
 * Returnerar JSON objektet vid träff.
 * Returnerar null om bilden inte hittades.
 * 
 * ImageUrl = Urlen på bilden som söks.
 */
export function getImageByURL(imageUrl){

    const categoryStorage = retrieveCatStorage();

    for(let i = 0; i < categoryStorage.length; i++){

        for(let j = 0; j < categoryStorage[i].listOfImages.length; j++) {

            if( categoryStorage[i].listOfImages[j].url === imageUrl ) {
                return categoryStorage[i].listOfImages[j];
            }//Slut IF
        }//Slut j-loop (bilder i en array)
    }//Slut i-loop (Array av kategorier)

    return null; //Om bild inte hittades.
}

/**
 * EXPORTERAD FUNKTION
 * Letar upp och returnerar en specifik bild, matchad på datum / date.
 * Returnerar JSON objektet vid träff.
 * Returnerar null om bilden inte hittades.
 * 
 * ImageDate = Urlen på bilden som söks.
 */
export function getImageByDate(imageDate){

    const categoryStorage = retrieveCatStorage();

    for(let i = 0; i < categoryStorage.length; i++){

        for(let j = 0; j < categoryStorage[i].listOfImages.length; j++) {

            if( categoryStorage[i].listOfImages[j].date === imageDate ) {
                return categoryStorage[i].listOfImages[j];
            }//Slut IF
        }//Slut j-loop (bilder i en array)
    }//Slut i-loop (Array av kategorier)

    return null; //Om bild inte hittades.
}

/**
 * EXPORTERAD FUNKTION
 * Sparar ett JSON objekt som representerar en bild i en given kategori:s array.
 * 
 * Om inkommande kategori är "Historik", kallas en annan rutin för ändamålet. ->
 * -> detta för att inte returnera error relaterat till storlek på bild-array ->
 * -> då "Historik" kategorin inte har automatisk begränsning, utan endast ->
 * -> lägger lägger till bilder längst fram i arrayn, och tar bort äldsta ->
 * -> bilden som är sparad i array:n om det finns behov att skapa utrymme.
 * 
 * Returnerar JSON objektet igen om operationen gick bra. 
 * Returnerar null om given array är full.
 * 
 * image    = JSON objekt som representerar en bild att spara.
 * category = Kategorin som bilden ska sparas i. 
 * 
 */
export function saveImage(image, category) {

    if(category === "Historik") { 
        appendHistory(image);
        return image;
    }

    let result = appendImage(image, category);

    if(result === null){
        return [] //Fullt i kategorins array.
    }

    return image; //Success
}

/**
 * EXPORTERAD FUNKTION
 * Tar bort en kategori från storage via kategorinamn.
 * Returnerar kategorinamn om borttagning lyckades.
 * Returnerar null om kategorin inte hittades.
 * 
 * categoryName = Namnet på kategorin som ska tas bort.
 */
export function deleteCategory(categoryName) {

    if(categoryName === "Historik"){
        return null; //Historik får inte tas bort.
    }

    let storage = retrieveCatStorage();

    //Kolla om kategorin finns innan vi tar bort den.
    const catCheck = getCatByName(storage, categoryName);
    if(catCheck === null) {
        return null; //Kategorin finns inte
    }

    const updatedStorage = []
    for(let i = 0; i < storage.length; i++) {
        if(storage[i].catName !== categoryName) {
            updatedStorage.push(storage[i]);
        }
    }


    localStorage.setItem( "saved_categories", JSON.stringify(updatedStorage) );
    return categoryName;
}

/**
 * EXPORTERAD FUNKTION
 * Tar bort en specifik bild ur en given kategoris bildarray, matchat på url.
 * Returnerar bildens url om borttagning lyckades.
 * Returnerar null om kategorin eller bilden inte hittades.
 * 
 * categoryName = Namnet på kategorin som håller bilden.
 * imageUrl     = Urlen på bilden som ska tas bort.
 */
export function deleteImageByURL(categoryName, imageUrl) {

    let storage = retrieveCatStorage();
    let cat = getCatByName(storage, categoryName);

    if(cat === null) {
        return []; //Kategorin finns inte
    }

    const imageCheck = getImageByURLAndCat(categoryName, imageUrl);
    if(imageCheck === null) {
        return []; //bilden finns inte.
    }

    const updatedImages = []
    for(let i = 0; i < cat.listOfImages.length; i++) {

        if(cat.listOfImages[i].url !== imageUrl) {
            updatedImages.push(cat.listOfImages[i]);
        }
    }

    cat.listOfImages = updatedImages;
    localStorage.setItem( "saved_categories", JSON.stringify(storage) );
    return imageUrl;

}

/**
 * EXPORTERAD FUNKTION
 * Tar bort en specifik bild ur en given kategoris bildarray, matchat på url.
 * Returnerar bildens url om borttagning lyckades.
 * Returnerar null om kategorin eller bilden inte hittades.
 * 
 * categoryName = Namnet på kategorin som håller bilden.
 * imageObject  = JSON representation av bildobjektet som ska tas bort.
 */
export function deleteImageByJSON(categoryName, imageJSON) {

    let storage = retrieveCatStorage();
    let cat = getCatByName(storage, categoryName);

    if(cat === null) {
        return []; //Kategorin finns inte
    }

    const imageCheck = getImageByURLAndCat(categoryName, imageJSON.url);
    if(imageCheck === null) {
        return []; //bilden finns inte.
    }

    const updatedImages = []
    for(let i = 0; i < cat.listOfImages.length; i++) {
        if(cat.listOfImages[i].url !== imageJSON.url) {
            updatedImages.push(cat.listOfImages[i]);
        }
    }

    cat.listOfImages = updatedImages;
    localStorage.setItem( "saved_categories", JSON.stringify(storage) );
    return imageJSON;
}

/**
 * EXPORTERAD FUNKTION
 * Tar bort en specifik bild ur en given kategoris bildarray, automatiskt matchat.
 * Returnerar bildens url om borttagning lyckades.
 * Returnerar tom array om kategorin eller bilden inte hittades.
 * 
 * categoryName = Namnet på kategorin som håller bilden.
 * imageObject  = JSON representation av bildobjektet som ska tas bort.
 */
export function deleteImage(category, image) {
    
    let storage = retrieveCatStorage();
    
    let cat = getCatByName(storage, category);
    if(cat === null) {
        return []; //Kategorin finns inte
    }

    //Kolla om inkommande image är en URL
    if(typeof image === "string") {

       return deleteImageByURL(category, image) 
    }

    //Kolla om inkommande är en JSON
    if(typeof image === "object") { 

        return deleteImageByJSON(category, image) 
    }

    return [];//Fall i fall något oförutsätt händer.

}

/**
 * EXPORTERAD FUNKTION
 * Plockar ut och returnar alla kategorier som finns.
 * Om inget finns sparat körs kommer initializeStorage och bara "Historik" returneras.
 */
export function getAllCategories() {

    //retrieveCatStorage både hämtar, parsar och, vid behov, initialiserar storage.
    return retrieveCatStorage();
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
        catName: newCategoryToCreate,
        listOfImages: [] //Init-array, fylls på efteråt.
    };
               
    categoryStorage.push( freshCategory );
    
    localStorage.setItem( "saved_categories", JSON.stringify(categoryStorage) );    
    
    return freshCategory;
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
 * Initierar localStorage med standardkategorin "Historik".
 * Körs bara en gång, första gången appen används.
 */
function initializeStorage(){

    const defaultCategory = { 
        catName: "Historik",
        listOfImages: [] 
    };

    const defaultStorage = [ defaultCategory ];

    localStorage.setItem("saved_categories", JSON.stringify(defaultStorage));
    
    return defaultStorage;
}
 
/**
 * INTERN FUNKTION
 * Kontrollerar med kategorinamnet om en kategori finns i storage eller inte.
 * 
 * categoryToCheck = Kategorin som ska kontrolleras.
 */
function categoryExists(categoryToCheck){

    console.log("Kollar om föreslagen kategorin finns eller ej..")

    const categoryStorage = retrieveCatStorage();

    for(let i = 0; i < categoryStorage.length; i++) {
        
        if(categoryStorage[i].catName === categoryToCheck){

            console.log("Kategori:"+categoryStorage[i].catName+" finns i storage.")
            return categoryStorage[i];
        }
    }

    return null;
}

/**
 * INTERN FUNKTION
 * Hämtar en kategori med catName-strängen (Kategorins namn) som argument.
 * 
 * categoryStorage = Arrayen med alla kategorier i storage.
 * categoryNameToFind = Kategorin som ska hämtas.
 * 
 */
function getCatByName(categoryStorage, categoryNameToFind){

    console.log("'getCatByName'Letar efter kategori..")

    for(let i = 0; i < categoryStorage.length; i++){
        
        if(categoryStorage[i].catName === categoryNameToFind){

            console.log("Kategori:"+categoryStorage[i].catName+" hittades i 'getCatByName'.")
            return categoryStorage[i];
        }
    }

    return null;
}

/**
 * INTERN FUNKTION
 * "appendImage" lägger till en array av bilder till en befintlig bildarray.
 * 
 * imageToAppend        = array med bilder som ska läggas till.
 * categoryDestName     = Namnet på kategorin som ska hålla bilden.
 */
function appendImage(imageToAppend, categoryDestName) {

    let storage = retrieveCatStorage();
    let catToAppendImage = getCatByName(storage, categoryDestName);

    if(catToAppendImage === null) {
        return null;
    }

    //Max 10 bilder per kategori (0-9).
    if(catToAppendImage.listOfImages.length >= 10) {
        return null; //Fullt
    } 

    //Pusha imagen
    catToAppendImage.listOfImages.push(imageToAppend);

    //Spara ändrade storage
    localStorage.setItem( "saved_categories", JSON.stringify(storage) );

    
    return imageToAppend;

}

/**
 * INTERN FUNKTION
 * "appendHistory" lägger till bild i array för historik.
 * 
 * categoryDestName     = Namnet på kategorin som ska hålla bilden.
 */
function appendHistory(imageToAppend) {

    let storage = retrieveCatStorage();
    let catToAppendImage = getCatByName(storage, "Historik");


    //Max 10 bilder per kategori (0-9).
    if(catToAppendImage.listOfImages.length >= 10) {
        catToAppendImage.listOfImages.shift()
    } 

    //Pusha imagen
    catToAppendImage.listOfImages.push(imageToAppend);

    //Spara ändrade storage
    localStorage.setItem( "saved_categories", JSON.stringify(storage) );

    
    return imageToAppend;

}

export function getImageByURLAndCat(cat, imageUrl){

    const categoryStorage = retrieveCatStorage();

    const catFetched = getCatByName(categoryStorage, cat);
    if(catFetched === null){
        return null;
    }
        
    for(let i = 0; i < catFetched.listOfImages.length; i++){
        if(catFetched.listOfImages[i].url === imageUrl){
            return catFetched.listOfImages[i];
        }
    }
    
    return null; //Om bild inte hittades.
}

