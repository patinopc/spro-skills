import { WeatherPlannerPage } from "./pages/WeatherPlannerPage";
import { TooltipProvider } from "@/components/atoms/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-6 font-sans">
        <div className="mx-auto max-w-5xl">
          <header className="mb-12 text-center pt-8">
            <h1 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 sm:text-6xl mb-4">
              Smart Weather Planner
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              Your personalized global weather dashboard
            </p>
          </header>

          <WeatherPlannerPage />
        </div>
      </main>
    </TooltipProvider>
  );
}

export default App;