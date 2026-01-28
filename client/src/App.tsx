import React, { useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./hooks/use-theme";
import { Analytics } from "@vercel/analytics/react";

import SplashScreen from "./components/SplashScreen";
import RouteLoader from "./components/RouteLoader";

import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ComingSoon from "./components/comingsoon";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Hide splash when animation completes
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/* Show loader on route changes */}
        <RouteLoader>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
            <Route path="/services" component={Services} />
            <Route path="/contact" component={Contact} />
            <Route path="/comingsoon" component={ComingSoon} />
            <Route component={NotFound} />
          </Switch>
        </RouteLoader>

        {/* Toast notifications */}
        <Toaster />
        <Analytics />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
