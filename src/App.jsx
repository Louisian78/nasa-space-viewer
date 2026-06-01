// Importerar useEffect och useState från React.
// useState används för att spara värden som kan ändras i appen.
// useEffect används för att köra kod när appen startar

import {useEffect, useState} from "react";


// Importerar komponenterna som används i appens gränssnitt.
import Header from "./components/Header/Header";
import DatePicker from "./components/DatePicker/DatePicker";
import NasaImage from "./components/NasaImage/NasaImage";
import CategoryForm from "./components/CategoryForm/CategoryForm"; 
import CategoryList from "./components/CategoryList/CategoryList";
import SavedImages from "./components/SavedImages/SavedImages";
import HistoryList from "./components/HistoryList/HistoryList";

// Importerar funktioner som hämtar data från NASA:s APOD API.
import { fetchTodayNasaImage, fetchNasaImageByDate } from "./services/nasaApi";

import "./App.css";

function App() {
  // State som håller reda på den aktuella datan från NASA API.
  const[nasaData, setNasaData] = useState(null);
  // State som håller reda på vilket datum användaren har valt.
  const[selectedDate, setSelectedDate] = useState("");
  // State som används för att visa om appen håller på att ladda data.
  const[isLoading, setIsLoading] = useState (false);
  // State som används för att spara ett felmeddelande om API-anropet misslyckas.
  const[error, setError] = useState(null);
  // State som sparar tidigare visade NASA-bilder i en historiklista.
  const[history, setHistory] = useState([]);

  // Körs en gång när appen startar.
  // Hämtar dagens NASA-bild automatiskt.
  useEffect(() => {
    loadTodayImage();
  }, []);

  // Lägger till en visad NASA-bild i historiken.
  // Endast datum och titel sparas i historiklistan.
  function addToHistory(data) {
    const newHistoryItem = {
      date: data.date,
      title: data.title,
    };


    setHistory((oldHistory) => {
      // Tar bort eventuell tidigare historikpost med samma datum
      // så att samma datum inte visas flera gånger.
      const filteredHistory = oldHistory.filter(
        (item) => item.date !== newHistoryItem.date
      );

      // Lägger den senaste bilden först i historiklistan.
      return [newHistoryItem, ...filteredHistory];
    });
  }

  // Hämtar dagens NASA-bild från API:t.
  // Funktionen körs automatiskt när appen startar.
  async function loadTodayImage() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchTodayNasaImage();

      setNasaData(data);
      setSelectedDate(data.date);
      addToHistory(data);
    } catch(error) {
      setError("Kunde tyvärr inte hämta dagens NASA-bild!");
    } finally {
      setIsLoading(false);
    }
  }

  // Körs när användaren väljer ett nytt datum i DatePicker.
  // Datumet används för att hämta rätt NASA-bild från API:t.
  async function handleDateChange(date) {
    try {
      setSelectedDate(date);
      setIsLoading(true);
      setError(null);

      const data = await fetchNasaImageByDate(date);
      setNasaData(data);
      addToHistory(data);
    } catch (error) {
      setError("kunde tyvärr inte hämta NASA-bild för valt datum.")
    } finally {
      setIsLoading(false);
    }
  }

  // Körs när användaren klickar på ett datum i historiklistan.
  // Samma funktion som datumväljaren använder återanvänds här.
  function handleHistoryClick(date) {
    handleDateChange(date);
  }
  return (
    <>
      <Header />

      <main className="app-main">
        <section className="hero-section">
        <h2>Utforska NASA:s rymdbilder!</h2>
        <p>Välj ett datum, upptäck rymdbilder och organisera dina favoriter i egna kategorier. </p>
        </section>

        <div className="content-grid">
          <section className="main-content">
            {/* DatePicker får det valda datumet och en funktion som körs när datumet ändras. */}
            <DatePicker 
              date={selectedDate}
              onDateChange={handleDateChange}
            />
            {/* NasaImage får API-datan, laddningsstatus och eventuella felmeddelanden. */}
            <NasaImage 
              data={nasaData}
              isLoading={isLoading}
              error={error}
            />
          </section>

          <aside className="side-content">
          <CategoryForm />
          <CategoryList />
          {/* HistoryList får historiken och en funktion för att kunna välja ett tidigare datum igen. */}
          <HistoryList 
            history={history}
            onSelectDate={handleHistoryClick}
          />
          </aside>  
        </div>
        <SavedImages /> 
      </main>
    </>
  );
}

export default App; 