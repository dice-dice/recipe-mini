import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Registration from "./pages/Registration";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="registration" element={<Registration />} />
          <Route index element={<Navigate replace to="/" />} />
          <Route path="app" element={<AppLayout />}>
            <Route path="recipes" element={<Recipes />}>
              <Route path=":id" element={<RecipeDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
