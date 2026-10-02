import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  return localStorage.getItem("dexathon_admin_token") ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
