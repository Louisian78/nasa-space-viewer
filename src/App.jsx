import {useEffect, useState} from "react";

import Header from "./components/Header/Header";
import DatePicker from "./components/DatePicker/DatePicker";
import NasaImage from "./components/NasaImage/NasaImage";
import CategoryForm from "./components/CategoryForm/CategoryForm"; 
import CategoryList from "./components/CategoryList/CategoryList";
import SavedImages from "./components/SavedImages/SavedImages";
import HistoryList from "./components/HistoryList/HistoryList";

import { fetchTodayNasaImage, fetchNasaImageByDate } from "./services/nasaApi";

import "./App.css";

function App() {
  const[nasaData, setNasaData] = useState(null);
  const[selectedDate, setSelectedDate] = useState("");
  const[isLoading, setIsLoading] = useState (false);
  const[error, setError] = useState(null);
  const[history, setHistory] = useState([]);

  useEffect(() => {
    loadTodayImage();
  }, []);

  function addToHistory(data) {
    const newHistoryItem = {
      date: data.date,
      title: data.title,
    };

    setHistory((oldHistory) => {
      const filteredHistory = oldHistory.filter(
        (item) => item.date !== newHistoryItem.date
      );

      return [newHistoryItem, ...filteredHistory];
    });
  }

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
            <DatePicker 
              date={selectedDate}
              onDateChange={handleDateChange}
            />
            <NasaImage 
              data={nasaData}
              isLoading={isLoading}
              error={error}
            />
          </section>

          <aside className="side-content">
          <CategoryForm />
          <CategoryList />
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