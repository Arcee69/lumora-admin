import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Members from "../pages/members";
import ProtectedRoute from "./ProtectedRoute";
import CommandCenter from "../pages/command-center";
import ModulePlaceholder from "../pages/placeholder";
import DashboardLayout from "../layouts/dashboardLayout";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/command-center" element={<CommandCenter />} />
          <Route path="/members" element={<Members />} />
          <Route path="*" element={<ModulePlaceholder />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Routers;
