import { useContext } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "main/context/AuthContext/AuthContext";

import LogoutComponent from "main/routes/Authentication/LogoutComponent/LogoutComponent";

interface Props {
  children: JSX.Element;
}

const DefaultLayout = (props: Props): JSX.Element => {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const authContext = useContext(AuthContext);

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToWatches = () => {
    navigate("/watches");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Timecheck
            </Typography>
            {authContext.authState.isAuthenticated && <LogoutComponent />}
            {!authContext.authState.isAuthenticated &&
              (location.pathname === "/login" ? (
                <Button color="inherit" onClick={navigateToWatches}>
                  Watches
                </Button>
              ) : (
                <Button color="inherit" onClick={navigateToLogin}>
                  Login
                </Button>
              ))}
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  );
};

export default DefaultLayout;
