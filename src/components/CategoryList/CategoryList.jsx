import { useState, useEffect } from 'react';
import { getAllCategories } from '../../utils/localStorage.js';
import './CategoryList.css';

/**
 * Funktioner för att spara ner och läsa upp kategorier och bilder i localStorage.
 * Initiellt skapad av: Louisian Boltner 
 * Datum: 2026-05-27
 * Senast Ändrad/Av: 2026-06-01/Kasper Schröder
*/

function CategoryList({ categories = [], onSelect, currentCategory, onDeleteCategory }) {
  return (
    <section className="category-list-box">
      <h2>Kategorier</h2>

      {categories.length === 0 ? (
        <p>Inga sparade kategorier ännu.</p>
      ) : (
        <ul className="category-list-ul">
          {categories.map((catName) => (
            <li className="category-list-item" key={catName}>
              <button
                type="button"
                className={`category-list-btn ${currentCategory === catName ? 'active' : ''}`}
                onClick={() => onSelect(catName)}
              >
                {catName}
              </button>

              <button
                type="button"
                className="delete-category-btn"
                onClick={() => onDeleteCategory(catName)}
              >
                Ta bort kategori
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default CategoryList;