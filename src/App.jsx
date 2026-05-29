import Header from "./components/Header/Header";
import DatePicker from "./components/DatePicker/DatePicker";
import NasaImage from "./components/NasaImage/NasaImage";
import CategoryForm from "./components/CategoryForm"; 
import CategoryList from "./components/CategoryList/CategoryList";
import SavedImages from "./components/SavedImages";
import HistoryList from "./components/HistoryList/HistoryList";

import "./App.css";

function App() {
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
            <DatePicker />
            <NasaImage />
          </section>

          <aside className="side-content">
          <CategoryForm />
          <CategoryList />
          <HistoryList />
          </aside>  
        </div>
        <SavedImages /> 
      </main>
    </>
  );
}

export default App; 