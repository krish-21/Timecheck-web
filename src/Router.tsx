import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegisterPage from "main/routes/RegisterPage/RegisterPage";
import LoginPage from "main/routes/LoginPage/LoginPage";
import WatchesPage from "main/routes/WatchesPage/WatchesPage";
import ErrorPage from "main/routes/ErrorPage/ErrorPage";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/watches" element={<WatchesPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
