import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;