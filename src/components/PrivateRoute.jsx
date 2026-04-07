import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./shared/Loader";

const PrivateRoute = () => {
  const { isAuthenticated, loading: isAuthenticating } = useSelector(
    (state) => state.authentication,
  );

  if (isAuthenticating) {
    return <Loader text="Authenticating..." />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
