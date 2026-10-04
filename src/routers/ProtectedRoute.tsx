import { Outlet } from "react-router-dom";

// TODO: redirect to "/" when there is no authenticated session once the auth API is connected.
const ProtectedRoute = () => {
  return <Outlet />;
};

export default ProtectedRoute;
