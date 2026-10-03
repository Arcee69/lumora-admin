import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Members from "../pages/members";
import ProtectedRoute from "./ProtectedRoute";
import CommandCenter from "../pages/command-center";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/command-center" element={<CommandCenter />} />
          <Route path="/members" element={<Members />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Routers;