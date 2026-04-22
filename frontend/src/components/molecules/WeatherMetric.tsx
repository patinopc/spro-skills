import React from "react";

type WeatherMetricProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

export const WeatherMetric: React.FC<WeatherMetricProps> = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-blue-200 flex items-center gap-2">
        {icon} {label}
      </span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
};
