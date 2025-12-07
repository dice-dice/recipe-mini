import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../services/recipe";
import RecipeRow from "../features/recipes/RecipeRow";
import { Recipe } from "../types/recipe";
import Spinner from "../ui/Spinner";

export default function Recipes() {
  const {
    isLoading,
    data: recipes,
    error,
  } = useQuery<Recipe[]>({ queryKey: ["recipes"], queryFn: getAllRecipes });
  if(isLoading) return <Spinner/>
  if (error) return <p>データの取得に失敗しました。</p>;
  return (
    <ul>
      {recipes?.map((recipe: Recipe) => (
        <RecipeRow key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
}
