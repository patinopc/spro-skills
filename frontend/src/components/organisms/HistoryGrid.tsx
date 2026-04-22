import React from "react";
import { Button } from "@/components/atoms/ui/button";
import { Card, CardContent } from "@/components/atoms/ui/card";
import { Trash2 } from "lucide-react";
import { getWeatherCondition } from "../../lib/weatherUtils";
import type { WeatherData } from "../../types/weather";

type HistoryGridProps = {
  history: WeatherData[];
  onClear: () => void;
  onItemClick: (lat: number, lon: number, name: string, country?: string) => void;
};

export const HistoryGrid: React.FC<HistoryGridProps> = ({ history, onClear, onItemClick }) => {
  if (history.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Recent Searches</h3>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-red-500 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {history.map((item) => (
          <Card 
            key={`${item.latitude}-${item.longitude}`}
            className="bg-white/60 backdrop-blur-sm border-gray-100 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer shadow-sm" 
            onClick={() => onItemClick(item.latitude, item.longitude, item.city, item.country)}
          >
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-gray-800">{item.city}</h4>
                <p className="text-xs text-gray-500">{getWeatherCondition(item.weatherCode)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-lg font-bold text-gray-700">{Math.round(item.temperature)}{"\u00B0"}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
