import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../services/recipe";
import RecipeRow from "../features/recipes/RecipeRow";
import { Recipe } from "../types/recipe";
import { useEffect } from "react";
import { supabase } from "../services/supabase";

export default function Recipes() {
  useEffect(() => {
  supabase.auth.getUser().then((res) => {
    console.log("ログイン中のユーザーID:", res.data.user?.id);
  });
}, []);

  const {
    isLoading,
    data: recipes,
    error,
  } = useQuery<Recipe[]>({ queryKey: ["recipes"], queryFn: getAllRecipes });
  return (
    <ul>
      {recipes?.map((recipe: Recipe) => (
        <RecipeRow key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
}
