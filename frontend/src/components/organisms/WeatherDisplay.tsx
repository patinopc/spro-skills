import React from "react";
import { Card, CardContent } from "@/components/atoms/ui/card";
import { Badge } from "@/components/atoms/ui/badge";
import { Separator } from "@/components/atoms/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/ui/tooltip";
import { MapPin, Wind, Eye, Droplets, Cloud, Info } from "lucide-react";
import { WeatherMetric } from "../molecules/WeatherMetric";
import { WeatherIcon } from "../atoms/WeatherIcon";
import { getWeatherCondition, getAQIStatus } from "../../lib/weatherUtils";
import type { WeatherData } from "../../types/weather";

type WeatherDisplayProps = {
  data: WeatherData;
};

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const aqi = getAQIStatus(data.airQuality);

  return (
    <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
          
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-blue-200">
              <MapPin className="h-5 w-5" />
              <span className="text-xl font-medium tracking-wide">
                {data.city}{data.country ? `, ${data.country}` : ''}
              </span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-6 mb-4">
              <div className="text-7xl font-bold tracking-tighter">
                {Math.round(data.temperature)}{"\u00B0"}
              </div>
              <div className="h-16 w-[1px] bg-white/10 hidden md:block" />
              <div className="flex flex-col items-center md:items-start gap-1">
                <WeatherIcon code={data.weatherCode} className="h-12 w-12" />
                <Badge variant="outline" className="bg-white/10 text-blue-100 border-white/20 px-3 py-1">
                  {getWeatherCondition(data.weatherCode)}
                </Badge>
              </div>
            </div>

            {data.localTime && (
              <div className="text-sm text-blue-200/80 font-medium tracking-wide">
                In {data.city} as of {data.localTime} ({data.timezone})
              </div>
            )}
          </div>

          <Separator orientation="vertical" className="hidden md:block bg-white/10 h-auto self-stretch mx-4" />
          <Separator orientation="horizontal" className="md:hidden bg-white/10 w-full" />

          <div className="grid grid-cols-2 gap-8 w-full md:w-auto p-2">
            <WeatherMetric 
              icon={<Wind className="h-4 w-4" />} 
              label="Wind" 
              value={`${data.windSpeed} km/h`} 
            />
            <WeatherMetric 
              icon={<Eye className="h-4 w-4" />} 
              label="Visibility" 
              value={`${data.visibility / 1000} km`} 
            />
            <WeatherMetric 
              icon={<Droplets className="h-4 w-4" />} 
              label="Air Quality" 
              value={
                <div className="flex items-center gap-2">
                  <span>{data.airQuality ?? "N/A"}</span>
                  {data.airQuality !== undefined && (
                    <Badge variant="outline" className={`${aqi.color} border font-bold text-[10px] uppercase tracking-wider px-2 py-0`}>
                      {aqi.label}
                    </Badge>
                  )}
                </div>
              } 
            />
            <WeatherMetric 
              icon={<Cloud className="h-4 w-4" />} 
              label="Particulates" 
              value={
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 group">
                    <span className="text-sm font-normal text-blue-200">PM2.5:</span>
                    <span className="text-lg">{data.pm2_5 ?? "N/A"}</span>
                    <Tooltip>
                      <TooltipTrigger><Info className="h-3 w-3 text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" /></TooltipTrigger>
                      <TooltipContent className="bg-slate-800 text-white border-slate-700">
                        Fine particulate matter ({"\u2264"}2.5 {"\u00B5"}m)
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2 group">
                    <span className="text-sm font-normal text-blue-200">PM10:</span>
                    <span className="text-lg">{data.pm10 ?? "N/A"}</span>
                    <Tooltip>
                      <TooltipTrigger><Info className="h-3 w-3 text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" /></TooltipTrigger>
                      <TooltipContent className="bg-slate-800 text-white border-slate-700">
                        Coarse particulate matter ({"\u2264"}10 {"\u00B5"}m)
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              } 
            />
          </div>
        </div>

        {data.history && data.history.length > 0 && (
          <>
            <Separator className="bg-white/10 my-8 w-full" />
            <div>
              <h4 className="text-blue-200 mb-4 font-medium tracking-wide uppercase text-xs">Past 5 Days</h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
                {data.history.map((day) => {
                  const dateObj = new Date(day.date + 'T00:00:00'); // Force local parsing
                  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
                  return (
                    <div key={day.date} className="flex flex-col items-center justify-center bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors text-center">
                      <span className="text-blue-200 text-sm font-medium">{dayName}</span>
                      <span className="text-[10px] text-blue-300/60 mb-1">{day.date.slice(5)}</span>
                      <WeatherIcon code={day.weatherCode} className="h-8 w-8 my-1" />
                      <div className="flex gap-2 text-sm mt-1">
                        <span className="font-bold text-white">{Math.round(day.maxTemp)}{"\u00B0"}</span>
                        <span className="text-blue-300">{Math.round(day.minTemp)}{"\u00B0"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
