import './DatePicker.css';
/**
 * Komponent för att låta användaren välja ett datum och uppdatera appens state.
 * Initiellt skapad av: Kasper Schröder
 * Datum: 2026-05-28
 * Senast Ändrad/Av: 2026-05-29/Kasper Schröder
*/

/**
 * Metod för att rendera en datumväljare och hantera användarens val av datum. Datumet skickas upp till föräldrakomponenten via onDateChange-funktionen.
 * @param {string} date - Det för närvarande valda datumet (YYYY-MM-DD).
 * @param {function} onDateChange - Funktion som anropas när användaren väljer ett nytt datum.
*/
const DatePicker = ({ date, onDateChange }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="datepicker-container">
      <label htmlFor="nasa-date-picker" className="datepicker-label">
        Se en äldre bild:
      </label>
      <input 
        id="nasa-date-picker"
        type="date" 
        max={today}
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="datepicker-input"
      />
    </div>
  );
};

export default DatePicker;