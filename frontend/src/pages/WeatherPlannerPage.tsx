import { AlertCircle } from "lucide-react";
import { useWeather } from "../hooks/useWeather";
import { SearchForm } from "../components/organisms/SearchForm";
import { WeatherDisplay } from "../components/organisms/WeatherDisplay";
import { HistoryGrid } from "../components/organisms/HistoryGrid";
import { WeatherSkeleton } from "../components/skeletons/WeatherSkeleton";
import { HistorySkeleton } from "../components/skeletons/HistorySkeleton";

export const WeatherPlannerPage = () => {
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    currentWeather,
    history,
    loading,
    error,
    clearHistory,
    fetchWeather,
    handleSearchSubmit
  } = useWeather();

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left Column: Search & Current Weather */}
      <div className="w-full lg:w-2/3 space-y-6 flex-shrink-0">
        <SearchForm 
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          loading={loading}
          onSubmit={handleSearchSubmit}
          onSuggestionClick={fetchWeather}
        />

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {loading && <WeatherSkeleton />}

        {!loading && currentWeather && <WeatherDisplay data={currentWeather} />}
      </div>

      {/* Right Column: Sidebar History */}
      <div className="w-full lg:w-1/3 flex-shrink-0 sticky top-6">
        {loading ? (
          <HistorySkeleton />
        ) : (
          <HistoryGrid 
            history={history} 
            onClear={clearHistory} 
            onItemClick={fetchWeather} 
          />
        )}
      </div>

    </div>
  );
};
