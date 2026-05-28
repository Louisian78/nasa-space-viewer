/**
 * Funktioner för att spara ner och läsa upp kategorier och bilder i localStorage.
 *    
 * Initiellt skapad av: Martin Frick
 *               Datum: 2026-05-28
 *    Senast Ändrad/Av: 2026-05-28/Martin Frick
 * 
 */


/*
------------------------------------------------
--         EXPORTED FUNCTIONS BELOW           --
------------------------------------------------
*/

/**
 *  EXPORTED FUNCTION 
 *  Returns requested category object
 *  If it does not exist, it returns an empty array.
 * 
 */
export function getCategory(categoryToLoad) {

    //Retrieve full storage
    const categoryStorage = retrieveCatStorage();
    
    //Check if suggested category exists or not
    const resultOfCatCheck = categoryExists(categoryStorage, categoryToLoad);

    if(null === resultOfCatCheck) {
        
        //If null, do noting
        return []; //Return empty object incase there was no hit.

        //3 - Create new empty category
        //localStorage.setItem(categoryToLoad, JSON.stringify([]));
        //return [];

    } else {
        return resultOfCatCheck;
    }
}


/**
 *  EXPORTED FUNCTION 
 *  Creates and appends a new category object in localStorage.
 * 
 *  If a duplicate exists, it returns an empty array. Otherwise, returns the input.
 * 
 */
export function createNewCategory(newCategoryToCreate) {

    //Check if category already exists
    let categoryStorage = retrieveCatStorage();
    
    //Check if suggested category exists or not
    const resultOfCatCheck = categoryExists(categoryStorage, newCategoryToCreate);

    //If there isn't any category with that name yet, we go ahead make it.
    if(resultOfCatCheck === null) {

        return createCat(newCategoryToCreate, categoryStorage);//"success" ?

    }//If clause end


    return [];//"failure?"
}



/*
------------------------------------------------
--         INTERNAL FUNCTIONS BELOW           --
------------------------------------------------
*/

/**
 * INTERNAL FUNCTION
 * "createCat" creates and saves a new category.
 * 
 * Assumes check for existing categories is done beforehand.
 * Assumes storage has been retrieved and parsed
 * 
 */
function createCat(newCategoryToCreate, categoryStorage) {

    //Init new category
    let freshCategory = { 
        catName: newCategoryToCreate.categoryName,
        listOfPics: [] //Init array, populate after.
    };
    
    //Check if the suggested category came with pictures. If yes -> append them.
    if( newCategoryToCreate.listOfPics && newCategoryToCreate.listOfPics.length > 0 ) {
    
        appendArrOfPics(freshCategory, newCategoryToCreate);        
    }
               
    categoryStorage.push( freshCategory );
    
    localStorage.setItem( "saved_categories", JSON.stringify(categoryStorage) );    
    
    return freshCategory;
}

/**
 * INTERNAL FUNCTION
 * "appendArrOfPics" appends an array of pictures to an existing array of pictures.
 * 
 * catPicDest   = Array to append pics to.
 * catPicSource = Source array of pictures to append. 
 * 
 */ 
function appendArrOfPics(catPicDest, catPicSource){

    //Get the length of existing pick array so we are sure to add pics at the end.
    const destPicLength = catPicDest.listOfPics.length;

    //Iterate and add
    for(let i = 0; i < catPicSource.listOfPics.length; i++) {
        catPicDest.listOfPics[destPicLength + i] = catPicSource.listOfPics[i];    
    };
    return
}

/**
 * INTERNAL FUNCTION
 * "retrieveCatStorage" retrieves all saved categories, parses and returns them
 */ 
function retrieveCatStorage(){

    let storage = localStorage.getItem("saved_categories");

    if(storage === null) {
        storage = initializeStorage();
    } else { 
        //If we initialize the storage, we dont need to parse it. 
        storage = JSON.parse(storage); 
    }

   

    return storage;
}

/*
 * INTERNAL FUNCTION
 * Initierar localStorage med standardkategorin "Favoriter".
 * Körs bara en gång, första gången appen används.
 */
function initializeStorage(){


    const defaultCategory = { 
        catName: "Favorites",
        listOfPics: [] 
    };

    const defaultStorage = [ defaultCategory ];

    localStorage.setItem("saved_categories", JSON.stringify(defaultStorage));
    
    return defaultStorage;
}


/**
 * INTERNAL FUNCTION
 * Checks - by the NAME of the category - if a category exists in the category storage or not.
 * 
 * categoryStorage = The array of categories in storage.
 * categoryToCheck = The category to check if unique.
 * 
 */
function categoryExists(categoryStorage, categoryToCheck){

    console.log("Checking if suggested category is unique..")

    for(let i = 0; i < categoryStorage.length; i++){
        
        if(categoryStorage[i].catName === categoryToCheck.catName){

            console.log("Category:"+categoryToCheck.catName+" is unique.")
            return categoryStorage[i];
        }
    }

    return null;
}



