import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children, roles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
