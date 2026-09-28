function SearchHistory({ history, onSelect, onClear }) {
  if (history.length === 0) {
    return <p className="empty-text">No recent searches yet.</p>;
  }

  return (
    <div className="history">
      <div className="history-list">
        {history.map((city) => (
          <button
            key={city}
            className="history-chip"
            onClick={() => onSelect(city)}
          >
            🕘 {city}
          </button>
        ))}
      </div>
      {onClear && (
        <button className="clear-btn" onClick={onClear}>
          Clear history
        </button>
      )}
    </div>
  );
}

export default SearchHistory;
