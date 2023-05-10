import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "main/context/AuthContext/AuthContext";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = (props: Props): JSX.Element => {
  const { children } = props;

  const authContext = useContext(AuthContext);

  if (!authContext.authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
