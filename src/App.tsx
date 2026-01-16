import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Registration from "./pages/Registration";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Overview from "./pages/Overview";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import AddRecipe from "./pages/AddRecipe";

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
export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage />, handle: { title: "Home" } },
      { path: "registration", element: <Registration />, handle: { title: "Registration" } },
      { path: "login", element: <Login />, handle: { title: "Login" } },
      { path: "overview", element: <Overview />, handle: { title: "Overview" } },
    ],
  },
  {
    path: "app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="recipes" replace /> },
      { path: "recipes", element: <Recipes />, handle: { title: "Recipes" } },
      { path: "recipes/:id", element: <RecipeDetail />, handle: { title: "Recipe詳細" } },
      { path: "add", element: <AddRecipe />, handle: { title: "Recipe追加" } },
      { path: "profile", element: <Profile />, handle: { title: "Profile確認" } },
      { path: "password", element: <PasswordSet />, handle: { title: "Password変更" } },
    ],
  },
]);
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <Toaster
          position="top-center"
          containerStyle={{
            zIndex: 9999,
            top: 20,
            left: 0,
            right: 0,
          }}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
              maxWidth: "90vw",
              width: "fit-content",
              margin: "0 auto",
              padding: "12px 20px",
              fontSize: "14px",
              textAlign: "center",
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
            },
          }}
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}
