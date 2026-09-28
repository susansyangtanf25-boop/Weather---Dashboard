const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

async function getJson(url) {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Network error. Please check your connection.");
  }
  if (!response.ok) {
    throw new Error("Something went wrong while fetching data.");
  }
  return response.json();
}

export async function fetchWeather(city) {
  const geoData = await getJson(
    `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`City "${city}" was not found. Try another name.`);
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: 5,
  });

  const data = await getJson(`${WEATHER_URL}?${params}`);

  return {
    city: name,
    country,
    current: {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      code: data.current.weather_code,
      wind: data.current.wind_speed_10m,
    },
    daily: data.daily.time.map((date, i) => ({
      date,
      code: data.daily.weather_code[i],
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
    })),
  };
}
