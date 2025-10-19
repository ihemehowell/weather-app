import axios from "axios";

const API_KEY = import.meta.env.VITE_OWM_API_KEY as string;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; feels_like: number; humidity: number; pressure: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  visibility: number;
  dt: number;
  timezone: number;
}

export interface ForecastData {
  list: {
    dt: number;
    main: { temp: number };
    weather: { description: string; icon: string }[];
  }[];
}

export const fetchCurrentWeather = async (city: string, units = "metric"): Promise<WeatherData> => {
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, units, appid: API_KEY },
  });
  return res.data;
};

export const fetchForecast = async (city: string, units = "metric"): Promise<ForecastData> => {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, units, appid: API_KEY },
  });
  return res.data;
};
