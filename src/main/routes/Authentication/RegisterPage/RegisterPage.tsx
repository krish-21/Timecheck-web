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

import { usePostRegisterMutation } from "main/services/AuthService/mutations";

import { validateForm } from "main/routes/Authentication/AuthForm/utils";
import { authFormReducer } from "main/routes/Authentication/AuthForm/reducer";
import { AuthFormActionKind } from "main/routes/Authentication/AuthForm/enums";
import { authFormDefaultValue } from "main/routes/Authentication/AuthForm/defaultValues";

const RegisterPage = (): JSX.Element => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [registerFormState, registerFormDispatch] = useReducer(
    authFormReducer,
    authFormDefaultValue
  );

  const { mutate: registerMutate, isLoading: isRegisterMutationLoading } =
    usePostRegisterMutation();

  const onChangeUsername = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    registerFormDispatch({
      type: AuthFormActionKind.UPDATE_USERNAME,
      payload: { username: event.target.value },
    });
  };

  const onChangePassword = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    registerFormDispatch({
      type: AuthFormActionKind.UPDATE_PASSWORD,
      payload: { password: event.target.value },
    });
  };

  const submitData = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    registerFormDispatch({
      type: AuthFormActionKind.VALIDATE_FORM,
    });

    if (
      validateForm(
        registerFormState.username,
        registerFormState.password,
        false
      ).isError
    ) {
      return;
    }

    registerMutate(
      {
        username: registerFormState.username,
        password: registerFormState.password,
      },
      {
        onSuccess: (data) => {
          void authContext.setAuthData(
            data.userId,
            data.tokens.accessToken,
            data.tokens.refreshToken
          );
          registerFormDispatch({
            type: AuthFormActionKind.RESET_FORM,
          });
          navigate("/watches");
        },
        onError: (err) => {
          if (err instanceof AxiosError && err.response !== undefined) {
            registerFormDispatch({
              type: AuthFormActionKind.SET_SERVER_ERROR,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              payload: { message: err.response.data.error.message },
            });
          } else {
            registerFormDispatch({
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
          Register
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
                disabled={isRegisterMutationLoading}
                value={registerFormState.username}
                onChange={onChangeUsername}
                error={registerFormState.usernameError.isError}
                helperText={registerFormState.usernameError.message}
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
                autoComplete="new-password"
                disabled={isRegisterMutationLoading}
                value={registerFormState.password}
                onChange={onChangePassword}
                error={registerFormState.passwordError.isError}
                helperText={registerFormState.passwordError.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isRegisterMutationLoading}
          >
            Register
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
          {registerFormState.serverError.isError && (
            <Alert severity="error" onClose={() => {}}>
              <AlertTitle>Error</AlertTitle>
              {registerFormState.serverError.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
