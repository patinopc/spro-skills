import React from "react";
import { Sun, Cloud, Wind, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

type WeatherIconProps = {
  code: number;
  className?: string;
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ code, className = "h-16 w-16" }) => {
  if (code === 0) return <Sun className={`${className} text-yellow-400`} />;
  if ([1, 2, 3].includes(code)) return <Cloud className={`${className} text-gray-400`} />;
  if ([45, 48].includes(code)) return <Wind className={`${className} text-gray-300`} />;
  if ([51, 53, 55, 61, 63, 65].includes(code)) return <CloudRain className={`${className} text-blue-400`} />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <CloudSnow className={`${className} text-white`} />;
  if ([95, 96, 99].includes(code)) return <CloudLightning className={`${className} text-purple-500`} />;
  return <Sun className={`${className} text-yellow-400`} />;
};
