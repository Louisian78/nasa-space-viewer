import { useState, useEffect } from 'react';
import { createNewCategory } from '../../utils/localStorage.js';

/**
 * Funktioner för att spara ner och läsa upp kategorier och bilder i localStorage.
 *    
 *    Initiellt skapad av: Martin Frick
 *                  Datum: 2026-05-29
 *       Senast Ändrad/Av: 2026-05-30/Martin Frick
 * Beskrivning av ändring: Tog bort inaktuell import. 
 *                         Ändrade inkorrekt kommentar.
 *                         Flyttade komponent till egen mapp enligt ny överenskommen struktur. 
 *                         Lade till " className="category-form-box" " i "section" för styling. Modellerad på SaveImageButton.css.
 */


function CategoryForm ({ onAdd }) {

    /*
    1. Lägg till "useState" för categoryName 
       så komponenten uppdateras automatiskt
       via reacts inbyggda funktioner.
    */
    const [catName, setCategory] = useState('')
    
    //2. Kolla så input inte är tom.
    function handleSubmit() {
    if (catName === '') {
        alert('Du har inte skrivit något kategorinamn juh! Ajabaja, så får man inte göra hörru!')
        return
    }

    /*3.

        Om input ("catName") är OK -> 
        -> Kalla på localStorage och se fall vi kan lägga in det->
            -> Om namnet redan finns returneras en tom sträng.
        -> Om vi får tillbaka 
        -> Skicka till "App"
 
    */
    const category = createNewCategory(catName)
    if (category === "") {
        alert('En kategori med det namnet finns redan!')
        return
    }
    onAdd({ category })


    //5. Nolla formuläret 
    setCategory('')
    }//handleSubmit slut


    return (
    <section className="category-form-box">
        <h2>Skapa en ny kategori</h2>

        <form>
            <label>Kategorinamn:
                <input 
                    type="text" 
                    value={catName} 
                    onChange={e => setCategory(e.target.value)} 
                    placeholder="Skriv namnet på din nya kategori här.."
                /> 
            </label>

            <button type="button" onClick={handleSubmit}>Spara kategori</button>
            
        </form>
    </section>
    );

}

export default CategoryForm;