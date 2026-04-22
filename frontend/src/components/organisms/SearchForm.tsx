import React, { useRef, useEffect } from "react";
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { Search, MapPin } from "lucide-react";
import type { GeoLocation } from "../../types/weather";

type SearchFormProps = {
  query: string;
  setQuery: (q: string) => void;
  suggestions: GeoLocation[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  loading: boolean;
  onSubmit: () => void;
  onSuggestionClick: (lat: number, lon: number, name: string, country?: string) => void;
};

export const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  loading,
  onSubmit,
  onSuggestionClick
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex gap-2 relative">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for a city..."
            className="pl-10 h-12 text-lg bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm focus-visible:ring-blue-500"
            disabled={loading}
            autoComplete="off"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
              {suggestions.map((sug) => (
                <button
                  key={sug.id}
                  type="button"
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 flex items-center gap-3"
                  onClick={() => onSuggestionClick(sug.latitude, sug.longitude, sug.name, sug.country)}
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="font-medium text-gray-800">{sug.name}</span>
                    {sug.admin1 && <span className="text-gray-500 text-sm ml-1">, {sug.admin1}</span>}
                    {sug.country && <span className="text-gray-400 text-sm ml-1">({sug.country})</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <Button disabled={loading} type="submit" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          {loading ? "Searching..." : <><Search className="mr-2 h-5 w-5"/> Search</>}
        </Button>
      </form>
    </div>
  );
};
