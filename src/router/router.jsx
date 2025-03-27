import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home/Home"
import NotFound from "../pages/NotFound/404";
import Customers from "../pages/Customers/Customers";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/customers" element={<Customers />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
