import { useState } from "react";
import WeatherCard from "./WeatherCard";

const API_KEY = "c32249afb91fab7d2fc5df3c4603fd44";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchWeather = async (defaultCity) => {
    const queryCity = defaultCity || city;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) return;
    const data = await res.json();
    setWeather(data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather();
  };

  if (!hasLoaded) {
    fetchWeather("Bangalore");
    setHasLoaded(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 to-teal-500 flex flex-col items-center justify-center px-6 py-8 text-white font-sans">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-6xl font-normal tracking-widest  mb-2 ">
          WeatherNow App
        </h1>
        <p className="text-white text-lg italic">
          Get real-time weather updates by city 🌍
        </p>
      </header>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="flex-1 px-6 py-3 rounded-full text-gray-800 text-lg outline-none shadow-lg border border-gray-300 focus:ring-2 focus:ring-teal-300 transition"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-white text-blue-700 rounded-full hover:bg-gray-100 transition text-xl shadow-md border border-gray-200"
        >
          🔍
        </button>
      </form>

      {/* Weather card */}
      <div className="w-full max-w-3xl rounded-3xl p-4">
        {weather && (
          <WeatherCard
            city={weather.name}
            temp={Math.round(weather.main.temp)}
            description={weather.weather[0].main}
            icon={weather.weather[0].main}
            wind={weather.wind?.speed}
            humidity={weather.main?.humidity}
            feelsLike={Math.round(weather.main?.feels_like)}
          />
        )}
      </div>
    </div>
  );
}
