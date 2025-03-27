import React from "react";
import { useLocation } from "react-router-dom";
import Router from "./router/router";
import Menu from "./components/Menu/Menu";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="container">
      <Router />
      {!isLoginPage && <Menu />}
    </div>
  );
};

export default App;
