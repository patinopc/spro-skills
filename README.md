# 🌤️ Smart Weather Planner

A highly performant, globally-scalable frontend application designed to instantly deliver real-time weather, air quality, and forecasting data for any city in the world. 

Built as a lightweight, serverless Single Page Application (SPA), this project strictly adheres to **Atomic Design** principles, ensuring exceptional code modularity and long-term maintainability.

---

## ✨ Features

- **Real-Time Global Weather**: Instant temperature, wind speed, visibility, and atmospheric conditions.
- **Air Quality Index (AQI) & Particulates**: Monitors European AQI alongside granular PM2.5 and PM10 particulate levels.
- **Dynamic Timezone Resolution**: Automatically calculates and displays the exact local time for the searched city, regardless of the user's location.
- **Debounced Search & Geocoding**: Smart autocomplete powered by a 300ms debounce and `AbortController` to actively prevent race conditions and limit API span.
- **Smart History Persistence**: Automatically caches the user's 5 most recent successful searches in `localStorage`, tracking precise latitude/longitude to perfectly handle identical city names (e.g., Springfield, IL vs Springfield, MA).
- **Fault-Tolerant Resilience**: Implements `axios-retry` for automatic exponential backoff on network failures or API rate limits.

---

## 🏗️ Architecture

The project utilizes the **Atomic Design Pattern** to separate UI elements into reusable, predictable components:

- **`src/components/atoms/`**: Smallest building blocks (e.g., UI primitives, WeatherIcons, Shadcn Skeletons/Badges).
- **`src/components/molecules/`**: Composed elements (e.g., WeatherMetric cards displaying an icon alongside a label).
- **`src/components/organisms/`**: Complex layout blocks (e.g., SearchForm, WeatherDisplay, HistoryGrid).
- **`src/pages/`**: The primary views that orchestrate the organisms and inject data.
- **`src/hooks/`**: Custom hooks (e.g., `useWeather.ts`) that isolate state management and business logic away from the UI components.
- **`src/services/`**: The data layer handling all asynchronous HTTP requests and error interception.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite (SWC)
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI / Shadcn UI (Nova preset)
- **Icons**: Lucide React
- **HTTP Client**: Axios (with `axios-retry`)
- **Data Provider**: [Open-Meteo API](https://open-meteo.com/) (Free, open-source weather API requiring no authentication)

---

## 🚀 Getting Started

Because the application is a serverless frontend, setup is incredibly fast.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/patinopc/spro-skills.git
   cd spro-skills/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `frontend` root and add the following Open-Meteo endpoints:
   ```env
   VITE_WEATHER_API_URL="https://api.open-meteo.com/v1/forecast"
   VITE_GEO_API_URL="https://geocoding-api.open-meteo.com/v1/search"
   VITE_AIR_QUALITY_API_URL="https://air-quality-api.open-meteo.com/v1/air-quality"
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```


