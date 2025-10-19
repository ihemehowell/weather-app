import { Droplet, Eye, Thermometer, Wind } from "lucide-react";
import type { WeatherData } from "../lib/api";
import { format } from "date-fns";

interface Props {
  current: WeatherData;
  units: string;
}

export default function WeatherCard({ current, units }: Props) {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const speedUnit = units === "metric" ? "m/s" : "mph";

  // Fix: Convert to city's local time using timezone offset (in seconds)
  const localTime = new Date((current.dt + current.timezone) * 900);
  const dateStr = format(localTime, "EEE, MMM d, HH:mm");

  return (
    <div className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm mt-4 transition-colors duration-300">
      {/* City + Country */}
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
        {current.name}, {current.sys.country}
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">{dateStr}</p>

      {/* Weather Overview */}
      <div className="flex justify-between items-center mt-3">
        <div>
          <p className="capitalize text-slate-700 dark:text-slate-300">
            {current.weather[0].description}
          </p>
          <p className="text-4xl font-bold text-slate-900 dark:text-slate-50">
            {Math.round(current.main.temp)}{tempUnit}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Feels like {Math.round(current.main.feels_like)}{tempUnit}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt="icon"
          className="w-24 h-24 drop-shadow-lg"
        />
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm text-slate-700 dark:text-slate-300">
        <p className="flex flex-row gap-1 items-center">
          <Droplet className="w-4" /> Humidity: {current.main.humidity}%
        </p>
        <p className="flex flex-row gap-1 items-center">
          <Thermometer className="w-4" /> Pressure: {current.main.pressure} hPa
        </p>
        <p className="flex flex-row gap-1 items-center">
          <Wind className="w-4" /> Wind: {current.wind.speed} {speedUnit}
        </p>
        <p className="flex flex-row gap-1 items-center">
          <Eye className="w-4" /> Visibility: {(current.visibility / 1000).toFixed(1)} km
        </p>
      </div>
    </div>
  );
}