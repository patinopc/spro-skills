import { WeatherPlannerPage } from "./pages/WeatherPlannerPage";
import { TooltipProvider } from "@/components/atoms/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-6 font-sans">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8 text-center pt-2">
            <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 sm:text-5xl">
              Smart Weather Planner
            </h1>
          </header>

          <WeatherPlannerPage />
        </div>
      </main>
    </TooltipProvider>
  );
}

export default App;