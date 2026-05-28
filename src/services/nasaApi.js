/**
 * Funktioner för att hämta "Astronomy Picture of the Day" från NASA:s API.
 * Initiellt skapad av: Kasper Schröder
 * Datum: 2026-05-27
 * Senast Ändrad/Av: 2026-05-27/Kasper Schröder
 */

//Hämtar API-nyckeln från den lokala .env-filen.
//Om ingen nyckel finns (eller om variabeln är tom), används "DEMO_KEY" som reserv.
const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

/**
 * Hämtar dagens bild från NASA. 
 * NASA API returnerar automatiskt dagens datum om ingen datum-parameter anges.
 */
export const fetchTodayNasaImage = async () => {
  try {
    const url = `${BASE_URL}?api_key=${API_KEY}`;
    
    //Utför API-anropet
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`NASA API responded with an error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Could not fetch today's data from NASA:", error);
    throw error;
  }
};

/**
 * Hämtar bilden för ett specifikt datum från NASA.
 * @param {string} date - Datum i formatet "YYYY-MM-DD".
 */
export const fetchNasaImageByDate = async (date) => {
  try {
    //Bygger URL med den specifika datum-parametern
    const url = `${BASE_URL}?api_key=${API_KEY}&date=${date}`;
    
    // Utför API-anropet
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`NASA API responded with an error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`Could not fetch data for date ${date} from NASA:`, error);
    throw error;
  }
};