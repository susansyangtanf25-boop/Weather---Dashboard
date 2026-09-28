import { getWeatherInfo } from "../utils/weatherCodes";
import { convertTemp } from "../utils/temperature";

function Forecast({ daily, unit }) {
  return (
    <section className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {daily.map((day) => {
          const { icon, label } = getWeatherInfo(day.code);
          const weekday = new Date(`${day.date}T00:00:00`).toLocaleDateString(
            undefined,
            { weekday: "short" }
          );
          return (
            <div className="forecast-day" key={day.date}>
              <strong>{weekday}</strong>
              <span className="forecast-icon" title={label}>
                {icon}
              </span>
              <span>
                {convertTemp(day.max, unit)}° / {convertTemp(day.min, unit)}°
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;
