import { useNavigate } from "react-router-dom";
import SearchHistory from "../components/SearchHistory";

function HistoryPage({ history, onClear }) {
  const navigate = useNavigate();

  const handleSelect = (city) => {
    navigate(`/?city=${encodeURIComponent(city)}`);
  };

  return (
    <section>
      <h2>Search History</h2>
      <p className="empty-text">Click a city to view its weather again.</p>
      <SearchHistory
        history={history}
        onSelect={handleSelect}
        onClear={onClear}
      />
    </section>
  );
}

export default HistoryPage;
