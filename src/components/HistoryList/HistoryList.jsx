function HistoryList({ history = [], onSelectDate }) {
    if (history.length === 0) {
        return (
            <section className="history-list">
                <h2>Historik</h2>
                <p>Här ska tidigare bilder  visas</p>
            </section>
    );
}

return (
    <section className="history-list">
        <h2>Historik</h2>

        <ul>
            {history.map((item) => (
                <li key={item.date}>
                    <button type="button" onClick={() => onSelectDate(item.date)}>
                        {item.date} - {item.title}
                    </button>
                </li>
            ))}
        </ul>
    </section>
);
}

//Förberedd för att visa tidigare visade bilder. Den tar emot en history-array och en onSelectDate funktion från App.jsx. Själva sparandet i localStorage kopplas senare via localStorage.js
export default HistoryList;