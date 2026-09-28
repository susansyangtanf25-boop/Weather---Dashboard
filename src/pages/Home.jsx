import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import SearchHistory from "../components/SearchHistory";
import Message from "../components/Message";
import { fetchWeather } from "../api/weatherApi";

function Home({ unit, history, onSearchSuccess }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get("city");

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    let ignore = false;

    async function loadWeather() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchWeather(city);
        if (!ignore) {
          setWeather(data);
          onSearchSuccess(data.city);
        }
      } catch (err) {
        if (!ignore) {
          setWeather(null);
          setError(err.message);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadWeather();

    return () => {
      ignore = true;
    };
  }, [city, onSearchSuccess]);

  const handleSearch = (name) => setSearchParams({ city: name });

  return (
    <>
      <SearchBar onSearch={handleSearch} disabled={loading} />

      <h3 className="section-title">Recent searches</h3>
      <SearchHistory history={history} onSelect={handleSearch} />

      {loading && <Message type="loading">Loading weather data...</Message>}
      {error && <Message type="error">⚠️ {error}</Message>}

      {!loading && !error && !weather && (
        <Message type="info">Search for a city to see its weather.</Message>
      )}

      {!loading && weather && (
        <>
          <WeatherCard weather={weather} unit={unit} />
          <Forecast daily={weather.daily} unit={unit} />
        </>
      )}
    </>
  );
}

export default Home;
