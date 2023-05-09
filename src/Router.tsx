import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegisterPage from "main/routes/Authentication/RegisterPage/RegisterPage";
import LoginPage from "main/routes/Authentication/LoginPage/LoginPage";
import WatchesPage from "main/routes/WatchesPage/WatchesPage";
import ErrorPage from "main/routes/ErrorPage/ErrorPage";
import GuestRoute from "main/guards/GuestRoute/GuestRoute";
import DefaultLayout from "main/layouts/DefaultLayout/DefaultLayout";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            <DefaultLayout>
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            </DefaultLayout>
          }
        />
        <Route
          path="/login"
          element={
            <DefaultLayout>
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            </DefaultLayout>
          }
        />
        <Route
          path="/watches"
          element={
            <DefaultLayout>
              <WatchesPage />
            </DefaultLayout>
          }
        />
        <Route
          path="*"
          element={
            <DefaultLayout>
              <ErrorPage />
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
