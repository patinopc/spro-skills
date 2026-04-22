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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item) => (
          <Card 
            key={`${item.latitude}-${item.longitude}`}
            className="bg-white/60 backdrop-blur-sm border-gray-100 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer" 
            onClick={() => onItemClick(item.latitude, item.longitude, item.city, item.country)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">{item.city}</h4>
                <p className="text-sm text-gray-500">{getWeatherCondition(item.weatherCode)}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-700">{Math.round(item.temperature)}{"\u00B0"}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
