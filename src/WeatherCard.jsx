import React from "react";

const iconMap = {
  Thunderstorm: "⛈️",
  Drizzle: "🌦️",
  Rain: "🌧️",
  Snow: "❄️",
  Clear: "☀️",
  Clouds: "⛅",
};

export default function WeatherCard({
  city,
  temp,
  icon,
  wind,
  humidity,
  feelsLike,
}) {
  return (
    <div className="w-full bg-white/10 rounded-3xl shadow-2xl p-10 text-white flex flex-col items-center border border-white/30">
      <h2 className="text-5xl font-light tracking-wide mb-1">{city}</h2>

      <div className="flex flex-col items-center my-4">
        <div className="text-8xl">{iconMap[icon] || "🌈"}</div>
        <div className="text-8xl font-thin mt-2">{temp}°C</div>
        <p className="text-lg mt-1">{icon}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 text-center mt-8 text-white w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="bg-white/20 p-3 rounded-xl mb-2">
            <span className="text-3xl">🌡️</span>
          </div>
          <p className="text-sm text-white/70 font-light">Feels like</p>
          <p className="text-lg font-thin">{feelsLike}°</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-white/20 p-3 rounded-xl mb-2">
            <span className="text-3xl">💧</span>
          </div>
          <p className="text-sm text-white/70 font-light">Humidity</p>
          <p className="text-lg font-thin">{humidity}%</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-white/20 p-3 rounded-xl mb-2">
            <span className="text-3xl">🌬️</span>
          </div>
          <p className="text-sm text-white/70 font-light">Wind</p>
          <p className="text-lg font-thin">{wind} m/s</p>
        </div>
      </div>
    </div>
  );
}
