import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import HomePage from "@/pages/home";
import AlertsPage from "@/pages/alerts";
import ApiKeysPage from "@/pages/api-keys";
import OverviewPage from "@/pages/overview";
import AnalyticsPage from "@/pages/analytics";
import TransactionAnalysisPage from "@/pages/transaction-analysis";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex pt-20">
        <Sidebar />
        <main className="flex-1 ml-64 p-6">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/overview" component={OverviewPage} />
            <Route path="/analytics" component={AnalyticsPage} />
            <Route path="/transaction-analysis" component={TransactionAnalysisPage} />
            <Route path="/alerts" component={AlertsPage} />
            <Route path="/api-keys" component={ApiKeysPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
