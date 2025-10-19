import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import Spinner from "./components/Spinner";
import ErrorBanner from "./components/ErrorBanner";
import useWeather from "./hooks/useWeather";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const { data, loading, error, search, units, setUnits } = useWeather();

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mt-2 mb-6 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">SkyCast</h1>

          <div className="flex justify-center sm:justify-end items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setUnits(units === "metric" ? "imperial" : "metric")}
              className="px-3 py-1.5 text-lg font-semibold bg-white/70 dark:bg-slate-700 dark:text-slate-100 rounded-lg hover:bg-white/90 dark:hover:bg-slate-600 transition"
            >
              {units === "metric" ? "°C" : "°F"}
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="mb-6">
          <Search onSearch={search} />
        </div>

        {/* States */}
        {loading && <Spinner />}
        {error && <ErrorBanner message={error} />}

        {/* Weather Info */}
        {data && !loading && (
          <div className="space-y-6">
            <WeatherCard current={data.current} units={units} />
            <Forecast forecast={data.forecast} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}
