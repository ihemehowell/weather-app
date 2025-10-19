import { useState, useCallback } from "react";
import { fetchCurrentWeather, fetchForecast } from "../lib/api"; // <-- runtime functions
import type { WeatherData, ForecastData } from "../lib/api";      // <-- compile-time types


export default function useWeather(defaultUnits = import.meta.env.VITE_DEFAULT_UNITS || "metric") {
  const [data, setData] = useState<{ current: WeatherData; forecast: ForecastData } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState(defaultUnits);

  const search = useCallback(async (city: string) => {
    if (!city.trim()) {
      setError("Please enter a location.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(city, units),
        fetchForecast(city, units),
      ]);
      setData({ current, forecast });
    } catch (err: any) {
      if (err.response?.status === 404) setError("City not found.");
      else setError("Failed to fetch weather data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [units]);

  return { data, loading, error, units, setUnits, search };
}
