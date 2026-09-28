# Weather Dashboard

A React single-page app that lets users search for any city and view live weather
conditions and a 5-day forecast. Recent searches are saved so users can quickly revisit them.

**Live demo:** <your-vercel-or-netlify-link>

## Features
- Search any city and fetch live weather data
- Shows temperature, condition, humidity, wind, and a weather icon
- Loading, error (city not found / network error), and empty states
- Search history saved in localStorage, with a dedicated History page
- 5-day forecast
- °C / °F toggle (preference persisted)
- Responsive layout for desktop and mobile

## Technologies
- React (functional components + hooks)
- React Router
- Vite
- Open-Meteo Geocoding & Forecast APIs (no API key needed)

## Setup
```bash
git clone <your-repo-url>
cd weather-dashboard
npm install
npm run dev
```


## Known Limitations
- Geolocation ("use my location") is not implemented.
- Only the first matching city is used when names are ambiguous.
