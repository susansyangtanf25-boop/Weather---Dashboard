import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HistoryPage from "./pages/HistoryPage";
import useLocalStorage from "./hooks/useLocalStorage";

const MAX_HISTORY = 8;

function App() {
  const [history, setHistory] = useLocalStorage("weather-history", []);
  const [unit, setUnit] = useLocalStorage("weather-unit", "C");

  const addToHistory = useCallback(
    (cityName) => {
      setHistory((prev) =>
        [
          cityName,
          ...prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase()),
        ].slice(0, MAX_HISTORY)
      );
    },
    [setHistory]
  );

  const clearHistory = () => setHistory([]);

  const toggleUnit = () => setUnit((prev) => (prev === "C" ? "F" : "C"));

  return (
    <div className="app">
      <Navbar unit={unit} onToggleUnit={toggleUnit} />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                unit={unit}
                history={history}
                onSearchSuccess={addToHistory}
              />
            }
          />
          <Route
            path="/history"
            element={<HistoryPage history={history} onClear={clearHistory} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
