import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/404";
import Customers from "../pages/Customers/Customers";
import CustomerDetail from "../pages/CustomerDetail/CustomerDetail";
import Settings from "../pages/Settings/Settings";
import ProfileSettings from "../pages/Settings/ProfileSettings";
import SecuritySettings from "../pages/Settings/SecuritySettings";
import NotificationSettings from "../pages/Settings/NotificationSettings";
import AboutSettings from "../pages/Settings/AboutSettings";
import TermsSettings from "../pages/Settings/TermsSettings";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer/:id" element={<CustomerDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/security" element={<SecuritySettings />} />
        <Route
          path="/settings/notifications"
          element={<NotificationSettings />}
        />
        <Route path="/settings/about" element={<AboutSettings />} />
        <Route path="/settings/terms" element={<TermsSettings />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
