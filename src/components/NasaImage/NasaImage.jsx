import './NasaImage.css'; 

/**
 * Komponent för att visa den hämtade bilden/videon från NASA.
 * Initiellt skapad av: Kasper Schröder
 * Datum: 2026-05-28
 * Senast Ändrad/Av: 2026-05-28/Kasper Schröder
*/

/**
 * Metod för att hantera olika tillstånd (laddning, fel, data) och rendera bild eller video innehåll baserat på det.
 * @param {Object|null} data - Objekt som innehåller all data från NASA API (titel, datum, url, media_type, explanation).
 * @param {boolean} isLoading - Indikerar om applikationen för närvarande väntar på svar från API:et.
 * @param {string|null} error - Eventuellt felmeddelande om något gick fel vid hämtningen, annars null.
 */
const NasaImage = ({ data, isLoading, error }) => {
  if (isLoading) {
    return <div className="loading-message">Laddar rymddata...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="nasa-image-container">
      <h2>{data.title}</h2>
      <p className="nasa-date">Datum: {data.date}</p>

      {/* Om media-typen är video, rendera en iframe */}
      {data.media_type === "video" ? (
        <div className="video-wrapper">
          <iframe
            title={data.title}
            src={data.url}
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
      ) : ( //Om media-typen är bild, rendera en img
        <img 
          src={data.url} 
          alt={data.title} 
          className="nasa-image" 
        />
      )}

      <p className="nasa-explanation">{data.explanation}</p>
    </div>
  );
};

export default NasaImage;