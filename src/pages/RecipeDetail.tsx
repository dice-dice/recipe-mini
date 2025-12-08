import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, getRecipeById } from "../services/recipe";
import { Recipe } from "../types/recipe";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import { useState } from "react";
import EditRecipeForm from "../features/recipes/EditRecipeForm";
import ConfirmPopUp from "../ui/ConfirmPopUp";

export default function RecipeDetail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { id } = useParams();
  const [isEditing, setEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

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

  const { mutate: deleteByid } = useMutation({
    mutationFn: () => deleteRecipe(numericId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe"] });
      navigate("/app/recipes");
    },
  });
  function handleDelete() {
    deleteByid();
  }
  if (isLoading) return <Spinner />;
  if (error) return <p>データの取得に失敗しました。</p>;
  return (
    <>
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
      <Button
        size="small"
        variation="danger"
        onClick={() => setShowDeletePopup(true)}
      >
        削除
      </Button>

      {isEditing && (
        <EditRecipeForm recipe={recipe!} onCancel={() => setEditing(false)} />
      )}
      <ConfirmPopUp
        open={showDeletePopup}
        message="本当に削除しますか？"
        onConfirm={handleDelete}
        onClose={() => setShowDeletePopup(false)}
      />
    </>
  );
}
