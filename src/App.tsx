import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "Router";
import { AuthProvider } from "main/context/AuthContext/AuthContext";
import { AxiosProvider } from "main/context/AxiosContext/AxiosContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AxiosProvider>
          <Router />
        </AxiosProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
