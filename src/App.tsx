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
import Profile from "./features/authentication/Profile";
import PasswordSet from "./features/authentication/PasswordSet";
import PublicLayout from "./ui/PublicLayout";

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
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="registration" element={<Registration />} />
              <Route path="login" element={<Login />} />
              <Route path="overview" element={<Overview />} />
            </Route>

            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="recipes" replace />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/:id" element={<RecipeDetail />} />
              <Route path="add" element={<AddRecipe />} />
              <Route path="profile" element={<Profile />} />
              <Route path="password" element={<PasswordSet />} />
            </Route>
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
