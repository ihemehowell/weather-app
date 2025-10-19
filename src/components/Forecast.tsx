import type{ ForecastData } from "../lib/api";
import { format } from "date-fns";

interface Props {
  forecast: ForecastData;
  units: string;
}

export default function Forecast({ forecast, units }: Props) {
  const grouped = groupForecast(forecast.list);
  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="mt-6 bg-white/70 dark:bg-slate-800/40 p-4 rounded-xl">
      <h3 className="font-semibold mb-3">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {grouped.map((day) => (
          <div key={day.date} className="text-center bg-white/50 dark:bg-slate-700/40 rounded-lg p-2">
            <p className="text-sm font-medium">{format(new Date(day.date), "EEE")}</p>
            <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt="icon" className="mx-auto" />
            <p className="text-sm capitalize">{day.desc}</p>
            <p className="text-sm">
              {Math.round(day.max)}{tempUnit} / {Math.round(day.min)}{tempUnit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function groupForecast(list: any[]) {
  const days: Record<string, any[]> = {};
  list.forEach((item) => {
    const date = format(new Date(item.dt * 1000), "yyyy-MM-dd");
    (days[date] = days[date] || []).push(item);
  });
  return Object.entries(days).slice(0, 5).map(([date, entries]) => {
    const temps = entries.map((i: any) => i.main.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const mid = entries[Math.floor(entries.length / 2)];
    return { date, min, max, icon: mid.weather[0].icon, desc: mid.weather[0].description };
  });
}
