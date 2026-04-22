import axios from "axios";
import axiosRetry from "axios-retry";
import type { GeoLocation, WeatherData } from "../types/weather";

// automatically retry failed requests (e.g. temporary network drop)
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429;
  }
});

export const weatherService = {
  async getCitySuggestions(query: string, signal?: AbortSignal): Promise<GeoLocation[]> {
    const baseUrl = import.meta.env.VITE_GEO_API_URL;
    const response = await axios.get(`${baseUrl}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`, { signal });
    return response.data.results || [];
  },

  async getWeatherData(lat: number, lon: number, name: string, country?: string): Promise<WeatherData> {
    const weatherUrl = import.meta.env.VITE_WEATHER_API_URL;
    const aqiUrl = import.meta.env.VITE_AIR_QUALITY_API_URL;

    const [weatherRes, aqiRes] = await Promise.all([
      axios.get(`${weatherUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,visibility&daily=temperature_2m_max,temperature_2m_min,weather_code&past_days=5&timezone=auto`),
      axios.get(`${aqiUrl}?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5,pm10&timezone=auto`)
    ]);

    const weatherCurrent = weatherRes.data.current || {};
    const aqiCurrent = aqiRes.data.current || {};

    const formatLocalTime = (isoString?: string) => {
      if (!isoString) return "";
      const date = new Date(isoString);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const strTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ampm;
      return `${month}/${day}/${year} at ${strTime}`;
    };

    const daily = weatherRes.data.daily || {};
    const pastHistory = [];
    
    if (daily.time) {
      for (let i = 0; i < 5; i++) {
        if (daily.time[i]) {
          pastHistory.push({
            date: daily.time[i],
            maxTemp: daily.temperature_2m_max[i],
            minTemp: daily.temperature_2m_min[i],
            weatherCode: daily.weather_code[i]
          });
        }
      }
    }

    return {
      city: name,
      country: country || "",
      latitude: lat,
      longitude: lon,
      temperature: weatherCurrent.temperature_2m,
      weatherCode: weatherCurrent.weather_code,
      windSpeed: weatherCurrent.wind_speed_10m,
      visibility: weatherCurrent.visibility,
      airQuality: aqiCurrent.european_aqi,
      pm2_5: aqiCurrent.pm2_5,
      pm10: aqiCurrent.pm10,
      timestamp: Date.now(),
      localTime: formatLocalTime(weatherCurrent.time),
      timezone: weatherRes.data.timezone_abbreviation || "",
      history: pastHistory
    };
  }
};
