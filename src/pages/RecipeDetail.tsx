import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import { useState } from "react";
import EditRecipeForm from "../features/recipes/EditRecipeForm";
import ConfirmPopUp from "../ui/ConfirmPopUp";
import useGetRecipe from "../features/recipes/useGetRecipe";
import useDeleteRecipe from "../features/recipes/useDeleteRecipe";

export default function RecipeDetail() {

  const [isEditing, setEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  
  const {isLoading, data: recipe, error, numericId} = useGetRecipe();
  const {mutate: deleteById} = useDeleteRecipe(numericId);

  function handleDelete() {
    deleteById();
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
