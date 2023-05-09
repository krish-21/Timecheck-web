import { useContext } from "react";
import Button from "@mui/material/Button";

import { AxiosContext } from "main/context/AxiosContext/AxiosContext";

import type { LogoutMutationData } from "main/services/AuthService/interfaces";
import { usePostLogoutMutation } from "main/services/AuthService/mutations";

const LogoutComponent = (): JSX.Element => {
  const { authAxios } = useContext(AxiosContext);

  const { mutate, isLoading: isPostLogoutMutationLoading } =
    usePostLogoutMutation();

  const logoutUser = (): void => {
    if (isPostLogoutMutationLoading) {
      return;
    }

    const logoutMutationData: LogoutMutationData = {
      axiosInstance: authAxios,
    };

    mutate(logoutMutationData);
  };

  return (
    <Button
      color="inherit"
      disabled={isPostLogoutMutationLoading}
      onClick={logoutUser}
    >
      Logout
    </Button>
  );
};

export default LogoutComponent;
