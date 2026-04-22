import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { GeoLocation, WeatherData } from "../types/weather";
import { weatherService } from "../services/weatherService";

const MAX_HISTORY = 5;

export const useWeather = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("weather_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed.slice(0, MAX_HISTORY));
        }
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // debounced search for suggestions with AbortController for race-condition protection
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const abortController = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const results = await weatherService.getCitySuggestions(query, abortController.signal);
        setSuggestions(results);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Failed to fetch suggestions", err);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [query]);

  const saveToHistory = useCallback((data: WeatherData) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.latitude !== data.latitude || item.longitude !== data.longitude);
      const newHistory = [data, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem("weather_history", JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem("weather_history");
  }, []);

  const fetchWeather = useCallback(async (lat: number, lon: number, name: string, country?: string) => {
    setLoading(true);
    setError("");
    setShowSuggestions(false);

    try {
      const data = await weatherService.getWeatherData(lat, lon, name, country);
      setCurrentWeather(data);
      saveToHistory(data);
      setQuery("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [saveToHistory]);

  const handleSearchSubmit = useCallback(async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      // force an immediate fetch to bypass the debounce state
      const exactResults = await weatherService.getCitySuggestions(query);
      if (exactResults.length > 0) {
        const bestMatch = exactResults[0];
        await fetchWeather(bestMatch.latitude, bestMatch.longitude, bestMatch.name, bestMatch.country);
      } else {
        setError(`No city found matching "${query}". Check your spelling.`);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search for city. Please try again.");
      setLoading(false);
    }
  }, [query, fetchWeather]);

  return {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    currentWeather,
    history,
    loading,
    error,
    setError,
    clearHistory,
    fetchWeather,
    handleSearchSubmit
  };
};
