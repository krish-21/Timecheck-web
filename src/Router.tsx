import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegisterPage from "main/routes/Authentication/RegisterPage/RegisterPage";
import LoginPage from "main/routes/Authentication/LoginPage/LoginPage";
import WatchesPage from "main/routes/WatchesPage/WatchesPage";
import ErrorPage from "main/routes/ErrorPage/ErrorPage";
import GuestRoute from "main/guards/GuestRoute/GuestRoute";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route path="/watches" element={<WatchesPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
