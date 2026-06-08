import NasaImage from '../NasaImage/NasaImage';
import './SavedImages.css';

/**
 * Komponent för att visa sparade bilder baserat på en specifik kategori.
 * Tar emot kategorinamnet för att hämta och visa de bilder som är sparade under den kategorin.
 * Initiellt skapad av: Kasper Schröder
 * Datum: 2026-05-29
 * Senast Ändrad/Av: 2026-05-31/Kasper Schröder
*/

/**
 * Metod för att rendera sparade bilder i en vald kategori. Om ingen kategori är vald, visas ingenting. Om det inte finns några sparade bilder i den valda kategorin, visas ett meddelande om att inga bilder är sparade.
 * @param {string} categoryName - Namnet på den kategori vars sparade bilder ska visas. Om ingen kategori är vald, visas ingenting.
 * @param {Array} savedPics - En array av bilddataobjekt som är sparade under den valda kategorin. Varje objekt innehåller data som titel, datum, url, media_type och explanation.
 */
const SavedImages = ({ categoryName, savedPics }) => {
  
  if (!categoryName) return null; 

  return (
    <section className="saved-images-section">
      <div className="saved-images-header">
        <h2>Sparade bilder i: {categoryName}</h2>
      </div>

      <div className="saved-images-grid">
        {(!savedPics || savedPics.length === 0) ? (
          <p className="no-saved-images">Inga bilder sparade i denna kategori ännu.</p>
        ) : (
          savedPics.map((picData) => (
            <NasaImage 
              key={picData.date || picData.url} 
              data={picData} 
              isLoading={false} 
              error={null} 
            />
          ))
        )}
      </div>
    </section>
  );
};

export default SavedImages;