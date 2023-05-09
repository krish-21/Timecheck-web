import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "main/context/AuthContext/AuthContext";

interface Props {
  children: JSX.Element;
}

const GuestRoute = (props: Props): JSX.Element => {
  const { children } = props;

  const authContext = useContext(AuthContext);

  if (authContext.isAuthenticated) {
    return <Navigate to="/watches" />;
  }

  return children;
};

export default GuestRoute;
