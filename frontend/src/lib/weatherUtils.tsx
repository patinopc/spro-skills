export const getWeatherCondition = (code: number) => {
  if (code === 0) return "Clear Sky";
  if ([1, 2, 3].includes(code)) return "Cloudy";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "Rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Clear Sky";
};

export const getAQIStatus = (aqi?: number | null) => {
  if (aqi === undefined || aqi === null) return { label: "Unknown", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" };
  if (aqi <= 20) return { label: "Good", color: "bg-green-500/20 text-green-300 border-green-500/30" };
  if (aqi <= 40) return { label: "Fair", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" };
  if (aqi <= 60) return { label: "Moderate", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" };
  if (aqi <= 80) return { label: "Poor", color: "bg-red-500/20 text-red-300 border-red-500/30" };
  return { label: "Very Poor", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" };
};
