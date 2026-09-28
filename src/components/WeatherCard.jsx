import { getWeatherInfo } from "../utils/weatherCodes";
import { convertTemp } from "../utils/temperature";

function WeatherCard({ weather, unit }) {
  const { city, country, current } = weather;
  const { label, icon } = getWeatherInfo(current.code);

  return (
    <section className="weather-card">
      <h2>
        {city}, {country}
      </h2>
      <div className="weather-main">
        <span className="weather-icon">{icon}</span>
        <span className="weather-temp">
          {convertTemp(current.temperature, unit)}°{unit}
        </span>
      </div>
      <p className="weather-condition">{label}</p>
      <div className="weather-details">
        <div>
          <span>💧 Humidity</span>
          <strong>{current.humidity}%</strong>
        </div>
        <div>
          <span>💨 Wind</span>
          <strong>{current.wind} km/h</strong>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;
