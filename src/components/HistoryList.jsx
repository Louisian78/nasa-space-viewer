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
                        {item.date} - {item.date}
                    </button>
                </li>
            ))}
        </ul>
    </section>
);
}
export default HistoryList;