import React from "react";
import { useLocation } from "react-router-dom";
import Router from "./router/router";
import Menu from "./components/Menu/Menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const queryClient = new QueryClient();
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <Router />
        {!isLoginPage && <Menu />}
      </QueryClientProvider>
    </div>
  );
};

export default App;
