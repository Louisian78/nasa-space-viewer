import { useState, useEffect } from 'react';
import { getAllCategories } from '../../utils/localStorage.js';
import './CategoryList.css';

/**
 * Funktioner för att spara ner och läsa upp kategorier och bilder i localStorage.
 * Initiellt skapad av: Louisian Boltner 
 * Datum: 2026-05-27
 * Senast Ändrad/Av: 2026-06-01/Kasper Schröder
*/

function CategoryList({ categories = [], onSelect, currentCategory }) {

    return (
        <section className="category-list-box">
            <h2>Kategorier</h2>
            
            {categories.length === 0 ? (
                <p>Inga sparade kategorier ännu.</p>
            ) : (
                <ul className="category-list-ul">
                    {categories.map((catName) => (
                        <li key={catName}>
                            <button 
                                //Lägg till "active" klass på knappen om det är den valda kategorin
                                className={`category-list-btn ${currentCategory === catName ? 'active' : ''}`} 
                                onClick={() => onSelect(catName)}
                            >
                                {catName}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default CategoryList;