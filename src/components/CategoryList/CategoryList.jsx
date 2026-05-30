import { useState, useEffect } from 'react';
import { getAllCategories } from '../../utils/localStorage.js';
/**
 * Funktioner för att spara ner och läsa upp kategorier och bilder i localStorage.
 *    
 *    Initiellt skapad av: Louisian Boltner 
 *                  Datum: 2026-05-27
 * 
 *  inte färdig /Martin Frick
 */

function CategoryList({ onSelect }) {

    return (
        <section>
            <h2>Kategorier</h2>
            <p>Här ska sparade kategorier visas</p>
        </section>
    );


}

export default CategoryList;