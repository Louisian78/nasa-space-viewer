import { useState, useEffect } from 'react';
import { getCategory } from '../utils/localStorage.js';
import { createNewCategory } from '../utils/localStorage.js';

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
            -> Om namnet redan finns returneras en tom array - vi kan se det eftersom dess length då kommer vara "0".
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
    <section>
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