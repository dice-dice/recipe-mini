import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipe";
import { Recipe } from "../types/recipe";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import { useState } from "react";
import EditRecipeForm from "../features/recipes/EditRecipeForm";

export default function RecipeDetail() {
  const { id } = useParams();
  const [isEditing, setEditing] = useState(false);
  const numericId = Number(id);
  const {
    isLoading,
    data: recipe,
    error,
  } = useQuery<Recipe>({
    queryKey: ["recipe", numericId],
    queryFn: () => getRecipeById(numericId!),
    enabled: !!numericId,
  });
  if (isLoading) return <Spinner />;
  if (error) return <p>データの取得に失敗しました。</p>;
  return (
    <>
      <div>
        <p>{recipe?.title}</p>
        <img
          src={recipe?.image_url ?? "/placeholder.png"}
          alt={recipe?.title ?? "no title"}
        />
        <p>{recipe?.category}</p>
        <h2>材料</h2>
        <p>{recipe?.ingredients}</p>

        <h2>手順</h2>
        <p>{recipe?.step1}</p>
        <p>{recipe?.step2}</p>
        <p>{recipe?.step3}</p>
        <Button size="small" onClick={() => setEditing(true)}>
          編集
        </Button>
      </div>
      {isEditing && (
        <EditRecipeForm recipe={recipe!} onCancel={() => setEditing(false)} />
      )}
    </>
  );
}
