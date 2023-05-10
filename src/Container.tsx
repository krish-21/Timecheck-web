import Router from "Router";
import { useContext, useEffect } from "react";

import { AuthContext } from "main/context/AuthContext/AuthContext";

import { usePostRefreshTokenQuery } from "main/services/AuthService/queries";

const Container = (): JSX.Element => {
  const authContext = useContext(AuthContext);
  const isRestoringTokens = authContext.authState.isRestoringTokens;

  useEffect(() => {
    void authContext.restoreAuthTokens();
    // Need it to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePostRefreshTokenQuery();

  if (isRestoringTokens) {
    return <h1>Loading</h1>;
  }

  return <Router />;
};

export default Container;
