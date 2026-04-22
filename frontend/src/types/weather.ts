export type GeoLocation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
};

export type WeatherData = {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  visibility: number;
  airQuality: number;
  pm2_5: number;
  pm10: number;
  timestamp: number;
  localTime: string;
  timezone: string;
};
