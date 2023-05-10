import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent, useContext, useReducer } from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { AuthContext } from "main/context/AuthContext/AuthContext";

import { usePostLoginMutation } from "main/services/AuthService/mutations";

import { validateForm } from "main/routes/Authentication/AuthForm/utils";
import { authFormReducer } from "main/routes/Authentication/AuthForm/reducer";
import { AuthFormActionKind } from "main/routes/Authentication/AuthForm/enums";
import { authFormDefaultValue } from "main/routes/Authentication/AuthForm/defaultValues";

const LoginPage = (): JSX.Element => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginFormState, loginFormDispatch] = useReducer(authFormReducer, {
    ...authFormDefaultValue,
    isLoginForm: true,
  });

  const { mutate: loginMutate, isLoading: isLoginMutationLoading } =
    usePostLoginMutation();

  const onChangeUsername = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    loginFormDispatch({
      type: AuthFormActionKind.UPDATE_USERNAME,
      payload: { username: event.target.value },
    });
  };

  const onChangePassword = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    loginFormDispatch({
      type: AuthFormActionKind.UPDATE_PASSWORD,
      payload: { password: event.target.value },
    });
  };

  const submitData = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    loginFormDispatch({
      type: AuthFormActionKind.VALIDATE_FORM,
    });

    if (
      validateForm(loginFormState.username, loginFormState.password, true)
        .isError
    ) {
      return;
    }

    loginMutate(
      {
        username: loginFormState.username,
        password: loginFormState.password,
      },
      {
        onSuccess: (data) => {
          void authContext.setAuthData(
            data.userId,
            data.tokens.accessToken,
            data.tokens.refreshToken
          );
          loginFormDispatch({
            type: AuthFormActionKind.RESET_FORM,
          });
          navigate("/watches");
        },
        onError: (err) => {
          if (err instanceof AxiosError && err.response !== undefined) {
            loginFormDispatch({
              type: AuthFormActionKind.SET_SERVER_ERROR,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              payload: { message: err.response.data.error.message },
            });
          } else {
            loginFormDispatch({
              type: AuthFormActionKind.SET_SERVER_ERROR,
              payload: { message: "Server Error" },
            });
          }
        },
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={submitData} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="Username"
                autoFocus={true}
                disabled={isLoginMutationLoading}
                value={loginFormState.username}
                onChange={onChangeUsername}
                error={loginFormState.usernameError.isError}
                helperText={loginFormState.usernameError.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                disabled={isLoginMutationLoading}
                value={loginFormState.password}
                onChange={onChangePassword}
                error={loginFormState.passwordError.isError}
                helperText={loginFormState.passwordError.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoginMutationLoading}
          >
            Login
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/register" variant="body2">
                Do not have an account? Register
              </Link>
            </Grid>
          </Grid>
          {loginFormState.serverError.isError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {loginFormState.serverError.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
