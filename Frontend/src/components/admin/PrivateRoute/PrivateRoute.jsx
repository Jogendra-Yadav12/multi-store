import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
