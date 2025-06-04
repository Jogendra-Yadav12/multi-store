import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { adminUser } = useAuth();
  return adminUser ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
