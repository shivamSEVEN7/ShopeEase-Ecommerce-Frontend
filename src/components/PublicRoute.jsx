import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  return isAuthenticated ? <Navigate to={"/account"} /> : <Outlet />;
}

export default PublicRoute;
