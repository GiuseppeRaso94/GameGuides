import { Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";

export const useAuth = () => {
  return JSON.parse(localStorage.getItem("auth"));
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <HomePage />;
};

export default ProtectedRoutes;
