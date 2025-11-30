import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Registration from "./pages/Registration";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Overview from "./pages/Overview";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AddRecipe from "./pages/AddRecipe";
import Settings from "./pages/Settings";

import ProtectedRoute from "./utils/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="overview" element={<Overview />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="recipes" element={<Recipes />}>
                <Route path=":id" element={<RecipeDetail />} />
              </Route>
              <Route path="add" element={<AddRecipe />} />
            </Route>

            <Route path="settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
